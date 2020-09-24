const values = new Uint8Array(3);
const config = new Uint8Array(10);
const button = document.getElementById('request-device');
const device = [{
    vendorId: 0x079B,
    productId: 0x0047
}];

button.addEventListener('click', async () => {
    let result;
    let selectedDevice;

    const startPort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x08,
        value: 0x00,
        index: 0x02
      }

    const openPort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x06,
        value: 0x89,
        index: 0x02
    }

    const setPortConfig = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x05,
        value: 0x00,
        index: 0x02
    }

    const closePort = {
        requestType: 'vendor',
        recipient: 'device',
        request: 0x07,
        value: 0x00,
        index: 0x03
    }

    try {
        selectedDevice = await navigator.usb.requestDevice({
            filters: device
        });

        await selectedDevice.open();
        console.info(selectedDevice);

        await selectedDevice.claimInterface(1)
        console.info(selectedDevice.configuration.interfaces)

        result = await selectedDevice.controlTransferOut(openPort)
        console.info(result);

        result = await selectedDevice.controlTransferOut(startPort)
        console.info(result);

        config.set([
            0x00, 0x30, // baud rate (19200 : 0x0030)
            0x60, 0x00, // flags ¯\_(ツ)_/¯
            0x03,       // data bits (8 : 0x03)
            0x00,       // parity (none : 0)
            0x00,       // stop bits (none : 0)
            0x11,       // xon (false : 0)
            0x13,       // xoff (false : 0)
            0x00        // UART mode (RS-232 : 0)
          ]);

        result = await selectedDevice.controlTransferOut(setPortConfig, config)
        console.info(result);


        values.set([0x6d, 0x65, 0x6d])
        result = await selectedDevice.transferOut(0x02, values.buffer)

        do {
            result = await selectedDevice.transferIn(0x03, 64);
                
            if (result.data.byteLength > 0) {
                const decode = new TextDecoder();
                const values = decode.decode(result.data);
                console.info(values)
                if(values.includes('END')) {
                    return false;
                }
            }
        } while(1 === 1);
    } catch (error) {
        console.error(error);
    }
});