const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x079b }] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});