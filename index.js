'use strict';

const button = document.getElementById('request-device');

const devices = [
    { vendorId: 0x079B, productId: 0x0047 }
]

button.addEventListener('click', async () => {
    let connectedDevice;

    try {
        connectedDevice = await navigator.usb.requestDevice({ filters: devices })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});