import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakSelect from '../../../oakui/OakSelect';
import ListDomain from './ListDomain';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ListEndpoint = (props: Props) => {
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState({
    projectId: '',
  });
  const [projectElements, setProjectElements] = useState<any>([]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setState({ ...state, projectId: query?.projectId });
  }, [props.location.search]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map(item => {
      localState.push({ key: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${state.projectId}`
    );

  const handleProjectChange = event => {
    props.history.push(
      `/${props.space}/endpoint?projectId=${event.currentTarget.value}`
    );
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Endpoint management console"
          subtitle="Creation and maintainance of your project API endpoints"
        />
        <OakForm>
          <OakSelect
            id="projectId"
            data={state}
            handleChange={handleProjectChange}
            label="Choose project"
            objects={projectElements}
          />
        </OakForm>
        <ListDomain
          space={props.space}
          projectId={state.projectId}
          history={props.history}
        />
      </OakSection>
    </OakPage>
  );
};

export default ListEndpoint;
