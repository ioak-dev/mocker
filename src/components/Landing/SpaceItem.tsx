import React from 'react';
import OakClickArea from '../../oakui/wc/OakClickArea';
import './SpaceItem.scss';

interface Props {
  space: any;
  history: any;
}

const SpaceItem = (props: Props) => {
  const goToSpacePage = () => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${props.space.realm}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
  };
  return (
    <div className="space-item">
      <OakClickArea handleClick={goToSpacePage}>
        <div className="space-item__left">
          <div className="space-item__left__name">{props.space.name}</div>
          <div className="space-item__left__description">
            {props.space.description}
          </div>
        </div>
      </OakClickArea>
      {/* <div className="space-item__right">a</div> */}
    </div>
  );
};

export default SpaceItem;
