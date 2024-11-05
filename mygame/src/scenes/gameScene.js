import k from "../config.js";
import { createPlayer } from "../entities/player.js"; // Atualizado para a nova localização

// Define a gravidade do jogo
k.setGravity(2000);

// Cria o jogador
const player = createPlayer();

// Variáveis para controle do poder de pulo
let forcaPulo = 0;
const maxForcaPulo = 800;

// Cria a barra de poder de pulo
const powerBar = k.add([
    k.rect(200, 10), // Tamanho da barra
    k.pos(10, 40), // Posição da barra
    k.color(0.2, 0.7, 0.2), // Cor da barra
    "powerBar", // Adiciona uma tag para fácil referência
]);

// Cria um texto para mostrar a força de pulo
const powerText = k.add([
    k.text("Poder de Pulo: 0", { size: 12 }), // Texto inicial
    k.pos(10, 30), // Posição do texto
    "powerText" // Tag para fácil referência
]);

// Atualiza a barra de poder de pulo
function updatePowerBar() {
    const powerPercentage = Math.min(forcaPulo / maxForcaPulo, 1); // Calcula a porcentagem de poder e garante que não exceda 100%
    powerBar.width = 200 * powerPercentage; // Atualiza a largura da barra
    powerText.text = `Poder de Pulo: ${forcaPulo}`; // Atualiza o texto para mostrar a força atual
}

// Mantém a barra de poder atualizada ao pressionar o botão de pulo
k.onButtonPress("jump", () => {
    if (player.isGrounded()) {
        player.play("compressao");
        forcaPulo = 0; // Reseta a força de pulo
        updatePowerBar(); // Atualiza a barra para refletir a força zerada
    }
});

// Mantém a barra de poder atualizada enquanto o botão é pressionado
k.onButtonDown("jump", () => {
    if (forcaPulo < maxForcaPulo) {
        forcaPulo += 5; // Aumenta a força de pulo
        updatePowerBar(); // Atualiza a barra
    }
});

// Ao soltar o botão, aplica o pulo
k.onButtonRelease("jump", () => {
    if (player.isGrounded()) {
        player.jump(forcaPulo); // Pula com a força acumulada
        forcaPulo = 0; // Reseta a força para o próximo pulo
        updatePowerBar(); // Atualiza a barra
    }
});

// Adiciona plataformas ao jogo
k.add([
    k.rect(400, 20),
    k.pos(50, 350),
    k.body({ isStatic: true }),
    k.color(0.5, 0.5, 0.5),
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

// Reseta a posição do jogador quando o botão 'reset' é pressionado
k.onButtonPress("reset", () => {
    player.moveTo(100, 50); // Reseta a posição do jogador
});

// Exporta a função da cena
export function gameScene() {
    // Esta função pode ser deixada vazia ou usada para lógica adicional de cena no futuro
}r
