import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './DomainEndpoint.scss';
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
import DataStructureBuilder from './DataStructureBuilder';

interface Props {
  space: string;
  history: any;
  projectId: string;
}

const DomainEndpoint = (props: Props) => {
  const goBack = () => props.history.goBack();
  const [state, setState] = useState({
    projectId: props.projectId,
    name: '',
    description: '',
    structure: '',
  });
  const [testData, setTestData] = useState([
    {
      reference: '1',
      parentReference: undefined,
      datatype: 'object',
      array: false,
      name: 'fieldOne',
    },
    {
      reference: '2',
      parentReference: '1',
      datatype: 'object',
      array: true,
      name: 'fieldTwo',
    },
    {
      reference: '3',
      parentReference: undefined,
      datatype: 'word',
      array: false,
      name: 'fieldThree',
    },
    {
      reference: '4',
      parentReference: undefined,
      datatype: 'word',
      array: true,
      name: 'fieldFour',
    },
    {
      reference: '5',
      parentReference: '1',
      datatype: 'word',
      array: false,
      name: 'fieldFive',
    },
    {
      reference: '6',
      parentReference: '2',
      datatype: 'word',
      array: false,
      name: 'fieldSix',
    },
    {
      reference: '7',
      parentReference: '2',
      datatype: 'sentence',
      array: true,
      name: 'fieldSeven',
    },
  ]);
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);

  const handleChange = event => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    console.log(testData);
  }, [testData]);

  const handleNameChange = event => {
    setState({
      ...state,
      name: event.currentTarget.value
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/\W/g, ''),
    });
  };

  const handleDataStructureChange = (actionType, changeData) => {
    console.log(actionType, changeData);
    let newData: any[] = [];
    switch (actionType) {
      case 'remove':
        newData = testData.filter(
          item =>
            item.parentReference !== changeData && item.reference !== changeData
        );
        break;

      case 'edit':
        newData = testData.filter(
          item => item.reference !== changeData.reference
        );
        newData.push(changeData);
        break;
      default:
        break;
    }
    setTestData(newData);
  };

  const save = async () => {
    console.log(props);
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${state.name}]`,
    });
    const response = await saveDomainEndpoint(
      props.space,
      authorization,
      state
    );
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Domain endpoint [${state.name}] saved successfully`,
        duration: 3000,
      });
      props.history.push(`/${props.space}/endpoint`);
    }
  };

  return (
    <div className="domain-endpoint">
      <OakForm>
        <OakText
          data={state}
          id="name"
          handleChange={handleNameChange}
          label="Name of the domain"
        />
      </OakForm>
      <DataStructureBuilder
        data={testData}
        handleChange={handleDataStructureChange}
      />
      <OakFooter>
        <OakButton theme="primary" variant="appear" action={save}>
          Save
        </OakButton>
        <OakButton theme="default" variant="appear">
          Cancel
        </OakButton>
      </OakFooter>
    </div>
  );
};

export default DomainEndpoint;
