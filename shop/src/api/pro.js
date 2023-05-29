import request from "@/utils/request.js"
export const proListApi = (params) => {
    return request.get("/pro/list",{params})
}
export const proDetailApi = (params) => {
    return request.get("pro/detail/" + params.proid)
}
