import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakTab from '../../../oakui/OakTab';
import CustomEndpoint from '../CustomEndpoint';
import ListApiSpecification from './ListApiSpecification';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewEndpointCustom = (props: Props) => {
  const [query, setQuery] = useState({
    id: '',
  });
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const customEndpoint = useSelector(state =>
    state.endpoint.endpoints.find(item => item._id === query.id)
  );
  const project = useSelector(state =>
    state.project.projects.find(item => item._id === customEndpoint?.projectId)
  );
  const goBack = () => props.history.goBack();

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setQuery(query);
  }, [props.location.search]);

  const [projectElements, setProjectElements] = useState<any>([]);

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
          {customEndpoint && (
            <OakSection>
              <CustomEndpoint
                data={customEndpoint}
                history={props.history}
                space={props.space}
                projectId={customEndpoint?.projectId}
              />
            </OakSection>
          )}
        </div>
        <div slot="endpoints">
          <OakSection>
            <ListApiSpecification
              space={props.space}
              history={props.history}
              endpoint={customEndpoint}
              project={project}
            />
          </OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewEndpointCustom;
