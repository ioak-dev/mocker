import React from 'react';

import './style.scss';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakHeading from '../../../oakui/OakHeading';
import OakSubheading from '../../../oakui/OakSubheading';

interface Props {
  space: string;
}

const ListTemplate = (props: Props) => {
  return (
    <OakPage>
      <OakSection>
        <OakHeading
          title="Manage templates"
          subtitle="Ipsum omnis unde ratione iure molestias perspiciatis omnis accusamus"
        />
        <div className="list-template">
          Ipsum omnis unde ratione iure molestias perspiciatis omnis accusamus
          itaque sequi consectetur commodi tempora qui aut. Minima minima omnis
          impedit voluptatem beatae iusto tenetur inventore provident ratione
          reiciendis blanditiis maxime quidem modi. Maxime pariatur quasi
          laboriosam assumenda a quo dolor sint delectus recusandae quo modi nam
          dolor dolorum corporis. Est dolorum in ea natus atque impedit rerum
          ipsam tenetur officiis explicabo labore accusantium dicta optio optio
          inventore Nulla aliquam eos veniam accusantium hic eius harum quasi
          ipsam libero. Adipisci dolores distinctio aliquam consectetur tempora
          est ad omnis magnam exercitationem in. Consequatur sit autem incidunt
          saepe nostrum ullam id rerum dignissimos repellendus asperiores. Nemo
          hic quibusdam occaecati soluta sint porro molestiae ullam ab aliquid
          perferendis dignissimos ipsam. Necessitatibus fuga vel aliquam totam
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

export default ListTemplate;
