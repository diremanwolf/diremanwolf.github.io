const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x079B, productId: 0x0047 }] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});