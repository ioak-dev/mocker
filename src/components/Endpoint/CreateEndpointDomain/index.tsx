import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import DomainEndpoint from './DomainEndpoint';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const emptyEndpoint = {
  name: '',
  description: '',
  structure: [],
};

const CreateEndpointDomain = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    type: 'Domain',
    projectId: '',
  });

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

  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${event.currentTarget.value}`
    );
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="New Domain Endpoint"
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
          <DomainEndpoint
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

export default CreateEndpointDomain;
