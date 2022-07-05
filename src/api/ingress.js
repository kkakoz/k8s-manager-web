import { get } from ".";


export function ingresses(params) {
    return get("/ingresses", params)
}
