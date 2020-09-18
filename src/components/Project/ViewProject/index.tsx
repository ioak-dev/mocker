import React from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import DetailSection from './DetailSection';
import AdminSection from './AdminSection';
import OakTab from '../../../oakui/OakTab';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  location: any;
}

const ViewProject = (props: Props) => {
  const query = queryString.parse(props.location.search);
  const project = useSelector(state =>
    state.project.projects.find(item => item._id === query.id)
  );

  const tabMeta = [
    {
      slotName: 'overview',
      label: 'Overview',
      icon: 'dehaze',
    },
    {
      slotName: 'member',
      label: 'Members',
      icon: 'people',
    },
    {
      slotName: 'administrator',
      label: 'Administrators',
      icon: 'admin_panel_settings',
    },
  ];

  return (
    <OakPage>
      <OakTab meta={tabMeta} variant="fullpage">
        <div slot="overview">
          <OakSection>
            <DetailSection
              project={project}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="member">
          <OakSection>
            <AdminSection
              project={project}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
        <div slot="administrator">
          <OakSection>
            <AdminSection
              project={project}
              space={props.space}
              history={props.history}
            />
          </OakSection>
        </div>
      </OakTab>
    </OakPage>
  );
};

export default ViewProject;
