import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './CustomEndpoint.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakText from '../../../oakui/OakText';
import OakFooter from '../../../oakui/OakFooter';
import OakButton from '../../../oakui/OakButton';
import { saveDomainEndpoint } from './service';
import { sendMessage, newMessageId } from '../../../events/MessageService';
import OakDialog from '../../../oakui/OakDialog';
import OakModal from '../../../oakui/OakModal';
import OakSelect from '../../../oakui/OakSelect';
import OakCheckbox from '../../../oakui/OakCheckbox';

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
    lower: '',
    upper: '',
    array: false,
  });

  useEffect(() => {
    setState({ ...state, ...props.data });
  }, [props.data]);

  const handleChange = event => {
    console.log(event.currentTarget.checked);
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
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
    <OakModal visible={props.visible} toggleVisibility={props.toggleVisibility}>
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
          elements={['char', 'word', 'sentence', 'object']}
        />
        <OakText
          data={state}
          id="lower"
          handleChange={handleChange}
          label="Lower bound"
        />
        <OakText
          data={state}
          id="upper"
          handleChange={handleChange}
          label="Upper bound"
        />
        <OakCheckbox
          id="array"
          data={state}
          handleChange={handleCheckboxChange}
          theme="primary"
          variant="circle"
          label="Array type"
        />
      </OakForm>
      <OakFooter>
        <OakButton theme="primary" variant="appear" action={save}>
          Update
        </OakButton>
      </OakFooter>
    </OakModal>
  );
};

export default EditAttribute;
