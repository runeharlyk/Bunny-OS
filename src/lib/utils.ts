
export const arrayBufferToBase64Img = (buffer: ArrayBuffer):string => {
    return 'data:image/png;base64, ' + arrayBufferToBase64(buffer);
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer):string => {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}