import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FieldElement.scss';
import OakDialog from '../../../oakui/OakDialog';
import OakModal from '../../../oakui/OakModal';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import EditAttribute from './EditAttribute';
import { newId } from '../../../events/MessageService';

interface Props {
  data: any[];
  reference: string | undefined;
  handleChange: any;
}
const emptyField = {
  name: '',
  datatype: '',
  lower: '',
  upper: '',
  array: false,
};
const FieldElement = (props: Props) => {
  const [currentField, setCurrentField] = useState<any>();
  const [children, setChildren] = useState<any>();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editNodeData, setEditNodeData] = useState<any>({
    ...emptyField,
    parentReference: props.reference,
    reference: newId(),
  });

  useEffect(() => {
    setCurrentField(
      props.data.find(item => item.reference === props.reference)
    );
    setChildren(
      props.data.filter(item => item.parentReference === props.reference)
    );
  }, [props.data, props.reference]);

  useEffect(() => {
    if (!showEditDialog) {
      setEditNodeData({
        ...emptyField,
        parentReference: props.reference,
        reference: newId(),
      });
    }
  }, [showEditDialog]);

  const editNode = () => {
    setEditNodeData(currentField);
    setShowEditDialog(true);
  };

  const newNode = () => {
    setShowEditDialog(true);
  };

  const onRemoveNode = () => {
    props.handleChange('remove', props.reference);
  };

  const onEditNode = updatedNode => {
    props.handleChange('edit', updatedNode);
    setShowEditDialog(false);
  };

  return (
    <>
      <div className="field-element">
        <div className="field-element-parent">
          <div className="field-element-parent--title typography-5">
            <div>{currentField?.name}</div>
          </div>
          <div className="field-element-parent--subtitle typography-4">
            <div>
              Datatype:{' '}
              {`${currentField?.datatype}${currentField?.array ? ' [ ]' : ''}`}
            </div>
          </div>
          <div className="field-element-parent--action typography-4">
            <div className="field-element-action hyperlink" onClick={editNode}>
              edit
            </div>
            <div
              className="field-element-action hyperlink"
              onClick={onRemoveNode}
            >
              delete
            </div>
            <div className="field-element-action hyperlink" onClick={newNode}>
              new-attribute
            </div>
          </div>
        </div>
        {children?.length > 0 && (
          <div className="field-element-children">
            {children.map(child => (
              <div
                className="field-element-children--element"
                key={child.reference}
              >
                <FieldElement
                  data={props.data}
                  reference={child.reference}
                  handleChange={props.handleChange}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <EditAttribute
        visible={showEditDialog}
        toggleVisibility={() => setShowEditDialog(!showEditDialog)}
        data={editNodeData}
        onSave={onEditNode}
      />
    </>
  );
};

export default FieldElement;
