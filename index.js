const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x04E8 }] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});