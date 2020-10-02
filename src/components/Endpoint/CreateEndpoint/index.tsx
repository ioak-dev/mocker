import React, { useEffect, useState } from 'react';
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
  const projects = useSelector(state => state.project.projects);
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    type: 'Domain',
    projectId: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setState({ ...state, projectId: query?.projectId });
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
      `/${props.space}/endpoint/create?projectId=${event.currentTarget.value}`
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
        <div className="create-endpoint">
          <OakForm>
            <OakSelect
              id="projectId"
              data={state}
              handleChange={handleProjectChange}
              label="Choose project"
              objects={projectElements}
            />
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
              projectId={state.projectId}
            />
          )}
          {state.type === 'Custom' && (
            <CustomEndpoint
              space={props.space}
              history={props.history}
              projectId={state.projectId}
            />
          )}
        </div>
      </OakSection>
    </OakPage>
  );
};

export default CreateEndpoint;
