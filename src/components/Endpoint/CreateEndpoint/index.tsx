import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import CustomEndpoint from '../CustomEndpoint';
import DomainEndpoint from '../DomainEndpoint';
import { newId } from '../../../events/MessageService';
import OakSelect from '../../../oakui/wc/OakSelect';
import OakSection from '../../../oakui/wc/OakSection';

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
  const projects = useSelector((state: any) => state.project.projects);
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
    projects.map((item: any) => {
      localState.push({ id: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const handleChange = (detail: any) => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
  };

  const handleProjectChange = (detail: any) => {
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${detail.value}&type=${state.type}`
    );
  };

  const handleTypeChange = (detail: any) => {
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${state.projectId}&type=${detail.value}`
    );
  };

  const [formId, setFormId] = useState(newId());

  return (
    <>
      <OakSection
        fillColor="container"
        paddingHorizontal={2}
        paddingVertical={2}
        rounded
        elevation={1}
        marginVertical={4}
      >
        <div className="section__heading">Create endpoint</div>
        <div className="section__form">
          <OakSelect
            name="projectId"
            gutterBottom
            value={state.projectId}
            handleChange={handleProjectChange}
            label="Project"
            optionsAsKeyValue={projectElements}
          />
          <OakSelect
            name="type"
            gutterBottom
            value={state.type}
            handleChange={handleTypeChange}
            label="Endpoint type"
            optionsAsKeyValue={[
              { id: 'domain', value: 'Domain endpoint' },
              { id: 'custom', value: 'Custom endpoint' },
            ]}
          />
        </div>
      </OakSection>
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
    </>
  );
};

export default CreateEndpoint;
