import { get, post, put } from ".";

export function deployments(params) {
    return get("/deployments", params)
}

export function deploymentAdd(params) {
    return post("/deployments", params)
}

export function deploymentRestart(params) {
    return put("/deployments/restart", params)
}