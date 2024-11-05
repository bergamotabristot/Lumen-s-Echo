import kaplay from "kaplay";

const k = kaplay({
    global: false,
    scale: 1,
    buttons: {
        jump: {
            keyboard: ["space", "up", "w"],
            keyboardCode: "Space",
            gamepad: ["south"],
            touch: "jump",  // Identificador de toque
        },
        runRight: {
            keyboard: ["right", "d"],
            touch: "right",  // Identificador de toque
        },
        runLeft: {
            keyboard: ["left", "a"],
            touch: "left",  // Identificador de toque
        },
        reset: {
            keyboard: ["r"],
            touch: "reset",  // Identificador de toque
        },
    },
    
    // Configurações para input touch
    touchControls: {
        jump: { x: 50, y: 50, width: 80, height: 80 },
        runRight: { x: 130, y: 50, width: 80, height: 80 },
        runLeft: { x: 10, y: 50, width: 80, height: 80 },
        reset: { x: 50, y: 150, width: 80, height: 80 },
    }
});

// Adicionar listeners de toque para ativar as ações
document.addEventListener("touchstart", (event) => {
    const touches = event.touches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        if (isTouchWithinBounds(touch, k.touchControls.jump)) k.trigger("jump");
        if (isTouchWithinBounds(touch, k.touchControls.runRight)) k.trigger("runRight");
        if (isTouchWithinBounds(touch, k.touchControls.runLeft)) k.trigger("runLeft");
        if (isTouchWithinBounds(touch, k.touchControls.reset)) k.trigger("reset");
    }
});

function isTouchWithinBounds(touch, bounds) {
    return (
        touch.clientX >= bounds.x &&
        touch.clientX <= bounds.x + bounds.width &&
        touch.clientY >= bounds.y &&
        touch.clientY <= bounds.y + bounds.height
    );
}

export default k;