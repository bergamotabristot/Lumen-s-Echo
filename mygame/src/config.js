import kaplay from "kaplay";

const k = kaplay({
    global: false,
    scale: 2,
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
    width: 500,
    height: 340,
    letterbox: true,
});

export default k;
