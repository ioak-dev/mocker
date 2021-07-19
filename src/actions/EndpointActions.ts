/* eslint-disable import/prefer-default-export */
import { RELOAD_ENDPOINTS } from './types';
import { httpGet } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';

const domain = 'endpoint';

export const fetchAllEndpoints = (space: string, authorization: any) => (
  dispatch: any
) => {
  httpGet(`${constants.API_URL_ENDPOINT}/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  }).then((response) => {
    console.log(response.data.data);
    dispatch({
      type: RELOAD_ENDPOINTS,
      payload: { endpoints: response.data.data },
    });
  });
};
