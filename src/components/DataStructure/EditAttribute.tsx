import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OakForm from '../../oakui/OakForm';
import OakText from '../../oakui/OakText';
import OakFooter from '../../oakui/OakFooter';
import OakButton from '../../oakui/OakButton';
import OakModal from '../../oakui/OakModal';
import OakSelect from '../../oakui/OakSelect';
import OakCheckbox from '../../oakui/OakCheckbox';

interface Props {
  data: any;
  visible: boolean;
  toggleVisibility: any;
  onSave: any;
}

const EditAttribute = (props: Props) => {
  const [state, setState] = useState({
    name: '',
    datatype: '',
    lower: 1,
    upper: 2,
    startSequenceFrom: 0,
    enumValues: '',
    delimiter: ',',
    array: false,
  });

  useEffect(() => {
    setState({ ...state, ...props.data });
  }, [props.data]);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleNumberChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: parseInt(event.currentTarget.value, 10),
    });
  };

  const handleCheckboxChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.checked,
    });
  };

  const save = () => {
    props.onSave(state);
  };

  return (
    <OakModal
      visible={props.visible}
      toggleVisibility={props.toggleVisibility}
      label="Attribute setting"
    >
      <div slot="modal-body" className="modal-body">
        <OakForm>
          <OakText
            data={state}
            id="name"
            handleChange={handleChange}
            label="Field name"
          />
          <OakSelect
            data={state}
            id="datatype"
            handleChange={handleChange}
            label="Datatype"
            elements={[
              'object',
              'integer',
              'decimal',
              'char',
              'word',
              'sentence',
              'alphanumeric',
              'boolean',
              'enum',
              'sequence_number',
            ]}
          />
          {['sequence_number'].includes(state.datatype) && (
            <OakText
              data={state}
              id="startSequenceFrom"
              handleChange={handleNumberChange}
              type="number"
              label="Start from"
            />
          )}
          {state.datatype && !['sequence_number', 'boolean', 'enum', 'object'].includes(state.datatype) && (
            <>
              <OakText
                data={state}
                id="lower"
                handleChange={handleNumberChange}
                type="number"
                label="Lower bound"
              />
              <OakText
                data={state}
                id="upper"
                handleChange={handleNumberChange}
                type="number"
                label="Upper bound"
              />
            </>
          )}
          {['enum'].includes(state.datatype) && (<>
          <OakText
            data={state}
            id="enumValues"
            handleChange={handleChange}
            label="Possible values"
          />
          <OakText
            data={state}
            id="delimiter"
            handleChange={handleChange}
            label="Possible values delimited by"
          /></>)}
          {state.datatype &&
          <OakCheckbox
            id="array"
            data={state}
            handleChange={handleCheckboxChange}
            theme="primary"
            variant="circle"
            label="Array type"
          />}
        </OakForm>
      </div>
      <div className="modal-footer">
        <OakButton theme="primary" variant="appear" action={save}>
          Update
        </OakButton>
      </div>
    </OakModal>
  );
};

export default EditAttribute;
