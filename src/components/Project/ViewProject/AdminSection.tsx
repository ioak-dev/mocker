import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakSubheading from '../../../oakui/OakSubheading';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  project: any;
}

const AdminSection = (props: Props) => {
  const gotoEditPage = () => {
    console.log('edit page');
  };
  return (
    <div className="project-admin-section">
      <OakSubheading
        title="Project Administrators"
        links={[
          {
            label: 'Edit',
            icon: 'edit',
            action: gotoEditPage,
          },
        ]}
        linkSize="large"
      />
      {props.project && (
        <div className="project-admin-section--content">
          List of project administrators goes here
        </div>
      )}
    </div>
  );
};

export default AdminSection;
