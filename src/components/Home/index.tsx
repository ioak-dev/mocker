import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OakHeading from '../../oakui/OakHeading';
import OakSection from '../../oakui/OakSection';
import OakSubheading from '../../oakui/OakSubheading';
import './style.scss';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  history: any;
}

const Home = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  return (
    <div className="page-home">
      <OakSection>
        <OakHeading
          title="How it works"
          subtitle="Optimize development cycle by defining a working API specification, that development teams can rely on as a live and evolving reference."
        />
        <div className="page-home--steps">
          <div className="page-home--steps--container">
            <OakSubheading title="Create a project" />
            <div className="page-home--steps--container--subtitle">
              A project is a collection of API endpoint specifications. Create a
              project to logically group all your API mocks related to your
              project. You can add several endpoint definitions into a project.
            </div>
          </div>
          <div className="page-home--steps--container">
            <OakSubheading title="Define an endpoint" />
            <div className="page-home--steps--container--subtitle">
              Add an API endpoint specification by either defining it's domain
              for CRUD operations, or by defining the input and output
              attributes of a endpoint. Copy the generated URLs to call from
              your application.
            </div>
          </div>
          <div className="page-home--steps--container">
            <OakSubheading title="Plug in endpoint" />
            <div className="page-home--steps--container--subtitle">
              Call the copied URLs from your application. Everytime you call an
              API, Mockback returns a randomly generated data for its domain (or
              list of randomly generated domain data).
            </div>
          </div>
        </div>
      </OakSection>
    </div>
  );
};

export default Home;
