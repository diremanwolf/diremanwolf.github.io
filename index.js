const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x8087, productId: 0x0AAA, classCode: 0x224 }] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});