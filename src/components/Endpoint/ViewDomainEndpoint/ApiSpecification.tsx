import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakForm from '../../../oakui/OakForm';
import DataStructureBuilder from '../CreateEndpoint/DataStructureBuilder';
import OakTab from '../../../oakui/OakTab';
import OakSubheading from '../../../oakui/OakSubheading';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';
import { newMessageId, sendMessage } from '../../../events/MessageService';
import { saveDomainEndpoint } from '../CreateEndpoint/service';
import OakText from '../../../oakui/OakText';
import OakSelect from '../../../oakui/OakSelect';
import ApiSpecificationLink from './ApiSpecificationLink';

const queryString = require('query-string');

interface Props {
  space: string;
  endpoint: any;
  project: any;
}

const ApiSpecification = (props: Props) => {
  return (
    <>
      {props.project && props.endpoint && (
        <>
          <ApiSpecificationLink
            type="GET"
            url={`${process.env.REACT_APP_API_URL}/api/${props.space}/${props.project.reference}/domain/${props.endpoint.name}`}
          />
        </>
      )}
    </>
  );
};

export default ApiSpecification;
