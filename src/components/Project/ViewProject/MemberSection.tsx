import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose as tableCompose } from '@oakui/core-stage/style-composer/OakTableComposer';
import { PaginatePref } from '@oakui/core-stage/types/PaginatePrefType';
import {
  TableHeader,
  TableCellDatatype,
} from '@oakui/core-stage/types/TableHeaderType';
import { getPage } from '@oakui/core-stage/service/OakTableService';
import { addRole, removeRole } from '../service';
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
  const users = useSelector((state: any) => state.user.users);
  const roles = useSelector((state: any) => state.role.roles);
  const authorization = useSelector((state: any) => state.authorization);
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
      setUserView(result.filteredResults);
      setTotalRows(result.totalRows);
    }
  }, [paginationPref, users, roles, memberMap]);

  const toggleMember = async (member: any) => {
    if (member.value) {
      await removeRole(props.space, authorization, member.roleId.name);
    } else {
      await addRole(props.space, authorization, {
        userId: member._id,
        domainId: props.project._id,
        type: 'ProjectMember',
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
                      name={member._id}
                      value={false}
                      handleChange={() => toggleMember(member)}
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
