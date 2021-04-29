import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import { saveDomainEndpoint, saveEndpoint } from '../service';
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

const DomainEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState<any>({
    projectId: props.projectId,
    name: '',
    description: '',
    key: '',
    response: [],
  });
  const [keyList, setKeyList] = useState<any[]>([
    { id: 'None', value: 'None - We do not have a unique identifier' },
  ]);
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
        projectId: props.projectId,
      });
    }
  }, [props.projectId, props.data]);

  useEffect(() => {
    setKeyList([
      { id: 'None', value: 'None - We do not have a unique identifier' },
      ...state.response
        .filter((node: any) => {
          if (
            !node.parentReference &&
            node.datatype !== 'object' &&
            !node.array
          ) {
            return true;
          }
        })
        .map((node: any) => {
          return { id: node.reference, value: node.name };
        }),
    ]);
  }, [state.response]);

  const handleChange = (detail: any) => {
    console.log(detail);
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

  const handleDataStructureChange = (actionType: string, changeData: any) => {
    console.log(actionType, changeData);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state.response.filter(
          (item: any) =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.response.filter(
          (item: any) => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, response: newData });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${state.name}]`,
    });
    const response = await saveEndpoint(props.space, authorization, {
      ...state,
      type: 'domain',
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

  const formId = newId();

  return (
    <>
      {props.projectId && (
        <OakForm formGroupName={formId} handleSubmit={save}>
          <div className="domain-endpoint-sections">
            <OakSection
              fillColor="container"
              paddingHorizontal={2}
              paddingVertical={4}
              rounded
              elevation={1}
            >
              <div className="section__heading">Endpoint configuration</div>
              <div className="section__form">
                <OakInput
                  color="container"
                  gutterBottom
                  formGroupName={formId}
                  value={state.name}
                  name="name"
                  handleChange={handleNameChange}
                  label="Endpoint path"
                />
                <OakSelect
                  color="container"
                  gutterBottom
                  formGroupName={formId}
                  value={state.source}
                  name="source"
                  handleChange={handleChange}
                  optionsAsKeyValue={[
                    { id: 'Hard coded', value: 'Hard coded' },
                    {
                      id: 'Generated based on data structure',
                      value: 'Generated based on data structure',
                    },
                  ]}
                  label="Data source"
                />
              </div>
            </OakSection>
            {state.source && (
              <OakSection
                fillColor="container"
                paddingHorizontal={2}
                paddingVertical={4}
                rounded
                elevation={1}
              >
                <div className="section__heading">Response</div>
                {state.source === 'Generated based on data structure' && (
                  <>
                    <DataStructureBuilder
                      data={state}
                      id="response"
                      label="Domain data structure"
                      handleChange={handleDataStructureChange}
                    />
                    <OakSelect
                      color="container"
                      gutterBottom
                      formGroupName={formId}
                      value={state.key}
                      name="key"
                      handleChange={handleChange}
                      optionsAsKeyValue={keyList}
                      label="Primary key"
                    />
                  </>
                )}
                {state.source === 'Hard coded' && (
                  <OakInput
                    type="textarea"
                    color="container"
                    gutterBottom
                    formGroupName={formId}
                    value={state.responseData}
                    name="responseData"
                    handleChange={handleChange}
                    label="Response data as JSON"
                  />
                )}
              </OakSection>
            )}
          </div>
        </OakForm>
      )}
      <div className="action-footer position-right">
        <OakButton
          theme="primary"
          variant="appear"
          formGroupName={formId}
          type="submit"
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

export default DomainEndpoint;
