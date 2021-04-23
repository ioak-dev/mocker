import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';
import OakTable from '../../oakui/wc/OakTable';

interface Props {
  properties: {
    name: string;
    type: string;
    default?: string;
    description: string;
  }[];
}

const PropertySection = (props: Props) => {
  return (
    <div className="property-section">
      <OakTable fill="none" navPlacement="none" elevation={0}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.properties.map((row) => (
              <tr>
                <td>{row.name}</td>
                <td dangerouslySetInnerHTML={{ __html: row.type || '' }} />
                <td>{row.default}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </OakTable>
    </div>
  );
};

export default PropertySection;
