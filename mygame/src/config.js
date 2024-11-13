import kaplay from "kaplay";

const k = kaplay({
    global: false,
    scale: 1,
    buttons: {
        jump: {
            keyboard: ["space", "up", "w"],
            keyboardCode: "Space",
            gamepad: ["south"],
        },
        runRight: {
            keyboard: ["right", "d"],
            gamepad: ["dpad-right"]
        },
        runLeft: {
            keyboard: ["left", "a"],
            gamepad: ["dpad-left"]
        },
        reset: {
            keyboard: ["r"],
        },
    },
    
    
});

export default k;
