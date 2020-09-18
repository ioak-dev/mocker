import React, { useState } from 'react';

import './DataStructureBuilder.scss';
import FieldElement from './FieldElement';

interface Props {
  data: any[];
  handleChange: any;
}

const DataStructureBuilder = (props: Props) => {
  return (
    <div className="data-structure-builder">
      <div className="data-structure-builder--label">Domain data structure</div>
      <FieldElement
        data={props.data}
        reference={undefined}
        handleChange={props.handleChange}
      />
    </div>
  );
};

export default DataStructureBuilder;
