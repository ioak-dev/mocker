import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './DomainEndpoint.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveDomainEndpoint } from './service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import FieldElement from './FieldElement';

interface Props {
  data: any[];
}

const DataStructureBuilder = (props: Props) => {
  return (
    <div className="domain-endpoint">
      <div className="typography-12">Data structure builder</div>
      <FieldElement data={props.data} reference={undefined} />
    </div>
  );
};

export default DataStructureBuilder;
