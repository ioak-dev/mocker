import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSelect from '../../../oakui/OakSelect';
import OakForm from '../../../oakui/OakForm';
import OakSubheading from '../../../oakui/OakSubheading';
import CustomEndpoint from '../CustomEndpoint';
import DomainEndpoint from '../DomainEndpoint';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const emptyEndpoint = {
  name: '',
  description: '',
  response: [],
};

const CreateEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState({
    type: 'Domain endpoint',
    projectId: '',
  });

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setState({ ...state, projectId: query?.projectId, type: query?.type });
  }, [props.location.search]);

  const [projectElements, setProjectElements] = useState<any>([]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map(item => {
      localState.push({ key: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${event.currentTarget.value}&type=${state.type}`
    );
  };

  const handleTypeChange = event => {
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${state.projectId}&type=${event.currentTarget.value}`
    );
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
        <OakForm>
          <OakSubheading title="Basic details" />
          <OakSelect
            id="projectId"
            data={state}
            handleChange={handleProjectChange}
            label="Project"
            objects={projectElements}
          />
          <OakSelect
            id="type"
            data={state}
            handleChange={handleTypeChange}
            label="Endpoint type"
            objects={[
              { key: 'domain', value: 'Domain endpoint' },
              { key: 'custom', value: 'Custom endpoint' },
            ]}
          />
        </OakForm>
        {state.projectId && state.type === 'domain' && (
          <DomainEndpoint
            space={props.space}
            history={props.history}
            projectId={state.projectId}
          />
        )}
        {state.projectId && state.type === 'custom' && (
          <CustomEndpoint
            space={props.space}
            history={props.history}
            projectId={state.projectId}
          />
        )}
      </OakSection>
    </OakPage>
  );
};

export default CreateEndpoint;
