const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ serialNumber: '1420I002904' }] })
        console.info(device);

        await device.open();
        console.info(device);
    } catch(error) {
        console.error(error);
    }
});