import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveDomainEndpoint, saveEndpoint } from '../service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import DataStructureBuilder from '../../DataStructure/DataStructureBuilder';
import OakSubheading from '../../../oakui/OakSubheading';
import OakSelect from '../../../oakui/OakSelect';

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
    { key: 'None', value: 'None - We do not have a unique identifier' },
  ]);
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

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
      { key: 'None', value: 'None - We do not have a unique identifier' },
      ...state.response
        .filter(node => {
          if (
            !node.parentReference &&
            node.datatype !== 'object' &&
            !node.array
          ) {
            return true;
          }
        })
        .map(node => {
          return { key: node.reference, value: node.name };
        }),
    ]);
  }, [state.response]);

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
        newData = state.response.filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.response.filter(
          item => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, response: newData });
  };

  const save = async () => {
    console.log(props);
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

  return (
    <>
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
            id="response"
            label="Domain data structure"
            handleChange={handleDataStructureChange}
          />
          <OakSelect
            data={state}
            id="key"
            handleChange={handleChange}
            objects={keyList}
            label="Primary key"
          />
        </OakForm>
      )}
      <OakFooter>
        <OakButton theme="primary" variant="appear" action={save}>
          Save
        </OakButton>
        <OakButton theme="default" variant="appear" action={goBack}>
          Close
        </OakButton>
      </OakFooter>
    </>
  );
};

export default DomainEndpoint;
