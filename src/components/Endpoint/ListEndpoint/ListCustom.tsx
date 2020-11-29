import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ListDomain.scss';
import OakSubheading from '../../../oakui/OakSubheading';
import OakButton from '../../../oakui/OakButton';
import OakFooter from '../../../oakui/OakFooter';
import EndpointLink from './EndpointLink';

interface Props {
  space: string;
  projectId: string;
  history: any;
}

const ListCustom = (props: Props) => {
  const customEndpoints = useSelector(state =>
    state.customEndpoint.customEndpoints.filter(
      item => item.projectId === props.projectId
    )
  );

  useEffect(() => {
    console.log(customEndpoints);
  }, [customEndpoints]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/endpoint/custom/create?projectId=${props.projectId}`
    );

  return (
    <>
      {props.projectId && (
        <>
          <OakFooter>
            <OakButton action={gotoCreatePage} theme="primary" variant="appear">
              Create new custom endpoint
            </OakButton>
          </OakFooter>
          <div className="list-custom">
            {customEndpoints?.map(item => (
              <EndpointLink
                key={item._id}
                space={props.space}
                endpoint={item}
                history={props.history}
                type="custom"
              />
            ))}
            {!customEndpoints ||
              (customEndpoints.length === 0 && (
                <div className="typography-4">No endpoints yet</div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ListCustom;
