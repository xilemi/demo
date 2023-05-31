import request from "@/utils/request.js"

export  const confirmOrderApi= (params) => {
    return request.get("order/confirmOrder",{params})
}
export  const addOrderApi= (params) => {
    return request.post("/order/addOrder",params)
}
export  const updateOrderAddressApi= (params) => {
    return request.post("/order/updateOrderAddress",params)
}
