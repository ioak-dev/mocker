import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakForm from '../../../oakui/OakForm';
import DataStructureBuilder from '../CreateEndpoint/DataStructureBuilder';
import OakTab from '../../../oakui/OakTab';
import OakSubheading from '../../../oakui/OakSubheading';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import { saveDomainEndpoint } from '../CreateEndpoint/service';
import OakText from '../../../oakui/OakText';
import OakSelect from '../../../oakui/OakSelect';
import ApiSpecification from './ApiSpecification';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewDomainEndpoint = (props: Props) => {
  const [query, setQuery] = useState({
    id: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const domainEndpoint = useSelector(state =>
    state.domain.domains.find(item => item._id === query.id)
  );
  const project = useSelector(state =>
    state.project.projects.find(item => item._id === domainEndpoint?.projectId)
  );
  const goBack = () => props.history.goBack();

  const [state, setState] = useState<any>({
    projectId: '',
    name: '',
    description: '',
    structure: [],
  });

  useEffect(() => {
    if (domainEndpoint) {
      setState({ ...domainEndpoint });
    }
  }, [domainEndpoint]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setQuery(query);
  }, [props.location.search]);

  const [projectElements, setProjectElements] = useState<any>([]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleNameChange = event => {
    setState({
      ...state,
      name: event.currentTarget.value
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/\W/g, ''),
    });
  };

  const handleDataStructureChange = (actionType, changeData) => {
    console.log(actionType, changeData);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state.structure.filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.structure.filter(
          item => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, structure: newData });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${state.name}]`,
    });
    const response = await saveDomainEndpoint(props.space, authorization, {
      ...state,
    });
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Domain endpoint [${state.name}] saved successfully`,
        duration: 3000,
      });
    }
  };

  return (
    <OakPage>
      <OakTab
        noBookmarking
        variant="fullpage"
        meta={[
          {
            slotName: 'endpoints',
            label: 'API Spec',
            icon: 'link',
          },
          {
            slotName: 'settings',
            label: 'Settings',
            icon: 'settings',
          },
        ]}
      >
        <div slot="settings">
          <OakSection>
            <OakFooter>
              <OakButton variant="appear" theme="primary" action={save}>
                Save
              </OakButton>
              <OakButton variant="appear" theme="default" action={goBack}>
                Cancel and Go back
              </OakButton>
            </OakFooter>
            <OakSubheading title="Basic details" />
            {project && (
              <OakForm>
                <OakText
                  data={project}
                  handleChange={handleChange}
                  disabled
                  id="name"
                  label="Project name"
                />
                <OakText
                  data={state}
                  handleChange={handleNameChange}
                  id="name"
                  label="Name of the domain"
                />
              </OakForm>
            )}
            <OakSubheading title="Domain structure" />
            <OakForm>
              <DataStructureBuilder
                data={state}
                id="structure"
                handleChange={handleDataStructureChange}
              />
            </OakForm>
          </OakSection>
        </div>
        <div slot="endpoints">
          <OakSection>
            <ApiSpecification
              space={props.space}
              endpoint={domainEndpoint}
              project={project}
            />
          </OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewDomainEndpoint;
