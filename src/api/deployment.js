import { get, post } from ".";

export function deployments(params) {
    return get("/deployments", params)
}

export function deploymentAdd(params) {
    return post("/deployments", params)
}