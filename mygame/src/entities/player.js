import k from "../config.js";

export function createPlayer() {
    // Carrega os sprites do jogador
    k.loadSprite("lagartaDireita", "/sprites/lagartaright.png", {
        sliceX: 5,
        anims: {
            "compressao": { from: 1, to: 2, loop: true },
            "seguraCompressao": { from: 2, to: 2, loop: true },
            "descompressao": { from: 2, to: 3 },
            "noAr": { from: 4, to: 4, loop: true },
            "parado": { from: 0, to: 0, loop: true },
        },
    });

    k.loadSprite("lagartaEsquerda", "/sprites/lagarta.png", {
        sliceX: 5,
        anims: {
            "compressao": { from: 1, to: 2, loop: true },
            "seguraCompressao": { from: 2, to: 2, loop: true },
            "descompressao": { from: 2, to: 3 },
            "noAr": { from: 4, to: 4, loop: true },
            "parado": { from: 0, to: 0, loop: true },
        },
    });

    const moveSpeed = 160;
    const maxForcaPulo = 1000;
    let forcaPulo = 0;
    let puloPressionado = false;
    let direcaoHorizontal = 0; // Direção inicial neutra
    let emPulo = false; // Controla se o jogador está no ar
    let spriteAtual = "lagartaDireita"; // Variável para armazenar o sprite atual

    // Cria o jogador
    const player = k.add([
        k.sprite(spriteAtual),
        k.area({ shape: new k.Rect(k.vec2(14, 7), 11, 20) }),
        k.pos(100, 100),
        k.body(),
    ]);

    k.onButtonPress("jump", () => {
        if (player.isGrounded() && !emPulo) {
            player.play("compressao");
            puloPressionado = true;
            forcaPulo = 0; // Reseta a força de pulo
        }
    });

    k.onButtonDown("jump", () => {
        if (puloPressionado && forcaPulo < maxForcaPulo) {
            forcaPulo += 5; // Aumenta a força do pulo enquanto o botão é segurado
        }
    });

    k.onButtonRelease("jump", () => {
        if (puloPressionado && player.isGrounded() && !emPulo) {
            player.play("descompressao");
            player.jump(forcaPulo); // Pula com a força acumulada
            emPulo = true; // Define que o jogador está no ar
            puloPressionado = false; // Desativa o estado de pulo pressionado
        }
        forcaPulo = 0; // Reseta a força para o próximo pulo
    });

    k.onUpdate(() => {
        if (!emPulo) {
            if (k.isButtonDown("runRight")) {
                direcaoHorizontal = 1; // Direção para a direita
            } else if (k.isButtonDown("runLeft")) {
                direcaoHorizontal = -1; // Direção para a esquerda
            } else {
                direcaoHorizontal = 0; // Nenhuma tecla de direção pressionada
            }
        }

        if (emPulo) {
            player.move(direcaoHorizontal * moveSpeed, 0);

            if (player.curAnim() !== "noAr") {
                player.play("noAr");
            }

            if (player.isGrounded()) {
                emPulo = false;
            }
        } else {
            // Troca o sprite com base na direção
            if (direcaoHorizontal === 1 && spriteAtual !== "lagartaDireita") {
                player.use(k.sprite("lagartaDireita"));
                player.play("parado");
                spriteAtual = "lagartaDireita"; // Atualiza o sprite atual
            } else if (direcaoHorizontal === -1 && spriteAtual !== "lagartaEsquerda") {
                player.use(k.sprite("lagartaEsquerda"));
                player.play("parado");
                spriteAtual = "lagartaEsquerda"; // Atualiza o sprite atual
            }

            if (puloPressionado) {
                k.wait(0.1, () => {
                    player.play("seguraCompressao");
                });
            } else if (player.curAnim() === "descompressao") {
                player.play("descompressao");
            } else {
                player.play("parado"); // Retorna ao sprite 0 quando está no chão e parado
            }
        }
    });

    return player; // Retorna a instância do jogador
}
