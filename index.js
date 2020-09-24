const button = document.getElementById('request-device');
const device = [{
    vendorId: 0x079B,
    productId: 0x0047
}];
const values = new Uint8Array(3);
values.set([0x6d, 0x65, 0x6d]);
const config = new Uint8Array(10);

button.addEventListener('click', async () => {
    let selectedDevice;

    const openPort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x06,
        value: 0x89,
        index: 0x03
    }

    try {
        selectedDevice = await navigator.usb.requestDevice({
            filters: device
        });

        await selectedDevice.open();
        console.info(selectedDevice);

        await selectedDevice.claimInterface(0)
        console.info(selectedDevice.configuration.interfaces)

        let result = await device.controlTransferOut(openPort)
        console.info(result)
    } catch (error) {
        console.error(error);
    }
});