import k from "../config.js";
import { createPlayer } from "../entities/player.js";

k.setGravity(2000);

const player = createPlayer();

let activeDirection = null; // Armazena a direção ativa: "runRight" ou "runLeft"

function setActiveButton(buttonId) {
  const buttons = ["runRightBtn", "runLeftBtn"];
  
  // Remover a classe 'selected' de todos os botões
  buttons.forEach(id => {
    const button = document.getElementById(id);
    button.classList.remove("selected");
  });

  // Se um botão foi selecionado, adicionar a classe 'selected' ao botão ativo
  if (buttonId) {
    const activeButton = document.getElementById(buttonId);
    activeButton.classList.add("selected");
  }
}

function setupTouchControls() {
  const buttons = [
    { id: "jumpBtn", action: "jump" },
    { id: "resetBtn", action: "reset" },
  ];

  // Função para simular o botão sendo "segurado" continuamente
  function holdDirectionButton(direction) {
    if (activeDirection === direction) {
      k.pressButton(direction);
      requestAnimationFrame(() => holdDirectionButton(direction));
    }
  }

  // Configuração dos botões de movimentação para alternância (direção invertida)
  document.getElementById("runRightBtn").addEventListener("click", () => {
    // Se o botão "esquerda" estiver selecionado, desativa-o
    if (activeDirection === "runLeft") {
      k.releaseButton("runLeft");
      activeDirection = null;
      setActiveButton(null); // Remove a seleção visual do botão
    } else {
      // Ativa "direita" (que vai para a esquerda) e desativa "esquerda"
      k.releaseButton("runRight");
      activeDirection = "runLeft";
      holdDirectionButton("runLeft");
      setActiveButton("runRightBtn"); // Marca o botão "direita" como ativo
    }
  });

  document.getElementById("runLeftBtn").addEventListener("click", () => {
    // Se o botão "direita" estiver selecionado, desativa-o
    if (activeDirection === "runRight") {
      k.releaseButton("runRight");
      activeDirection = null;
      setActiveButton(null); // Remove a seleção visual do botão
    } else {
      // Ativa "esquerda" (que vai para a direita) e desativa "direita"
      k.releaseButton("runLeft");
      activeDirection = "runRight";
      holdDirectionButton("runRight");
      setActiveButton("runLeftBtn"); // Marca o botão "esquerda" como ativo
    }
  });

  // Outros botões sem alternância
  buttons.forEach(({ id, action }) => {
    const button = document.getElementById(id);
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      k.pressButton(action);
    });
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      k.releaseButton(action);
    });
    button.addEventListener("mousedown", () => k.pressButton(action));
    button.addEventListener("mouseup", () => k.releaseButton(action));
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupTouchControls();
})
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
    k.color(5, 5, 5),
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
