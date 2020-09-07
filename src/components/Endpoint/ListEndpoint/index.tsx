import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import OakForm from '../../../oakui/OakForm';
import OakSelect from '../../../oakui/OakSelect';
import ListDomain from './ListDomain';

interface Props {
  space: string;
  history: any;
}

const ListEndpoint = (props: Props) => {
  const projects = useSelector(state => state.project.projects);
  const [state, setState] = useState({
    projectId: '',
  });
  const [projectElements, setProjectElements] = useState<any>([]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map(item => {
      localState.push({ key: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const gotoCreatePage = () =>
    props.history.push(`/${props.space}/endpoint/create`);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Manage templates"
          subtitle="Ipsum omnis unde ratione iure molestias perspiciatis omnis accusamus"
          links={[
            {
              label: 'New endpoint',
              icon: 'playlist_add',
              action: gotoCreatePage,
            },
          ]}
          linkSize="large"
        />
        <OakForm>
          <OakSelect
            id="projectId"
            data={state}
            handleChange={handleChange}
            label="Choose project"
            objects={projectElements}
          />
        </OakForm>
        <ListDomain
          space={props.space}
          projectId={state.projectId}
          history={props.history}
        />
      </OakSection>
    </OakPage>
  );
};

export default ListEndpoint;
