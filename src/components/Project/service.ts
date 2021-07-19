import { httpDelete, httpGet, httpPost, httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
import { sendMessage } from '../../events/MessageService';

export const saveProject = async (
  space: string,
  authorization: any,
  payload: any
) => {
  const response = await httpPut(
    `${constants.API_URL_PROJECT}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};

export const addRole = async (
  space: string,
  authorization: any,
  payload: any
) => {
  const response = await httpPut(
    `${constants.API_URL_ROLE}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};

export const removeRole = async (
  space: string,
  authorization: any,
  id: string
) => {
  const response = await httpDelete(
    `${constants.API_URL_ROLE}/${space}/${id}`,
    {
      headers: {
        Authorization: authorization.access_token,
      },
    }
  );
  return response;
};
