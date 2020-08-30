/* eslint-disable import/prefer-default-export */
import { GET_USER, ADD_USER, FETCH_ALL_USERS } from './types';
import { httpGet, httpPut } from '../components/Lib/RestTemplate';
import { sendMessage } from '../events/MessageService';
import constants from '../components/Constants';

const domain = 'project';

export const getUser = () => dispatch => {
  dispatch({
    type: GET_USER,
  });
};
