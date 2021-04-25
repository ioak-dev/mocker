import {
  compose,
  OakSectionProps,
} from '@oakui/core-stage/style-composer/OakSectionComposer';
import React, { useState, useEffect, useRef } from 'react';

interface Props extends OakSectionProps {
  children: any;
  className?: string;
}

const OakSection = (props: Props) => {
  return (
    <div className={`${compose(props)} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default OakSection;
