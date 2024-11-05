import kaplay from "kaplay";

const k = kaplay({
    global: false,
    scale: 4,
    buttons: {
        jump: {
            keyboard: ["space", "up", "w"],
            keyboardCode: "Space",
            gamepad: ["south"],
        },
        runRight: {
            keyboard: ["right", "d"],
        },
        runLeft: {
            keyboard: ["left", "a"],
        },
        reset: {
            keyboard: ["r"],
        },
    },
    
});

export default k;
