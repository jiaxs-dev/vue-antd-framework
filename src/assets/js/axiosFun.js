/**
 * @Author: jiaxiansun
 * @Date: 2020/5/15
 * @Time: 14:15
 * @Description: axios方法封装
 * @Copyright: jiaxiansun
 */

import axios from "axios"
import qs from 'qs'

/**
 * axios get请求
 * @param url 请求url
 * @param params 请求参数
 * @returns {Promise<T>} url返回
 */
let reqget = (url, params) => {
    return axios({
        method: "get",
        url: url,
        traditional: true,
        timeout: 5000,
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false, skipNulls: false})
        }
    }).then(res => res.data).catch(err => {
        return err;
    });
}

/**
 * axios post请求
 * @param url 请求url
 * @param params 请求参数
 * @returns {Promise<T>} url返回
 */
let reqpost = (url, params) => {
    return axios({
        method: "post",
        url: url,
        timeout: 5000,
        traditional: true,
        data: params
    }).then(res => res.data).catch(err => {
        return err;
    });
}


export {
    reqget,
    reqpost
}
