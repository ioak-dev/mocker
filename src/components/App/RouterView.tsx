import React from 'react';

import { Route } from 'react-router-dom';
import './RouterView.scss';
import Home from '../Home';
import OaLogin from '../Auth/OaLogin';
import Landing from '../Landing';
import OakRoute from '../Auth/OakRoute';
import Unauthorized from '../Auth/Unauthorized';
import CreateProject from '../Project/CreateProject';
import ViewProject from '../Project/ViewProject';
import ListProject from '../Project/ListProject';
import ViewEndpointCustom from '../Endpoint/ViewEndpointCustom';
import ViewEndpointDomain from '../Endpoint/ViewEndpointDomain';
import CreateEndpoint from '../Endpoint/CreateEndpoint';
import ListEndpoint from '../Endpoint/ListEndpoint';

interface Props {
  cookies: any;
}

const RouterView = (props: Props) => {
  return (
    <div className="router-view">
      <Route
        path="/login"
        render={(propsLocal) => (
          <OakRoute {...propsLocal} {...props} component={OaLogin} />
        )}
      />
      <Route
        path="/:space/unauthorized"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Unauthorized}
            middleware={['isAuthenticated']}
          />
        )}
      />
      <Route
        path="/"
        exact
        render={(propsLocal) => (
          <OakRoute {...propsLocal} {...props} component={Landing} />
        )}
      />
      <Route
        path="/home"
        exact
        render={(propsLocal) => (
          <OakRoute {...propsLocal} {...props} component={Landing} />
        )}
      />
      <Route
        path="/:space/home"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={Home}
            middleware={['readAuthentication']}
          />
        )}
      />
      <Route
        path="/:space/project"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ListProject}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/project/view"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ViewProject}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/project/create"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={CreateProject}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/endpoint"
        exact
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ListEndpoint}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/endpoint/create"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={CreateEndpoint}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/endpoint/domain/view"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ViewEndpointDomain}
            middleware={['authenticate']}
          />
        )}
      />
      <Route
        path="/:space/endpoint/custom/view"
        render={(propsLocal) => (
          <OakRoute
            {...propsLocal}
            {...props}
            component={ViewEndpointCustom}
            middleware={['authenticate']}
          />
        )}
      />
    </div>
  );
};

export default RouterView;
