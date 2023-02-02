// TypeScript 4.5 的特性，引用ts类型语句需要使用 type 修饰词。
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from "axios"

class Http {
    instance: AxiosInstance
    config: AxiosRequestConfig
    constructor(option: AxiosRequestConfig) {
        this.config = option
        this.instance = axios.create(this.config)
        this.interceptors()
    }

    interceptors() {
        // 添加请求拦截器
        this.instance.interceptors.request.use(function (config) {
            // 清除重复的网络请求,重新发送本次请求
            removePending(config)
            // 开始新的请求
            addPending(config)
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        this.instance.interceptors.response.use(function (response) {
            // 请求成功清除本次网络请求
            removePending(response.config)
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            error.config && removePending(error.config)

            httpErrorStatusHandle(error)
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 泛型 T 表示本次 axios 请求过来数据data里的结构
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T, any>> {
        return this.instance.request(config)
    }
}

const http = new Http({
    baseURL: `/api`,
    timeout: 120 * 1000
})

export default http


/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
    // 处理被取消的请求
    if (axios.isCancel(error))
        return console.error("请求的重复请求：" + error.message);
    let message = "";
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = "接口重定向了！";
                break;
            case 400:
                message = "参数不正确！";
                break;
            case 401:
                message = "您未登录，或者登录已经超时，请先登录！";
                break;
            case 403:
                message = "您没有权限操作！";
                break;
            case 404:
                message = `请求地址出错: ${error.response.config.url}`;
                break; // 在正确域名下
            case 408:
                message = "请求超时！";
                break;
            case 409:
                message = "系统已存在相同数据！";
                break;
            case 500:
                message = "服务器内部错误！";
                break;
            case 501:
                message = "服务未实现！";
                break;
            case 502:
                message = "网关错误！";
                break;
            case 503:
                message = "服务不可用！";
                break;
            case 504:
                message = "服务暂时无法访问，请稍后再试！";
                break;
            case 505:
                message = "HTTP版本不受支持！";
                break;
            default:
                message = "异常问题，请联系管理员！";
                break;
        }
    }
    if (error.message.includes("timeout")) message = "网络请求超时！";
    if (error.message.includes("Network"))
        message = window.navigator.onLine ? "服务端异常！" : "您断网了！";
    // 控制台展示错误信息，此处也可以用ui库实现效果 
    console.error({
        type: "error",
        message,
    });
}

const pendingMap = new Map();
/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
*/

function addPending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config);

    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            // ancelToken 的构造函数，实例化成功后将回调内传递创建好的cancel方法
            if (!pendingMap.has(pendingKey)) {
                pendingMap.set(pendingKey, cancel);
            }
        });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        // 取消请求
        cancelToken(pendingKey);
        // 删除对应的cancel回调
        pendingMap.delete(pendingKey);
    }
}


/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config: AxiosRequestConfig) {
    let { url, method, params, data } = config;
    if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}