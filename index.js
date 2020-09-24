const button = document.getElementById('request-device');
const device = [{
    vendorId: 0x079B,
    productId: 0x0047
}];
const config = new Uint8Array(10);

button.addEventListener('click', async () => {
    let selectedDevice;

    try {
        selectedDevice = await navigator.usb.requestDevice({
            filters: device
        })
        console.info('opening', selectedDevice);

        await selectedDevice.open();
        console.info('opened', selectedDevice);

        if (selectedDevice.configuration === null) {
            await selectedDevice.selectConfiguration(1);
        }
        
        await selectedDevice.claimInterface(2);
        console.info('interface', selectedDevice)

        await selectedDevice.controlTransferOut({
            requestType: 'vendor',
            recipient: 'interface',
            request: 0x01,  // vendor-specific request: enable channels
            value: 0x0013,  // 0b00010011 (channels 1, 2 and 5)
            index: 0x0001   // Interface 1 is the recipient
        });
        console.info('trasnferring', selectedDevice)

        let result = await data.transferIn(0, 6);
        console.info(result);

        if (result.data && result.data.byteLength === 6) {
            console.log('Channel 1: ' + result.data.getUint16(0));
            console.log('Channel 2: ' + result.data.getUint16(2));
            console.log('Channel 5: ' + result.data.getUint16(4));
        }
        
        if (result.status === 'stall') {
            console.warn('Endpoint stalled. Clearing.');
            await selectedDevice.clearHalt(1);
        }
    } catch (error) {
        console.error(error);
    }
});