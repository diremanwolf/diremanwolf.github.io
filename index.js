const button = document.getElementById('request-device');
const device = [{
    vendorId: 0x079B,
    productId: 0x0047
}];
const config = new Uint8Array(10);

button.addEventListener('click', async () => {
    let selectedDevice;

    const setPortConfig = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x05,
        value: 0x00,
        index: 0x03
    }

    const openPort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x06,
        value: 0x89,
        index: 0x03
    }

    const startPort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x08,
        value: 0x00,
        index: 0x03
    }

    const closePort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x07,
        value: 0x00,
        index: 0x03
    }

    async function close() {
        let result = await selectedDevice.controlTransferOut(closePort)

        console.info(result)

        await selectedDevice.releaseInterface(0)
        await selectedDevice.close()
    }

    try {
        selectedDevice = await navigator.usb.requestDevice({
            filters: device
        })
        console.info('opening', selectedDevice);

        await selectedDevice.open();
        console.info('opened', selectedDevice);

        await selectedDevice.selectConfiguration(1)
        console.info('configurations:', selectedDevice)

        await selectedDevice.claimInterface(0);
        console.info('interface', selectedDevice)

        const data = new Uint8Array(3)
        data.set([0x6d, 0x65, 0x6d])
        result = await selectedDevice.transferOut(1, data.buffer)
        console.log('mem:', result)
    } catch (error) {
        console.error(error);
    }
});