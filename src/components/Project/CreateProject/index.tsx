import React from 'react';
import './style.scss';
import OakText from '../../../oakui/OakText';
import OakButton from '../../../oakui/OakButton';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';

interface Props {
  match: any;
  location: any;
  history: any;
  asset: string;
}
const CreateProject = (props: Props) => {
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <OakPage>
      <OakSection>
        <div className="list-template">
          <div className="list-template">
            <div className="typography-14">Create Project</div>
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
              label="Lorem ipsum"
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakButton theme="primary" variant="appear" action={goBack}>
              Cancel
            </OakButton>
            <OakButton theme="primary" variant="appear">
              Submit
            </OakButton>
          </div>
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateProject;
