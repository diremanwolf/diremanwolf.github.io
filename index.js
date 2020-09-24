'use strict';

const button = document.getElementById('request-device');

const devices = [
    { vendorId: 0x079B, productId: 0x0047 }
]

const connect = () => {
    let connectedDevice;

    navigator.usb.requestDevice({
        filters: devices
    })
    .then(selectedDevice => {
        connectedDevice = selectedDevice;
        console.info(connectedDevice);
    })
    .catch(error => {
        console.error(error);
    });
}