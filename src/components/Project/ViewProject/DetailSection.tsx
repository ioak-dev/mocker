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

const DetailSection = (props: Props) => {
  const gotoEditPage = () => {
    console.log('edit page');
  };
  return (
    <div className="project-detail-section">
      <OakSubheading
        title="Project details"
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
        <div className="project-detail-section--content">
          <div className="project-detail-section--content--reference">
            {props.project.reference}
          </div>
          <div className="project-detail-section--content--description">
            {props.project.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailSection;
