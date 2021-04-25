import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { PaginatePref } from '@oakui/core-stage/types/PaginatePrefType';
import {
  TableHeader,
  TableCellDatatype,
} from '@oakui/core-stage/types/TableHeaderType';
import { getPage } from '@oakui/core-stage/service/OakTableService';
import {
  addProjectMember,
  getProjectMembers,
  removeProjectMember,
} from '../service';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import OakTable from '../../../oakui/wc/OakTable';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';

import './MemberSection.scss';
import OakPaginate from '../../../oakui/wc/OakPaginate';
import OakSection from '../../../oakui/wc/OakSection';

interface Props {
  space: string;
  history: any;
  project: any;
}

const MemberSection = (props: Props) => {
  const users = useSelector((state) => state.user.users);
  const authorization = useSelector((state) => state.authorization);
  const [memberMap, setMemberMap] = useState<any>({});
  const [userView, setUserView] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [paginationPref, setPaginationPref] = useState<PaginatePref>({
    pageNo: 1,
    rowsPerPage: 5,
    searchText: '',
  });
  const headers: TableHeader[] = [
    {
      name: 'firstName',
      datatype: TableCellDatatype.text,
    },
    {
      name: 'lastName',
      datatype: TableCellDatatype.text,
    },
  ];

  const handlePageChange = (detail: any) => {
    setPaginationPref(detail);
  };

  useEffect(() => {
    if (paginationPref && users && memberMap) {
      const result = getPage(
        users.map((user: any) => {
          const member = memberMap[user._id];
          return {
            ...user,
          };
        }),
        headers,
        paginationPref
      );
      console.log(result);
      setUserView(result.filteredResults);
      setTotalRows(result.totalRows);
    }
  }, [paginationPref, users, memberMap]);

  useEffect(() => {
    (async () => {
      if (props.project) {
        await fetchMembers();
      }
    })();
  }, [props.project]);

  const fetchMembers = async () => {
    const response = await getProjectMembers(
      props.space,
      authorization,
      props.project._id
    );

    if (response.status === 200) {
      setMemberMap(
        response.data.data?.map((item: any) => ({ [item.userId]: item }))
      );
    }
  };

  const gotoEditPage = () => {
    console.log('edit page');
  };

  const toggleMember = async (detail: any) => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Removing member from project`,
    });
    const response = await removeProjectMember(
      props.space,
      authorization,
      detail.name
    );

    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Member removed from project successfully`,
        duration: 3000,
      });
    }
  };

  const addUser = async (detail: any) => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Adding member to project`,
    });
    const response = await addProjectMember(props.space, authorization, {
      userId: detail.value,
      projectId: props.project._id,
      type: 'props.type',
    });
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Member added to project successfully`,
        duration: 3000,
      });
    }
  };
  return (
    <OakSection
      fillColor="container"
      rounded
      elevation={1}
      className="project-member-section__root"
    >
      <div className="project-member-section">
        <div className="project-member-section__heading">User permissions</div>
        <OakPaginate
          paginatePref={paginationPref}
          handleChange={handlePageChange}
          totalRows={totalRows}
          variant="table"
        />
        <div className="project-member-section__grid">
          <table
            className={tableCompose({
              color: 'container',
              navPosition: 'top',
            })}
          >
            <thead>
              <tr>
                <th>User</th>
                <th>User</th>
                <th>User</th>
                <th>User</th>
                <th>Member</th>
                <th>Administrator</th>
              </tr>
            </thead>
            <tbody>
              {userView.map((member) => (
                <tr>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  <td>
                    {member.firstName} {member.lastName}
                  </td>
                  <td>
                    <OakCheckbox
                      name={member.userId}
                      value={true}
                      handleChange={toggleMember}
                    />
                  </td>
                  <td>test</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OakSection>
  );
};

export default MemberSection;
