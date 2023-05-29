import request from "@/utils/request.js"

export  const docheckphoneApi = (params) => {
    return request.post("/user/docheckphone",params)
}
// 发送短信
export  const dosendmsgcodeApi = (params) => {
    return request.post("/user/dosendmsgcode",params)
}
// 验证短信
export  const docheckcodeApi = (params) => {
    return request.post("/user/docheckcode",params)
}
export const dofinishregisterApi = (params) => {
    return request.post("/user/dofinishregister",params)
}
export const dofinishloginApi = (params) => {
    return request.post("/user/login",params)
}
export const dofinishuserinfoApi = (params) => {
    return request.post("/user/info",params)
}