import { get } from ".";

export function deployments(params) {
    return get("/deployments", params)
}