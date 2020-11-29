import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakForm from '../../../oakui/OakForm';
import OakSelect from '../../../oakui/OakSelect';
import CustomEndpoint from './CustomEndpoint';
import OakSubheading from '../../../oakui/OakSubheading';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const emptyEndpoint = {
  name: '',
  description: '',
  responseType: 'None',
  payloadType: 'None',
  method: 'GET',
  response: [],
  payload: [],
};

const CreateEndpointCustom = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    type: 'Custom',
    projectId: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setState({ ...state, projectId: query?.projectId });
  }, [props.location.search]);

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
          title="New Custom Endpoint"
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
          <CustomEndpoint
            space={props.space}
            history={props.history}
            projectId={state.projectId}
            data={emptyEndpoint}
          />
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateEndpointCustom;
