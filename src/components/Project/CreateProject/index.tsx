import React, { useState } from 'react';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';

interface Props {
  space: string;
  history: any;
}

const CreateProject = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({ name: '', description: '' });

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="New Project"
          subtitle="Ipsum omnis unde ratione iure molestias perspiciatis omnis accusamus"
          links={[
            {
              label: 'Back',
              icon: 'reply',
              action: goBack,
            },
          ]}
          linkSize="large"
        />
        <div className="create-project">
          <OakForm>
            <OakText
              data={state}
              id="name"
              handleChange={handleChange}
              label="Project name"
            />
            <OakText
              data={state}
              id="description"
              handleChange={handleChange}
              label="Short description about the project"
              multiline
            />
          </OakForm>
          <OakFooter>
            <OakButton theme="primary" variant="appear">
              Save
            </OakButton>
            <OakButton theme="default" variant="appear">
              Cancel
            </OakButton>
          </OakFooter>
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateProject;
