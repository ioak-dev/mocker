import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FieldElement.scss';

interface Props {
  data: any[];
  reference: string | undefined;
}

const FieldElement = (props: Props) => {
  const [currentField, setCurrentField] = useState<any>();
  const [children, setChildren] = useState<any>();

  useEffect(() => {
    setCurrentField(
      props.data.find(item => item.reference === props.reference)
    );
    setChildren(
      props.data.filter(item => item.parentReference === props.reference)
    );
  }, [props.data, props.reference]);

  return (
    <>
      <div className="field-element-parent">
        <div className="field-element-parent--name">{currentField?.name}</div>
        <div className="field-element-parent--dtype typography-4">
          Datatype:{' '}
          {`${currentField?.datatype}${currentField?.array ? ' [ ]' : ''}`}
        </div>
      </div>
      {children?.length > 0 && (
        <div className="field-element-children">
          {children.map(child => (
            <div
              className="field-element-children--element"
              key={child.reference}
            >
              <FieldElement data={props.data} reference={child.reference} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FieldElement;
