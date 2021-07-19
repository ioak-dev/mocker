/* eslint-disable import/prefer-default-export */
import { RELOAD_PROJECTS } from './types';
import { httpGet, httpPut } from '../components/Lib/RestTemplate';
import { sendMessage } from '../events/MessageService';
import constants from '../components/Constants';

const domain = 'project';

export const fetchAllProjects = (space: string, authorization: any) => (
  dispatch: any
) => {
  httpGet(`${constants.API_URL_PROJECT}/${space}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  }).then((response) => {
    dispatch({
      type: RELOAD_PROJECTS,
      payload: { projects: response.data.data },
    });
  });
};
