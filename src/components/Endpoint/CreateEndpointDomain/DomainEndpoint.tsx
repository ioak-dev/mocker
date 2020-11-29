import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './DomainEndpoint.scss';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveDomainEndpoint } from '../service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import DataStructureBuilder from '../../DataStructure/DataStructureBuilder';
import OakSubheading from '../../../oakui/OakSubheading';
import OakSelect from '../../../oakui/OakSelect';

interface Props {
  space: string;
  history: any;
  projectId: string;
  data: any;
  freezeProject?: boolean;
}

const DomainEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState<any>({
    projectId: props.projectId,
    name: '',
    description: '',
    structure: [],
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

  const handleDataStructureChange = (actionType, changeData) => {
    console.log(actionType, changeData);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state.structure.filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.structure.filter(
          item => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, structure: newData });
  };

  const save = async () => {
    console.log(props);
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${state.name}]`,
    });
    const response = await saveDomainEndpoint(props.space, authorization, {
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
      props.history.push(`/${props.space}/endpoint`);
    }
  };
  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/endpoint/domain/create?projectId=${event.currentTarget.value}`
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
      </OakForm>
      {props.projectId && (
        <OakForm>
          <OakText
            data={state}
            id="name"
            handleChange={handleNameChange}
            label="Name of the domain"
          />
          <OakSubheading title="Domain structure" />
          <DataStructureBuilder
            data={state}
            id="structure"
            label="Domain data structure"
            handleChange={handleDataStructureChange}
          />
        </OakForm>
      )}
    </>
  );
};

export default DomainEndpoint;
