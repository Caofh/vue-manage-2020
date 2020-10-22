

import gateWay from '@/config/gateway.config';
import { callApi } from '@/api/callApi';

const baseApi = gateWay.baseApi

const axios = callApi(baseApi);

export function getStatistic (data) {
  return axios({
    url: `/admin/community/getStatistic`,
    method: 'get',
    data: data
  })
}
