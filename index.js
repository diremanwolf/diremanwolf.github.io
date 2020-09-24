const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [] })
        console.info(device);

        await device.open();
        console.info(device);
    } catch(error) {
        console.error(error);
    }
});