import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import { saveProject } from '../service';
import { sendMessage, newMessageId, newId } from '../../../events/MessageService';
import OakSection from '../../../oakui/wc/OakSection';
import OakForm from '../../../oakui/wc/OakForm';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
  space: string;
  history: any;
}

const CreateProject = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    name: '',
    description: '',
    reference: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  const handleChange = detail => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
  };

  const handleNameChange = detail => {
    setState({
      ...state,
      name: detail.value,
      reference:
        state.name === state.reference
          ? detail.value
          : state.reference,
    });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving project [${state.name}]`,
    });
    const response = await saveProject(props.space, authorization, {
      ...state,
      reference: state.reference
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/\W/g, ''),
    });
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Project [${state.name}] saved successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/project`);
    }
  };

  const formId = newId();

  return (
      <OakSection fillColor="container">
        Create new project
        <div className="create-project">
          <OakForm formGroupName={formId} handleSubmit={save}>
            <OakInput formGroupName={formId} 
              value={state.name}
              name="name"
              handleInput={handleNameChange}
              label="Project name"
            />
            <OakInput formGroupName={formId} 
              value={state.reference
                  .toLowerCase()
                  .replace(/\s/g, '')
                  .replace(/\W/g, '')}
              name="reference"
              handleInput={handleChange}
              label="Reference word for URL path prefix"
            />
            <OakInput formGroupName={formId} 
              value={state.description}
              name="description"
              handleInput={handleChange}
              label="Short description about the project"
            />
          </OakForm>
        <div>
            <OakButton theme="primary" variant="appear" type="submit" formGroupName={formId}>
              Save
            </OakButton>
            <OakButton theme="default" variant="appear">
              Cancel
            </OakButton>
          </div>
      </div>
    </OakSection>
  );
};

export default CreateProject;
