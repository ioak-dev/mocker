import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './DetailSection.scss';
import {
  newId,
  newMessageId,
  sendMessage,
} from '../../../events/MessageService';
import { saveProject } from '../service';
import OakForm from '../../../oakui/wc/OakForm';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakSection from '../../../oakui/wc/OakSection';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  project: any;
}

const DetailSection = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [state, setState] = useState({
    reference: '',
    description: '',
    name: '',
  });

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setState({ ...state, ...props.project });
  }, [props.project]);

  const gotoEditPage = () => {
    console.log('edit page');
  };

  const handleChange = (detail: any) => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
    setIsEdited(true);
  };

  const handleNameChange = (detail: any) => {
    setState({
      ...state,
      name: detail.value,
      reference:
        state.name === state.reference ? detail.value : state.reference,
    });
    setIsEdited(true);
  };

  const discardChanges = () => {
    setState({ ...state, ...props.project });
    setIsEdited(false);
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
    <div className="project-detail-section">
      {props.project && (
        <OakForm formGroupName={formId} handleSubmit={save}>
          <OakSection
            fillColor="container"
            paddingHorizontal={2}
            paddingVertical={4}
            rounded
            elevation={1}
          >
            <div className="section__heading">Project details</div>
            <div className="section__form">
              <OakInput
                color="container"
                formGroupName={formId}
                value={state.name}
                name="name"
                handleInput={handleNameChange}
                label="Project name"
              />
              <OakInput
                color="container"
                formGroupName={formId}
                value={state.reference
                  .toLowerCase()
                  .replace(/\s/g, '')
                  .replace(/\W/g, '')}
                name="reference"
                handleInput={handleChange}
                label="Reference word for URL path prefix"
              />
              <OakInput
                color="container"
                formGroupName={formId}
                value={state.description}
                name="description"
                handleInput={handleChange}
                label="Short description about the project"
              />
            </div>
          </OakSection>
          {isEdited && (
            <div className="action-footer position-right">
              <OakButton
                theme="primary"
                variant="appear"
                formGroupName={formId}
                type="submit"
              >
                Save
              </OakButton>
              <OakButton
                theme="default"
                variant="appear"
                handleClick={discardChanges}
              >
                Discard
              </OakButton>
            </div>
          )}
        </OakForm>
      )}
    </div>
  );
};

export default DetailSection;
