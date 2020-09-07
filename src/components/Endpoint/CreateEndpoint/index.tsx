import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakForm from '../../../oakui/OakForm';
import OakSelect from '../../../oakui/OakSelect';
import DomainEndpoint from './DomainEndpoint';
import CustomEndpoint from './CustomEndpoint';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const CreateEndpoint = (props: Props) => {
  const query = queryString.parse(props.location.search);
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    type: 'Domain',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

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
          title="New Endpoint"
          links={[
            {
              label: 'Back',
              icon: 'reply',
              action: goBack,
            },
          ]}
          linkSize="large"
        />
        <div className="create-endpoint">
          <OakForm>
            <OakSelect
              data={state}
              id="type"
              handleChange={handleChange}
              label="Choose type of endpoint to mock"
              elements={['Domain', 'Custom']}
            />
          </OakForm>
          {state.type === 'Domain' && (
            <DomainEndpoint
              space={props.space}
              history={props.history}
              projectId={query?.project}
            />
          )}
          {state.type === 'Custom' && (
            <CustomEndpoint
              space={props.space}
              history={props.history}
              projectId={query?.project}
            />
          )}
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateEndpoint;
