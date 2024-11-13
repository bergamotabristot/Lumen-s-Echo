import k from "../config.js";
import { createPlayer } from "../entities/player.js";

const normalGravity = 2000;
const slipperyGravity = 4000; // Gravidade aumentada para o efeito escorregadio

k.setGravity(normalGravity);

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
});

let forcaPulo = 0;
const maxForcaPulo = 600;

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

k.add([ //branch 1
    k.rect(150, 30),
    k.pos(30, 800),
    k.body({ isStatic: true }),
    k.color(5, 5, 5),
    k.area(),
]);

k.add([ //branch 2
  k.rect(150, 30),
  k.pos(200, 710),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);

k.add([ //branch 3
  k.rect(170, 30),
  k.pos(30, 600),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);

k.add([ //branch 4
  k.rect(140, 30),
  k.pos(250, 470),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);



k.add([ //branch 5
  k.rect(150, 30),
  k.pos(30, 470),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
 
]);



k.add([ //branch 6
  k.rect(160, 30),
  k.pos(230, 350),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);

const branch = k.add([ //branch 7
  k.rect(90, 30),
  k.pos(30, 290),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area({ shape: new k.Rect(k.vec2(20,0), 60, 20) }),
  { isSlippery: true },
  "branch"
 
]);

k.onButtonPress("reset", () => {
  player.moveTo(110, 50);
});

k.add([ //trunk 1
  k.rect(50, 2000),
  k.pos(0, 0),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);

k.add([ //trunk 2
  k.rect(50, 2000),
  k.pos(350, 0),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
]);

const inclinedTrunk = k.add([
  k.rect(80, 30),
  k.pos(120, 290),
  k.body({ isStatic: true }),
  k.color(5, 5, 5),
  k.area(),
  k.rotate(45),
  { isSlippery: true },
  "inclinedTrunk",
  { direction: "1" }
]);

let lastDirection = null;  // Variável para armazenar a direção antes da colisão
let emPulo = false;        // Variável para controlar o estado de pulo
const moveSpeed = 1600;     // Velocidade de movimento

player.onCollide("inclinedTrunk", (inclinedTrunk) => {
  console.log("colidiu 1com tronco inclinado");
  player.move(lastDirection *  200)
  
  // Salva a direção do tronco inclinado (se tiver)
  if (inclinedTrunk.direction) {
    lastDirection = inclinedTrunk.direction;
  }
  player.move(lastDirection *  200)

});

player.onCollideEnd("inclinedTrunk", (inclinedTrunk) => {
  console.log("não colidiu mais com tronco inclinado");
  k.setGravity(2000);
  player.move(lastDirection *  200) 
  
});

player.onCollideUpdate("inclinedTrunk", (inclinedTrunk) => {
   player.move(lastDirection *  200)
  // Lógica adicional, caso necessário, enquanto ainda colide com o tronco inclinado
  if (lastDirection !== null) {
    if (lastDirection === 1) {
      // Direção para a direita
      player.move(moveSpeed, 0);  // Move para a direita enquanto colide com o tronco
    } else if (lastDirection === -1) {
      // Direção para a esquerda
      player.move(-moveSpeed, 0); // Move para a esquerda enquanto colide com o tronco
    }
  }
});





export function gameScene() {
}
