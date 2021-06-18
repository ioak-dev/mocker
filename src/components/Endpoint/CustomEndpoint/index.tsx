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
import OakSection from '../../../oakui/wc/OakSection';

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

  const handleDataStructureChange = (data: any) => {
    setState({ ...state, response: data });
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
      props.history.push(`/${props.space}/project/view?id=${props.projectId}`);
    }
  };

  const [formId, setFormId] = useState(newId());

  return (
    <>
      <OakSection
        fillColor="container"
        paddingHorizontal={2}
        paddingVertical={2}
        rounded
        elevation={1}
        marginVertical={4}
      >
        {/* <OakForm formGroupName={formId} handleSubmit={save}> */}
        {props.projectId && (
          <>
            {/* <div className="section__heading">Endpoint configuration</div> */}
            <div className="section__form">
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
              <OakSelect
                gutterBottom
                formGroupName={formId}
                value={state.responseType}
                handleChange={handleChange}
                options={['None', 'Object', 'Array']}
                name="responseType"
                label="Response type"
              />
            </div>
          </>
        )}
        {props.projectId && (
          <>
            {/* <div className="section__heading">Response configuration</div> */}
            {['Object', 'Array'].includes(state.responseType) && (
              <DataStructureBuilder
                data={state.response}
                label="Response data structure"
                handleChange={handleDataStructureChange}
              />
            )}
          </>
        )}
        {/* </OakForm> */}
      </OakSection>
      <div className="action-footer position-right">
        <OakButton
          theme="primary"
          variant="appear"
          formGroupName={formId}
          handleClick={save}
        >
          Save
        </OakButton>
        <OakButton theme="default" variant="appear" handleClick={goBack}>
          Close
        </OakButton>
      </div>
    </>
  );
};

export default CustomEndpoint;
