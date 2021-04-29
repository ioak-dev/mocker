import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import {
  saveCustomEndpoint,
  saveDomainEndpoint,
  saveEndpoint,
} from '../service';
import {
  sendMessage,
  newMessageId,
  newId,
} from '../../../events/MessageService';
import DataStructureBuilder from '../../DataStructure/DataStructureBuilder';
import { fetchAllEndpoints } from '../../../actions/EndpointActions';
import OakForm from '../../../oakui/wc/OakForm';
import OakInput from '../../../oakui/wc/OakInput';
import OakSelect from '../../../oakui/wc/OakSelect';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
  space: string;
  history: any;
  projectId: string;
  data?: any;
}

const CustomEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
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
  const authorization = useSelector((state: any) => state.authorization);

  useEffect(() => {
    if (props.data) {
      setState({
        ...state,
        ...props.data,
        projectId: props.projectId,
      });
    } else {
      setState({
        ...state,
        ...props.data,
        projectId: props.projectId,
      });
    }
  }, [props.projectId, props.data]);

  const handleChange = (detail: any) => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
  };

  const handleNameChange = (detail: any) => {
    setState({
      ...state,
      name: detail.value.toLowerCase().replace(/\s/g, '').replace(/\W/g, ''),
    });
  };

  const handleDataStructureChange = (
    actionType: string,
    changeData: any,
    fieldName: string
  ) => {
    console.log(actionType, changeData, fieldName);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state[fieldName].filter(
          (item: any) =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state[fieldName].filter(
          (item: any) => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, [fieldName]: newData });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving custom endpoint [${state.name}]`,
    });
    const response = await saveEndpoint(props.space, authorization, {
      ...state,
      type: 'custom',
      projectId: props.projectId,
      alias: [],
    });
    if (response.status === 200) {
      dispatch(fetchAllEndpoints(props.space, authorization));
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Domain endpoint [${state.name}] saved successfully`,
        duration: 3000,
      });
      props.history.push(
        `/${props.space}/endpoint?projectId=${props.projectId}`
      );
    }
  };

  const handleProjectChange = (detail: any) => {
    props.history.push(
      `/${props.space}/endpoint/custom/create?projectId=${detail.value}`
    );
  };

  const formId = newId();

  return (
    <>
      <OakForm formGroupName={formId} handleSubmit={save}>
        {props.projectId && (
          <>
            <OakInput
              gutterBottom
              formGroupName={formId}
              value={state.name}
              handleChange={handleNameChange}
              name="name"
              label="Endpoint name"
            />
            <OakSelect
              gutterBottom
              formGroupName={formId}
              name="method"
              value={state.method}
              handleChange={handleChange}
              label="Request method"
              options={['GET', 'POST', 'PUT']}
            />
          </>
        )}
      </OakForm>
      {props.projectId && (
        <>
          {/* <OakForm>
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
          </OakForm> */}
          <OakForm handleSubmit={save} formGroupName={formId}>
            {/* <OakSubheading title="Web service response" /> */}
            <OakSelect
              gutterBottom
              formGroupName={formId}
              value={state.responseType}
              handleChange={handleChange}
              options={['None', 'Object', 'Array']}
              name="responseType"
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
      <OakButton
        theme="primary"
        variant="appear"
        type="submit"
        formGroupName={formId}
      >
        Save
      </OakButton>
      <OakButton theme="default" variant="appear" handleClick={goBack}>
        Close
      </OakButton>
    </>
  );
};

export default CustomEndpoint;
