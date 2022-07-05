import { get } from ".";


export function services(params) {
    return get("/services", params)
}
