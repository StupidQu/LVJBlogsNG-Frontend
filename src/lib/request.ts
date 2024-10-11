import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';

const alovaInst = createAlova({
  requestAdapter: adapterFetch(),
  beforeRequest(method) {
    method.config.headers = {
      ...method.config.headers,
      'X-Session-Id': window.localStorage.getItem('sessionId') || '',
    };
  },
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://api.xiaoququ.asia/',
  cacheFor: {
    GET: 0,
  },
  responded: {
    onSuccess: (res) => res.json(),
  },
  statesHook: reactHook,
});

const request = alovaInst;

export default request;
