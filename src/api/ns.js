import { get } from ".";


export function namespaces(params) {
    return get("/ns", params)
}
