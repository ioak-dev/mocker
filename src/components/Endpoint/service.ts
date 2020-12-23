import { httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
import { sendMessage } from '../../events/MessageService';

export const saveDomainEndpoint = async (space, authorization, payload) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT_DOMAIN}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};

export const saveCustomEndpoint = async (space, authorization, payload) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT_CUSTOM}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};

export const saveEndpoint = async (space, authorization, payload) => {
  const response = await httpPut(
    `${constants.API_URL_ENDPOINT}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};
