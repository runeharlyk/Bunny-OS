import { SendSize, ReceivedSize } from "../stores";

export const registerFetchIntercept = () => {
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
        const [resource, config] = args
        const response = await originalFetch(resource, config)
        const sendSize = new Blob(["" + config?.headers?.toString() + config?.body?.toString()]).size
        const contentLength = Number(response.headers.get("content-length"))
        const responseSize = contentLength !== 0 ? contentLength : (await (response.blob())).size
        
        SendSize.update((size) => size + sendSize)
        ReceivedSize.update((size) => size + responseSize)
        return response;
    };
}