const button = document.getElementById('request-device');
const device = [{ serialNumber: '1420I002904' }]

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: device })
        console.info(device);

        await device.open();
        console.info(device);
    } catch(error) {
        console.error(error);
    }
});