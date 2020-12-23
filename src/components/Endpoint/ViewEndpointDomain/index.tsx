import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakTab from '../../../oakui/OakTab';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import { saveDomainEndpoint } from '../service';
import DomainEndpoint from '../DomainEndpoint';
import ListApiSpecification from './ListApiSpecification';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewEndpointDomain = (props: Props) => {
  const [query, setQuery] = useState({
    id: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const domainEndpoint = useSelector(state =>
    state.endpoint.endpoints.find(item => item._id === query.id)
  );
  const project = useSelector(state =>
    state.project.projects.find(item => item._id === domainEndpoint?.projectId)
  );
  const goBack = () => props.history.goBack();

  const [state, setState] = useState<any>({
    projectId: '',
    name: '',
    description: '',
    response: [],
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
        newData = state.response.filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.response.filter(
          item => item.reference !== changeData.reference
        );
        newData.push({ ...changeData });
        break;
      default:
        break;
    }
    setState({ ...state, response: newData });
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
          {domainEndpoint && (
            <OakSection>
              <DomainEndpoint
                data={domainEndpoint}
                history={props.history}
                space={props.space}
                projectId={domainEndpoint?.projectId}
              />
            </OakSection>
          )}
        </div>
        <div slot="endpoints">
          <OakSection>
            <ListApiSpecification
              space={props.space}
              history={props.history}
              endpoint={domainEndpoint}
              project={project}
            />
          </OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewEndpointDomain;
