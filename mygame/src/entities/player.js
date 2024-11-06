import k from "../config.js";

export function createPlayer() {
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
    let direcaoHorizontal = 0;
    let emPulo = false;
    let spriteAtual = "lagartaDireita";

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
            forcaPulo = 0;
        }
    });

    k.onButtonDown("jump", () => {
        if (puloPressionado && forcaPulo < maxForcaPulo) {
            forcaPulo += 5;
        }
    });

    k.onButtonRelease("jump", () => {
        if (puloPressionado && player.isGrounded() && !emPulo) {
            player.play("descompressao");
            player.jump(forcaPulo);
            emPulo = true;
            puloPressionado = false;
        }
        forcaPulo = 0;
    });

    k.onUpdate(() => {
        if (!emPulo) {
            if (k.isButtonDown("runRight")) {
                direcaoHorizontal = 1;
            } else if (k.isButtonDown("runLeft")) {
                direcaoHorizontal = -1;
            } else {
                direcaoHorizontal = 0;
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
            if (direcaoHorizontal === 1 && spriteAtual !== "lagartaDireita") {
                player.use(k.sprite("lagartaDireita"));
                player.play("parado");
                spriteAtual = "lagartaDireita";
            } else if (direcaoHorizontal === -1 && spriteAtual !== "lagartaEsquerda") {
                player.use(k.sprite("lagartaEsquerda"));
                player.play("parado");
                spriteAtual = "lagartaEsquerda";
            }

            if (puloPressionado) {
                k.wait(0.1, () => {
                    player.play("seguraCompressao");
                });
            } else if (player.curAnim() === "descompressao") {
                player.play("descompressao");
            } else {
                player.play("parado");
            }
        }
    });

    return player;
}
