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

    try {
        selectedDevice = await navigator.usb.requestDevice({
            filters: device
        });

        await selectedDevice.open();

        await selectedDevice.selectConfiguration(1);
        
        await selectedDevice.claimInterface(1);

        await selectedDevice.controlTransferOut({
            requestType: 'vendor',
            recipient: 'interface',
            request: 1,
            value: 3,
            index: 1
        });

        console.info('AFK: ', selectedDevice)
    
        let incoming = await selectedDevice.transferIn(3, 64)
        if (incoming.data.byteLength > 0) {
            let decoder = new TextDecoder() // eslint-disable-line no-undef
            const data = decoder.decode(incoming.data)
            console.log(data)
            if (data.includes('END')) {
                console.info('stops');
                return false;
            }
        }
    } catch (error) {
        console.error(error);
    }
});