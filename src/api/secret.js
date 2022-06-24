import { get, post } from ".";

export function secrets(params) {
    return get("/secrets", params)
}

export function secretAdd(params) {
    return post("/secrets", params)
}
