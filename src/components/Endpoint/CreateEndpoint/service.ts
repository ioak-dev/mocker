import { httpPut } from '../../Lib/RestTemplate';
import constants from '../../Constants';
import { sendMessage } from '../../../events/MessageService';

/* eslint-disable import/prefer-default-export */
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
