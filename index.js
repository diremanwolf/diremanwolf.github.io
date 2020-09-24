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

        console.info('configurations:', selectedDevice.configurations)
        if (selectedDevice.configuration === null) {
            console.info('selectConfiguration')
            await selectedDevice.selectConfiguration(2)
        }

        console.log('interfaces:', selectedDevice.configuration.interfaces)
        console.log('claimInterface')
        await selectedDevice.claimInterface(0)

        console.log('set up port')

        let result = await selectedDevice.controlTransferOut(openPort)
        console.log('open port:', result)

        result = await selectedDevice.controlTransferOut(startPort)
        console.log('start port:', result)

        config.set([
            0x00, 0x30, // baud rate (19200 : 0x0030)
            0x60, 0x00, // flags ¯\_(ツ)_/¯
            0x03, // data bits (8 : 0x03)
            0x00, // parity (none : 0)
            0x00, // stop bits (none : 0)
            0x11, // xon (false : 0)
            0x13, // xoff (false : 0)
            0x00 // UART mode (RS-232 : 0)
        ])
        result = await selectedDevice.controlTransferOut(setPortConfig, config)
        console.log('set port config:', result)

        const data = new Uint8Array(3)
        data.set([0x6d, 0x65, 0x6d])
        result = await selectedDevice.transferOut(0x01, data.buffer)
        console.log('mem:', result)

        const timeoutID = window.setTimeout(async () => {
            console.warn('Device not connected')
            await close()
        }, 5000)

        console.log('Receiving...')
        while (true) {
            let incoming = await device.transferIn(0x01, 1024)

            if (incoming.data.byteLength > 0) {
                clearTimeout(timeoutID)
                let decoder = new TextDecoder() // eslint-disable-line no-undef
                const data = decoder.decode(incoming.data)
                console.log(data)
                if (data.includes('END')) {
                    break
                }
            }
        }
        await close()
    } catch (error) {
        console.error(error);
    }
});