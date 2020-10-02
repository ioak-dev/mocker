import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ListDomain.scss';
import DomainLink from './DomainLink';
import OakSubheading from '../../../oakui/OakSubheading';

interface Props {
  space: string;
  projectId: string;
  history: any;
}

const ListDomain = (props: Props) => {
  const domains = useSelector(state =>
    state.domain.domains.filter(item => item.projectId === props.projectId)
  );

  useEffect(() => {
    console.log(domains);
  }, [domains]);

  const gotoCreatePage = () =>
    props.history.push(
      `/${props.space}/endpoint/create?projectId=${props.projectId}`
    );

  return (
    <>
      {props.projectId && (
        <div className="list-domain">
          <OakSubheading
            title="Domain endpoints"
            links={[
              {
                label: 'Create new',
                icon: 'playlist_add',
                action: gotoCreatePage,
              },
            ]}
            linkSize="large"
          />
          {domains?.map(item => (
            <DomainLink
              key={item._id}
              space={props.space}
              domain={item}
              history={props.history}
            />
          ))}
          {!domains ||
            (domains.length === 0 && (
              <div className="typography-4">No endpoints yet</div>
            ))}
        </div>
      )}
    </>
  );
};

export default ListDomain;
