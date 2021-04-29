import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';

import './style.scss';
import OakButton from '../../../oakui/wc/OakButton';
import OakFormActionsContainer from '../../../oakui/wc/OakFormActionsContainer';
import {
  TableCellDatatype,
  TableHeader,
} from '@oakui/core-stage/types/TableHeaderType';
import { PaginatePref } from '@oakui/core-stage/types/PaginatePrefType';
import { getPage } from '@oakui/core-stage/service/OakTableService';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  projectId: string;
}

const ListEndpoint = (props: Props) => {
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
    setEndpoints(
      allEndpoints.filter((item: any) => item.projectId === props.projectId)
    );
  }, [props.projectId, allEndpoints]);

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
      `/${props.space}/endpoint/create?projectId=${props.projectId}`
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
      {props.projectId && (
        <>
          <OakFormActionsContainer align="right">
            <OakButton
              handleClick={gotoCreatePage}
              theme="primary"
              variant="appear"
            >
              New endpoint
            </OakButton>
          </OakFormActionsContainer>
          <div className="list-endpoint">
            {/* <OakPaginate
              paginatePref={paginationPref}
              handleChange={handlePageChange}
              totalRows={totalRows}
              variant="table"
            /> */}
            <div className="project-member-section__grid">
              <table
                className={tableCompose({
                  color: 'global',
                  navPosition: 'top',
                })}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Http methods</th>
                    <th>Data source</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints?.map((item) => (
                    <tr>
                      <td>
                        <OakButton
                          theme="primary"
                          handleClick={() => goToViewPage(item)}
                          // underline="hover"
                        >
                          {item.name}
                        </OakButton>
                      </td>
                      <td>{item.description}</td>
                      <td>
                        {item.type === 'domain'
                          ? 'GET, POST, PUT, DELETE'
                          : item.method}
                      </td>
                      <td>Random / Defined</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!endpoints ||
              (endpoints.length === 0 && (
                <div className="typography-4">No endpoints yet</div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ListEndpoint;
