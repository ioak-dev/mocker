import React from 'react';
import './style.scss';
import OakText from '../../../oakui/OakText';
import OakButton from '../../../oakui/OakButton';
import OakHeading from '../../../oakui/OakHeading';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import OakSubheading from '../../../oakui/OakSubheading';

const ListTemplate = () => {
  return (
    <OakPage>
      <OakSection>
        <div className="list-template">
          <OakHeading title="Vel soluta consequuntur" />
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
      <OakSection>
        <div className="list-template">
          <OakSubheading title="Eum architecto dolor temporibus" />
          <div>
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakText
              data={{ i: 90 }}
              id="i"
              handleChange={() => console.log(1)}
            />
            <OakButton theme="primary" variant="appear">
              Submit
            </OakButton>
          </div>
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ListTemplate;
