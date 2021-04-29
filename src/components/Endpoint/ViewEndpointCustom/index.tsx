import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import CustomEndpoint from '../CustomEndpoint';
import ListApiSpecification from './ListApiSpecification';
import OakTab from '../../../oakui/wc/OakTab';

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
  const authorization = useSelector((state: any) => state.authorization);
  const customEndpoint = useSelector((state: any) =>
    state.endpoint.endpoints.find((item: any) => item._id === query.id)
  );
  const project = useSelector((state: any) =>
    state.project.projects.find(
      (item: any) => item._id === customEndpoint?.projectId
    )
  );
  const goBack = () => props.history.goBack();

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    setQuery(query);
  }, [props.location.search]);

  const [projectElements, setProjectElements] = useState<any>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (detail: any) => {
    setTabIndex(detail.value);
  };

  return (
    <OakTab tabs={['API Spec', 'Settings']} handleChange={handleTabChange}>
      {tabIndex === 0 && (
        <div>
          {customEndpoint && (
            <CustomEndpoint
              data={customEndpoint}
              history={props.history}
              space={props.space}
              projectId={customEndpoint?.projectId}
            />
          )}
        </div>
      )}
      {tabIndex === 1 && (
        <div>
          <ListApiSpecification
            space={props.space}
            history={props.history}
            endpoint={customEndpoint}
            project={project}
          />
        </div>
      )}
    </OakTab>
  );
};

export default ViewEndpointCustom;
