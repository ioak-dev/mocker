import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import {
  newId,
  receiveMessage,
  sendMessage,
} from '../../../events/MessageService';

import './ApiSpecificationLink.scss';

interface Props {
  type: string;
  baseUrl: string;
  extendedUrl?: string;
  pathKey: string;
  endpoint: any;
  handleRemoveAlias?: any;
}

const ApiSpecificationLink = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const [identifier, setIdentifier] = useState(newId());

  useEffect(() => {
    receiveMessage().subscribe((message) => {
      if (message.name === 'clipboard-updated' && message.data !== identifier) {
        setCopied(false);
      }
    });
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(props.baseUrl + (props.extendedUrl || ''));
    setCopied(true);
    sendMessage('clipboard-updated', true, identifier);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="api-specification-link">
      <div className="api-specification-link--left">
        <div className={`api-specification-link--left--type ${props.type}`}>
          {props.type}
        </div>
        <div>{props.baseUrl + (props.extendedUrl || '')}</div>
      </div>
      <div className="api-specification-link--right">
        <div
          className={`api-specification-link--right--copied typography-3 ${
            copied ? 'copied-indicator-on' : ''
          }`}
        >
          Copied to clipboard
        </div>
        {props.handleRemoveAlias && (
          <div>
            <i
              className="material-icons"
              onClick={() => props.handleRemoveAlias(props.extendedUrl)}
            >
              delete
            </i>
          </div>
        )}
        <OakClickArea handleClick={copy}>
          <div className="api-specification-link--right__copy">
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </OakClickArea>
      </div>
    </div>
  );
};

export default ApiSpecificationLink;
