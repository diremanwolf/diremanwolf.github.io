const button = document.getElementById('request-device');
const device = [{ serialNumber: '1420I002904' }]

button.addEventListener('click', async () => {
    let selectedDevice;

    try {
        selectedDevice = await navigator.usb.requestDevice({ filters: device })
        console.info(selectedDevice);

        await selectedDevice.open();
        console.info(selectedDevice);
    } catch(error) {
        console.error(error);
    }
});