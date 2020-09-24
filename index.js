const button = document.getElementById('request-device');

button.addEventListener('click', () => {
    navigator.usb.getDevices().then(devices => {
        devices.map(device => {
          console.log(device.productName);      // "Arduino Micro"
          console.log(device.manufacturerName); // "Arduino LLC"
        });
    })
});