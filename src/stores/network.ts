import { readable } from 'svelte/store';

export const Ipv4 = readable('127.0.0.1', function start(set) {
    if ( typeof window.RTCPeerConnection == 'undefined' )
        return set('WebRTC not supported by browser');

    const pc = new RTCPeerConnection();
    const ips:string[] = [];

    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch();
    pc.onicecandidate = event => {
        if ( !event || !event.candidate ) {
            if ( ips.length == 0 ) return;
            set(ips[0])
            return;
        }

        const ip = event.candidate.candidate.split(' ')[4];

        if (!ips.some(e => e == ip)) ips.push(ip);
    };
});
