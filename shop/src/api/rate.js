import request from "@/utils/request.js"
export const addRateApi = (params) => {
    return request.post("/rate/add", params)
}