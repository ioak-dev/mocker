import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.scss';
import OakSelect from '../../../oakui/wc/OakSelect';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakSpacing from '../../../oakui/wc/OakSpacing';
import OakDivider from '../../../oakui/wc/OakDivider';
import OakFormActionsContainer from '../../../oakui/wc/OakFormActionsContainer';

const queryString = require('query-string');

interface Props {
  space: string;
  history: any;
  projectId: string;
}

const ListEndpoint = (props: Props) => {
  const projects = useSelector((state) => state.project.projects);
  const [endpoints, setEndpoints] = useState<any[]>();
  const [projectElements, setProjectElements] = useState<any>([]);

  const allEndpoints = useSelector((state) => state.endpoint.endpoints);

  useEffect(() => {
    setEndpoints(
      allEndpoints.filter((item) => item.projectId === props.projectId)
    );
  }, [props.projectId, allEndpoints]);

  useEffect(() => {
    const localState: any[] = [];
    projects.map((item: any) => {
      localState.push({ id: item._id, value: item.name });
    });
    setProjectElements(localState);
  }, [projects]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${props.projectId}`
    );

  const handleProjectChange = (detail: any) => {
    props.history.push(`/${props.space}/endpoint?projectId=${detail.value}`);
  };
  const goToViewPage = (endpoint: any) => {
    props.history.push(
      `/${props.space}/endpoint/${endpoint.type}/view?id=${endpoint._id}`
    );
  };

  return (
    <>
      {props.projectId && (
        <>
          <OakFormActionsContainer align="right">
            <OakButton
              handleClick={gotoCreatePage}
              theme="primary"
              variant="appear"
            >
              New endpoint
            </OakButton>
          </OakFormActionsContainer>
          <div className="list-endpoint">
            {endpoints?.map((item) => (
              <OakClickArea handleClick={() => goToViewPage(item)}>
                <div className="list-endpoint__item">
                  <div className="list-endpoint__item__left">
                    <div className="list-endpoint__item__left__name">
                      {item.name}
                    </div>
                    <div className="list-endpoint__item__left__description">
                      {item.description}
                    </div>
                  </div>
                  <div className="list-endpoint__item__right">
                    <div className="list-endpoint__item__right__type">
                      {item.method
                        ? `${item.type} (${item.method})`
                        : item.type}
                    </div>
                  </div>
                </div>
              </OakClickArea>
            ))}
            {!endpoints ||
              (endpoints.length === 0 && (
                <div className="typography-4">No endpoints yet</div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ListEndpoint;
