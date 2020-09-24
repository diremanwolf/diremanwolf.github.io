const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [] })
        console.info(connectedDevice);
    } catch(error) {
        console.error(error);
    }
});