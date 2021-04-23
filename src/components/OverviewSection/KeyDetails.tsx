import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';
import OakTable from '../../oakui/wc/OakTable';

interface Props {
  data: {
    title: string;
    componentName: string;
    composerName: string;
    sections: {
      heading?: string;
      body: string;
    }[];
  };
}

const KeyDetails = (props: Props) => {
  return (
    <div className="key-details">
      <OakTypography variant="body2">{props.data.title}</OakTypography>
      <OakTable fill="none" navPlacement="none" elevation={0}>
        <table>
          <tbody>
            <tr>
              <td>Custom element name</td>
              <td>{props.data.componentName}</td>
            </tr>
            <tr>
              <td>Style composer path</td>
              <td>{props.data.composerName}</td>
            </tr>
          </tbody>
        </table>
      </OakTable>
    </div>
  );
};

export default KeyDetails;
