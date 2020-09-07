import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CustomEndpoint.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveDomainEndpoint } from './service';
import { sendMessage, newMessageId } from '../../../events/MessageService';

interface Props {
  space: string;
  history: any;
  projectId: string;
}

const CustomEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    projectId: props.projectId,
    name: '',
    description: '',
    structure: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

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

  const save = async () => {
    console.log(props);
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${state.name}]`,
    });
    const response = await saveDomainEndpoint(
      props.space,
      authorization,
      state
    );
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
    <div className="create-project">
      <OakForm>
        <OakText
          data={state}
          id="name"
          handleChange={handleNameChange}
          label="Name of the domain"
        />
        <OakText
          data={state}
          id="description"
          handleChange={handleChange}
          label="Short description about the project"
          multiline
        />
        <OakText
          data={state}
          id="structure"
          handleChange={handleChange}
          label="Domain data structure"
          multiline
        />
      </OakForm>
      <OakFooter>
        <OakButton theme="primary" variant="appear" action={save}>
          Save
        </OakButton>
        <OakButton theme="default" variant="appear">
          Cancel
        </OakButton>
      </OakFooter>
    </div>
  );
};

export default CustomEndpoint;
