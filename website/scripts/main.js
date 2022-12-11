window.addEventListener("load", function () {
    console.log("Welcome to the Wii U Dev Tools 🍡")
    // Create WebSocket connection.
    const socket = new WebSocket('ws://192.168.1.54:8000');

    // Connection opened
    socket.addEventListener('open', function (event) {
        window.history.pushState({}, '', "#0");
        const GamepadInstance = window.WiiUGamepad.listen(100);
        const output = document.getElementById("output");
        var counter = 0;
        GamepadInstance.onupdate = function () {
            counter++;
            window.history.pushState({}, '', "#" + counter.toString());
            socket.send(JSON.stringify(GamepadInstance, null, 4));
            output.textContent = JSON.stringify(GamepadInstance, null, 4)
        }
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
})
