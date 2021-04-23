import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  newId,
  newMessageId,
  receiveMessage,
  sendMessage,
} from '../../../events/MessageService';
import ApiSpecificationLink from './ApiSpecificationLink';

import './style.scss';
import { saveEndpoint } from '../service';

interface Props {
  type: string;
  baseUrl: string;
  extendedUrl?: string;
  pathKey: string;
  endpoint: any;
  space: string;
  history: any;
  noAlias?: boolean;
  minAliasLength?: number;
}

const ApiSpecification = (props: Props) => {
  const authorization = useSelector((state) => state.authorization);
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState({
    alias: '',
    addNewAlias: false,
  });
  const [identifier, setIdentifier] = useState(newId());

  useEffect(() => {
    receiveMessage().subscribe((message) => {
      if (message.name === 'clipboard-updated' && message.data !== identifier) {
        setCopied(false);
      }
    });
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const addAlias = async () => {
    if (
      props.minAliasLength &&
      state.alias.split('/').length < props.minAliasLength
    ) {
      sendMessage('notification', true, {
        type: 'failure',
        message: `URL has collision with other endpoints. Make the URL unique`,
      });
      return;
    }
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving domain endpoint [${props.endpoint.name}]`,
    });
    const response = await saveEndpoint(props.space, authorization, {
      ...props.endpoint,
      alias: [
        ...props.endpoint.alias,
        { pathKey: props.pathKey, path: `/${state.alias}` },
      ],
    });
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Endpoint [${props.endpoint.name}] saved successfully`,
        duration: 3000,
      });
    }
    reset();
  };

  const removeAlias = async (alias) => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Saving endpoint [${props.endpoint.name}]`,
    });
    const response = await saveEndpoint(props.space, authorization, {
      ...props.endpoint,
      alias: props.endpoint.alias.filter(
        (item) => item.pathKey !== props.pathKey || item.path !== alias
      ),
    });
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Endpoint [${props.endpoint.name}] saved successfully`,
        duration: 3000,
      });
    }
    reset();
  };

  const reset = () => {
    setState({ ...state, alias: '', addNewAlias: false });
  };

  return (
    <div className="api-specification">
      <ApiSpecificationLink
        baseUrl={props.baseUrl}
        extendedUrl={props.extendedUrl}
        endpoint={props.endpoint}
        pathKey={props.pathKey}
        type={props.type}
      />
      {!props.noAlias && (
        <>
          {props.endpoint.alias &&
            props.endpoint.alias
              .filter((alias) => alias.pathKey === props.pathKey)
              .map((alias) => (
                <ApiSpecificationLink
                  baseUrl={props.baseUrl + (props.extendedUrl || '')}
                  extendedUrl={`${alias.path}`}
                  endpoint={props.endpoint}
                  pathKey={props.pathKey}
                  type="ALIAS"
                  handleRemoveAlias={removeAlias}
                  key={`${props.pathKey}-${alias.path}`}
                />
              ))}
          {/* {state.addNewAlias && (
            <OakText
              data={state}
              id="alias"
              handleChange={handleChange}
              label="URL alias"
              subtitle={`${props.baseUrl}${props.extendedUrl || ''}/${
                state.alias
              }`}
            />
          )}
          <OakFooter>
            {!state.addNewAlias && (
              <OakButton
                action={() => setState({ ...state, addNewAlias: true })}
                theme="default"
                variant="appear"
              >
                Add alias
              </OakButton>
            )}
            {state.addNewAlias && (
              <OakButton
                action={addAlias}
                theme="primary"
                variant={state.alias ? 'regular' : 'disabled'}
              >
                Save
              </OakButton>
            )}
            {state.addNewAlias && (
              <OakButton action={reset} theme="default" variant="appear">
                Close
              </OakButton>
            )}
          </OakFooter> */}
        </>
      )}
    </div>
  );
};

export default ApiSpecification;
