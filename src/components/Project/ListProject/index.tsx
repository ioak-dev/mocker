/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import './style.scss';
import OakText from '../../../oakui/OakText';
import OakButton from '../../../oakui/OakButton';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
// import menuBg from '../../../images/menu_bg.mp4';

interface Props {
  match: any;
  location: any;
  history: any;
  asset: string;
}

const ListProject = (props: Props) => {
  const createProject = event => {
    props.history.push(`/${props.asset}/project/create`);
  };
  return (
    <OakPage>
      <OakSection>
        <div className="list-template">
          <OakHeading
            title="Quisquam odit quis suscipit"
            subtitle="Ea at repudiandae eum natus consequatur"
            links={[
              {
                label: 'Go back',
                icon: 'reply',
                action: () => console.log(122),
              },
              {
                label: 'Edit',
                icon: 'edit',
                action: () => console.log(122),
              },
            ]}
          />
          <div className="typography-5">
            List template page. Ea at repudiandae eum natus consequatur maiores
            minima ratione assumenda eligendi. Occaecati perspiciatis culpa
            laboriosam repellendus cumque aperiam veniam doloremque magni quo
            repellat beatae libero eum quos. Quod saepe doloribus alias tempore
            ipsa perspiciatis vitae voluptas quae. Ab quam dolor aspernatur
            perspiciatis enim reiciendis maiores iusto magni consequatur impedit
            minima dolor sit. Dolorem labore corporis eius qui illum consectetur
            ipsum doloribus laboriosam quo porro quam vel praesentium. Magnam
            quia aliquid esse odio dolorem commodi sint nihil officia
            necessitatibus ab exercitationem. Excepturi sit facere in fuga rem
            odio animi hic consequatur reiciendis quod sapiente a iste dolor sit
          </div>
          <div className="typography-5">
            List template page. Ea at repudiandae eum natus consequatur maiores
            minima ratione assumenda eligendi. Occaecati perspiciatis culpa
            laboriosam repellendus cumque aperiam veniam doloremque magni quo
            repellat beatae libero eum quos. Quod saepe doloribus alias tempore
            ipsa perspiciatis vitae voluptas quae. Ab quam dolor aspernatur
            perspiciatis enim reiciendis maiores iusto magni consequatur impedit
            minima dolor sit. Dolorem labore corporis eius qui illum consectetur
            ipsum doloribus laboriosam quo porro quam vel praesentium. Magnam
            quia aliquid esse odio dolorem commodi sint nihil officia
            necessitatibus ab exercitationem. Excepturi sit facere in fuga rem
            odio animi hic consequatur reiciendis quod sapiente a iste dolor sit
          </div>
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ListProject;
