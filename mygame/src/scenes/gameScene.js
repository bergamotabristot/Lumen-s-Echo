import k from "../config.js";
import { createPlayer } from "../entities/player.js";

k.setGravity(2000);

const player = createPlayer();

let forcaPulo = 0;
const maxForcaPulo = 800;

const powerBar = k.add([
    k.rect(200, 10),
    k.pos(10, 40),
    k.color(0.2, 0.7, 0.2),
    "powerBar",
]);

const powerText = k.add([
    k.text("Poder de Pulo: 0", { size: 12 }),
    k.pos(10, 30),
    "powerText"
]);

function updatePowerBar() {
    const powerPercentage = Math.min(forcaPulo / maxForcaPulo, 1);
    powerBar.width = 200 * powerPercentage;
    powerText.text = `Poder de Pulo: ${forcaPulo}`;
}

k.onButtonPress("jump", () => {
    if (player.isGrounded()) {
        player.play("compressao");
        forcaPulo = 0;
        updatePowerBar();
    }
});

k.onButtonDown("jump", () => {
    if (forcaPulo < maxForcaPulo) {
        forcaPulo += 5;
        updatePowerBar();
    }
});

k.onButtonRelease("jump", () => {
    if (player.isGrounded()) {
        player.jump(forcaPulo);
        forcaPulo = 0;
        updatePowerBar();
    }
});

k.add([
    k.rect(400, 20),
    k.pos(50, 300),
    k.body({ isStatic: true }),
    k.color(50, 50, 5),
    k.area(),
]);

k.add([
    k.rect(400, 20),
    k.pos(50, 0),
    k.body({ isStatic: true }),
    k.color(0.5, 0.5, 0.5),
    k.area(),
]);

k.add([
    k.rect(100, 20),
    k.pos(200, 140),
    k.body({ isStatic: true }),
    k.color(0.5, 0.5, 0.5),
    k.area(),
]);

k.add([
    k.rect(100, 20),
    k.pos(370, 140),
    k.body({ isStatic: true }),
    k.color(0.5, 0.5, 0.5),
    k.area(),
]);

k.onButtonPress("reset", () => {
    player.moveTo(100, 50);
});

export function gameScene() {
}
