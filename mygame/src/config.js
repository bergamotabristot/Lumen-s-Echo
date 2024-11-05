import kaplay from "kaplay";

const k = kaplay({
    global: false,
    scale: 1,
    buttons: {
        jump: { keyboard: ["space", "up", "w"], gamepad: ["south"], touch: "jump" },
        runRight: { keyboard: ["right", "d"], touch: "right" },
        runLeft: { keyboard: ["left", "a"], touch: "left" },
        reset: { keyboard: ["r"], touch: "reset" },
    },
});

// Handle touch events on the buttons
document.getElementById("jump").addEventListener("touchstart", () => k.trigger("jump"));
document.getElementById("runRight").addEventListener("touchstart", () => k.trigger("runRight"));
document.getElementById("runLeft").addEventListener("touchstart", () => k.trigger("runLeft"));
document.getElementById("reset").addEventListener("touchstart", () => k.trigger("reset"));

// Add touchend events to release the button when touch ends
["jump", "runRight", "runLeft", "reset"].forEach(id => {
    document.getElementById(id).addEventListener("touchend", () => k.releaseButton(id));
});

export default k;