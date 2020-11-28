import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ApiSpecificationLink.scss';
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

const queryString = require('query-string');

interface Props {
  type: string;
  url: string;
}

const ApiSpecificationLink = (props: Props) => {
  return (
    <div className="api-specification-link">
      <div>{props.type}</div>
      <div>{props.url}</div>
    </div>
  );
};

export default ApiSpecificationLink;
