import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';

import './style.scss';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import { saveDomainEndpoint } from '../service';
import DomainEndpoint from '../DomainEndpoint';
import ListApiSpecification from './ListApiSpecification';
import OakTab from '../../../oakui/wc/OakTab';

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
  const authorization = useSelector((state: any) => state.authorization);
  const domainEndpoint = useSelector((state: any) =>
    state.endpoint.endpoints.find((item: any) => item._id === query.id)
  );
  const project = useSelector((state: any) =>
    state.project.projects.find(
      (item: any) => item._id === domainEndpoint?.projectId
    )
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

  const handleDataStructureChange = (actionType: string, changeData: any) => {
    console.log(actionType, changeData);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = state.response.filter(
          (item: any) =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = state.response.filter(
          (item: any) => item.reference !== changeData.reference
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
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (detail: any) => {
    setTabIndex(detail.value);
  };

  return (
    <div
      className={sectionCompose({
        fillColor: 'container',
        paddingHorizontal: 4,
        paddingVertical: 4,
        rounded: true,
      })}
    >
      <OakTab tabs={['Settings', 'Link']} handleChange={handleTabChange}>
        <div>
          {tabIndex === 0 && domainEndpoint && (
            <DomainEndpoint
              data={domainEndpoint}
              history={props.history}
              space={props.space}
              projectId={domainEndpoint?.projectId}
            />
          )}
          {tabIndex === 1 && (
            <ListApiSpecification
              space={props.space}
              history={props.history}
              endpoint={domainEndpoint}
              project={project}
            />
          )}
        </div>
      </OakTab>
    </div>
  );
};

export default ViewEndpointDomain;
