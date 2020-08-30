import { httpPut } from '../../Lib/RestTemplate';
import constants from '../../Constants';
import { sendMessage } from '../../../events/MessageService';

/* eslint-disable import/prefer-default-export */
export const saveProject = async (space, authorization, payload) => {
  const response = await httpPut(
    `${constants.API_URL_PROJECT}/${space}/`,
    payload,
    {
      headers: {
        Authorization: authorization.token,
      },
    }
  );
  return response;
};
