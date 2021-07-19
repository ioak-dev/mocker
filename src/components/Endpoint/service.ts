import { httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
import { sendMessage } from '../../events/MessageService';

export const saveDomainEndpoint = async (
  space: string,
  authorization: any,
  payload: any
) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT_DOMAIN}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};

export const saveCustomEndpoint = async (
  space: string,
  authorization: any,
  payload: any
) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT_CUSTOM}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};

export const saveEndpoint = async (
  space: string,
  authorization: any,
  payload: any
) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};
