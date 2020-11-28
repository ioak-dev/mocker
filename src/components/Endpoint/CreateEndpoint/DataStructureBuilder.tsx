import React, { useState } from 'react';

import './DataStructureBuilder.scss';
import FieldElement from './FieldElement';

interface Props {
  data: any;
  id: string;
  handleChange: any;
}

const DataStructureBuilder = (props: Props) => {
  return (
    <div className="data-structure-builder">
      <div className="data-structure-builder--label">Domain data structure</div>
      <FieldElement
        data={props.data[props.id]}
        reference={null}
        handleChange={props.handleChange}
      />
    </div>
  );
};

export default DataStructureBuilder;
