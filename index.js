const button = document.getElementById('request-device');

button.addEventListener('click', async () => {
    let device;

    try {
        device = await navigator.usb.requestDevice({ filters: [{ serialNumber: '1420I002904' }] })
        
        await device.open();
        await device.selectConfiguration(1);
        await device.controlTransferOut({ requestType: 'class', recipient: 'interface', request: 0x22, value: 0x01, index: 0x02 });
    
        let result = device.transferIn(5, 64);
        let decoder = new TextDecoder();
        document.getElementById('information-device').innerHTML = 'Received: ' + decoder.decode(result.data);
    
    } catch(error) {
        console.error(error);
    }
});