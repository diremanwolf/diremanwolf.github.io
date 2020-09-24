const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x0BDA, productId: 0x565A }] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});