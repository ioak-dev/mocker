import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';
import OakTable from '../../oakui/wc/OakTable';

interface Props {
  events: {
    name: string;
    description: string;
  }[];
}

const EventSection = (props: Props) => {
  return (
    <div className="event-section">
      {props.events.length > 0 && (
        <OakTable fill="none" navPlacement="none" elevation={0}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.events.map((row) => (
                <tr>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </OakTable>
      )}
      {props.events.length === 0 && (
        <OakTypography variant="body2">
          No events emitted from this component.
        </OakTypography>
      )}
    </div>
  );
};

export default EventSection;
