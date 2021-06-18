import React, { useState } from 'react';

import './DataStructureBuilder.scss';
import FieldElement from './FieldElement';

interface Props {
  data: any;
  handleChange: any;
  label: string;
  gutterBottom?: boolean;
}

const DataStructureBuilder = (props: Props) => {
  const handleChange = (actionType: string, changeData: any) => {
    console.log(props.data, actionType);
    let newData: any[] = props.data ? [...props.data] : [];
    switch (actionType) {
      case 'remove':
        newData = newData.filter(
          (item: any) =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        const index = newData.findIndex(
          (item) => item.reference === changeData.reference
        );
        if (index >= 0) {
          newData[index] = changeData;
        } else {
          newData.push(changeData);
        }
        break;

      default:
        break;
    }
    props.handleChange(newData);
  };

  return (
    <div
      className={`data-structure-builder ${
        props.gutterBottom ? 'data-structure-builder--gutter-bottom' : ''
      }`}
    >
      <div className="data-structure-builder__label">{props.label}</div>
      <div className="data-structure-builder__content">
        <FieldElement
          data={props.data}
          id=""
          reference={null}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DataStructureBuilder;
