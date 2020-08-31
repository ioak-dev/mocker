import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';
import ProjectLink from './ProjectLink';

interface Props {
  space: string;
  history: any;
}

const ListProject = (props: Props) => {
  const projects = useSelector(state => state.project.projects);
  const gotoCreatePage = () =>
    props.history.push(`/${props.space}/project/create`);
  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Project list"
          subtitle="Ipsum omnis unde ratione iure molestias perspiciatis omnis accusamus"
          links={[
            {
              label: 'New project',
              icon: 'playlist_add',
              action: gotoCreatePage,
            },
          ]}
          linkSize="large"
        />
        <div className="list-project">
          {projects?.map(item => (
            <ProjectLink
              key={item._id}
              space={props.space}
              history={props.history}
              project={item}
            />
          ))}
        </div>

        <OakSubheading
          title="Sub section title"
          subtitle="Minima minima omnis impedit voluptatem beatae iusto tenetur
          inventore provident ratione reiciendis blanditiis maxime quidem modi.
          Maxime pariatur quasi laboriosam assumenda a quo dolor sint delectus
          recusandae quo modi nam dolor dolorum corporis. Est dolorum in ea"
        />
        <div className="list-template">
          Minima minima omnis impedit voluptatem beatae iusto tenetur inventore
          provident ratione reiciendis blanditiis maxime quidem modi. Maxime
          pariatur quasi laboriosam assumenda a quo dolor sint delectus
          recusandae quo modi nam dolor dolorum corporis. Est dolorum in ea
          natus atque impedit rerum ipsam tenetur officiis explicabo labore
          accusantium dicta optio optio inventore Nulla aliquam eos veniam
          accusantium hic eius harum quasi ipsam libero. Adipisci dolores
          distinctio aliquam consectetur tempora est ad omnis magnam
          exercitationem in. Consequatur sit autem incidunt saepe nostrum ullam
          id rerum dignissimos repellendus asperiores. Nemo hic quibusdam
          occaecati soluta sint porro molestiae ullam ab aliquid perferendis
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ListProject;
