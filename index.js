const button = document.getElementById('request-device');

const devices = [
    { name: 'MORPHO', vendorId: 0, productId: 0, serialNumber: '1420I002904', classCode: 255, subclassCode: 255, protocolCode: 255 }
]

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: devices })
        console.info(device);
    } catch(error) {
        console.error(error);
    }
});