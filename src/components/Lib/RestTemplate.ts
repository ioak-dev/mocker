import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export function httpGet(endpoint: string, headers: any, url?: string) {
  return axios.get(getTargetUrl(endpoint, url), headers);
  // .then(function(response) {
  //     return Promise.resolve(response);
  // }
  // )
}

export function httpPost(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {

  return axios.post(getTargetUrl(endpoint, url), payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpPut(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axios.put(getTargetUrl(endpoint, url), payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpDelete(endpoint: string, headers: any, url?: string) {
  return axios.delete(getTargetUrl(endpoint, url), headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

function getTargetUrl(endpoint, url) {
  let targetUrl = (url || baseUrl) + endpoint;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    targetUrl = endpoint;
  }
  return targetUrl;
}