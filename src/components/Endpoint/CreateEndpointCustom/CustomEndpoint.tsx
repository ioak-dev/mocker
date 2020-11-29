import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CustomEndpoint.scss';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveCustomEndpoint, saveDomainEndpoint } from '../service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import DataStructureBuilder from '../../DataStructure/DataStructureBuilder';
import OakSelect from '../../../oakui/OakSelect';
import OakSection from '../../../oakui/OakSection';
import OakSubheading from '../../../oakui/OakSubheading';

interface Props {
  space: string;
  history: any;
  projectId: string;
  data: any;
  freezeProject?: boolean;
}

const CustomEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState<any>({
    ...props.data,
    projectId: props.projectId,
    name: '',
    description: '',
    responseType: 'None',
    payloadType: 'None',
    method: 'GET',
    response: [],
    payload: [],
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  const [projectElements, setProjectElements] = useState<any>([]);

  useEffect(() => {
    setState({
      ...state,
      ...props.data,
      projectId: props.projectId,
    });
  }, [props.projectId, props.data]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map(item => {
      localState.push({ key: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleNameChange = event => {
    setState({
      ...state,
      name: event.currentTarget.value
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/\W/g, ''),
    });
  };

  const handleDataStructureChange = (actionType, changeData, fieldName) => {
    console.log(actionType, changeData, fieldName);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state[fieldName].filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state[fieldName].filter(
          item => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, [fieldName]: newData });
  };

  const save = async () => {
    console.log(props);
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving custom endpoint [${state.name}]`,
    });
    const response = await saveCustomEndpoint(props.space, authorization, {
      ...state,
      projectId: props.projectId,
    });
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Domain endpoint [${state.name}] saved successfully`,
        duration: 3000,
      });
    }
  };

  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/endpoint/custom/create?projectId=${event.currentTarget.value}`
    );
  };

  return (
    <>
      <OakFooter>
        <OakButton theme="primary" variant="appear" action={save}>
          Save
        </OakButton>
        <OakButton theme="default" variant="appear" action={goBack}>
          Close
        </OakButton>
      </OakFooter>
      <OakForm>
        <OakSubheading title="Basic details" />
        <OakSelect
          id="projectId"
          data={state}
          disabled={props.freezeProject}
          handleChange={handleProjectChange}
          label="Choose project"
          objects={projectElements}
        />
        {props.projectId && (
          <>
            <OakText
              data={state}
              handleChange={handleNameChange}
              id="name"
              label="Endpoint name"
            />
            <OakSelect
              id="method"
              data={state}
              handleChange={handleChange}
              label="Request method"
              elements={['GET', 'POST', 'PUT']}
            />
          </>
        )}
      </OakForm>
      {props.projectId && (
        <>
          <OakForm>
            <OakSubheading title="Request payload" />
            <OakSelect
              data={state}
              handleChange={handleChange}
              elements={['None', 'Object', 'Array']}
              id="payloadType"
              label="Payload type"
            />
            {['Object', 'Array'].includes(state.payloadType) && (
              <DataStructureBuilder
                data={state}
                id="payload"
                label="Payload"
                handleChange={handleDataStructureChange}
              />
            )}
          </OakForm>
          <OakForm>
            <OakSubheading title="Web service response" />
            <OakSelect
              data={state}
              handleChange={handleChange}
              elements={['None', 'Object', 'Array']}
              id="responseType"
              label="Response type"
            />
            {['Object', 'Array'].includes(state.responseType) && (
              <DataStructureBuilder
                data={state}
                id="response"
                label="Response data structure"
                handleChange={handleDataStructureChange}
              />
            )}
          </OakForm>
        </>
      )}
    </>
  );
};

export default CustomEndpoint;
