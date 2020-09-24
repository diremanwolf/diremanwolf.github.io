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
        })
        console.info('opening', selectedDevice);

        await selectedDevice.open();
        console.info('opened', selectedDevice);

        await selectedDevice.selectConfiguration(1);
        
        await selectedDevice.claimInterface(1);
        console.info('interface', selectedDevice)

        await selectedDevice.controlTransferOut({
            requestType: 'standard',
            recipient: 'device',
            request: 0x01,
            value: 0x03,
            index: 0x00
        });
        console.info('trasnferring', selectedDevice)
    
        const timeoutID = window.setTimeout(async() => {
            console.warn('Device not connected')
            await close()
        }, 5000);

        let incoming = await selectedDevice.transferIn(1, 1024)
        if (incoming.data.byteLength > 0) {
            clearTimeout(timeoutID)
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