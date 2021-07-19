import React from 'react';
import { useSelector } from 'react-redux';
import './ListSpaces.scss';
import SpaceItem from './SpaceItem';

interface Props {
  history: any;
}

const ListSpaces = (props: Props) => {
  const spaceList = useSelector((state: any) => state.space);
  return (
    <div className="list-spaces">
      Choose a space to proceed
      <div className="list-spaces--content">
        {spaceList?.spaces?.map((space: any) => (
          <SpaceItem space={space} history={props.history} key={space.id} />
        ))}
      </div>
    </div>
  );
};

export default ListSpaces;
