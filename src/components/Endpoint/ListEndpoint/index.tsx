import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import {
  TableCellDatatype,
  TableHeader,
} from '@oakui/core-stage/types/TableHeaderType';
import { PaginatePref } from '@oakui/core-stage/types/PaginatePrefType';
import { getPage } from '@oakui/core-stage/service/OakTableService';

import './style.scss';
import OakButton from '../../../oakui/wc/OakButton';
import OakFormActionsContainer from '../../../oakui/wc/OakFormActionsContainer';
import EndpointLink from './EndpointLink';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ListEndpoint = (props: Props) => {
  const query = queryString.parse(props.location.search);
  const project = useSelector((state: any) =>
    state.project.projects.find((item: any) => item._id === query.id)
  );

  const projects = useSelector((state: any) => state.project.projects);
  const [endpoints, setEndpoints] = useState<any[]>();
  const [projectElements, setProjectElements] = useState<any>([]);

  const [view, setView] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [paginationPref, setPaginationPref] = useState<PaginatePref>({
    pageNo: 1,
    rowsPerPage: 5,
    searchText: '',
  });
  const headers: TableHeader[] = [
    {
      name: 'name',
      datatype: TableCellDatatype.text,
    },
    {
      name: 'description',
      datatype: TableCellDatatype.text,
    },
  ];

  const allEndpoints = useSelector((state: any) => state.endpoint.endpoints);

  useEffect(() => {
    if (project) {
      setEndpoints(
        allEndpoints.filter((item: any) => item.projectId === project._id)
      );
    }
  }, [project, allEndpoints]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map((item: any) => {
      localState.push({ id: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const handlePageChange = (detail: any) => {
    setPaginationPref(detail);
  };

  useEffect(() => {
    if (paginationPref && endpoints) {
      const result = getPage(endpoints, headers, paginationPref);
      setView(result.filteredResults);
      setTotalRows(result.totalRows);
    }
  }, [paginationPref, endpoints]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${project._id}`
    );

  const handleProjectChange = (detail: any) => {
    props.history.push(`/${props.space}/endpoint?projectId=${detail.value}`);
  };
  const goToViewPage = (endpoint: any) => {
    props.history.push(
      `/${props.space}/endpoint/${endpoint.type}/view?id=${endpoint._id}`
    );
  };

  return (
    <>
      {project && (
        <div className="list-endpoint">
          <div className="action-footer position-left">
            <OakButton
              handleClick={gotoCreatePage}
              theme="default"
              variant="appear"
            >
              New endpoint
            </OakButton>
          </div>
          <div className="list-endpoint__container">
            {endpoints?.map((item: any) => (
              <EndpointLink
                key={item._id}
                space={props.space}
                history={props.history}
                endpoint={item}
              />
            ))}
          </div>
          {!endpoints ||
            (endpoints.length === 0 && (
              <div className="typography-4">No endpoints yet</div>
            ))}
        </div>
      )}
    </>
  );
};

export default ListEndpoint;
