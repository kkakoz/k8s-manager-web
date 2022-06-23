import { del, get, post } from ".";

export function pods(params) {
    return get("/pods", params)
}

export function podAdd(params) {
    return post("/pods", params)
}

export function podLog(name, params) {
    return get(`/pods/${name}/logs`, params)
}

export function podDel(name, params) {
    return del(`/pods/${name}`, params)
}

