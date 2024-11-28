/*
Algoritmos e Programação - Ativ. 28/nov.
Alunos:
Gustavo Menezes;
Leandro Rafael Rodriguez;
Rodrigo Gomes Souza.
*/
//Importação da biblioteca prompt-sync
const prompt = require('prompt-sync')();
//Variáveis globais
let playerHP = 15, enemyHP = 15, maxHP = 15;

let inventarioItens = [
    ["Poção", 2], // Cura o jogador
    ["Afiador de Espada", 1], // Aumenta o dano no próximo ataque
    ["Atordoador", 1] // Atordoa o inimigo
];

// Cria uma barra de vida e a atualiza de acordo ao total da vida atual
function barraHP(hp, maxHP) {
    return `\x1b[31m#\x1b[0m`.repeat(hp) + '-'.repeat(maxHP - hp);
}

// Função do ataque
function atacar() {
    // Gera um número aleatório entre 1 e 3
    let dano = Math.floor(Math.random() * 3) + 1; 
    console.log(`\x1b[1mVocê ataca o inimigo e causa ${dano} de dano!\x1b[0m`);
    switch(dano) {
        case 1:
            console.log("\x1b[34mDano bom!\x1b[0m");
            break;
        case 2:
            console.log("\x1b[33mDano ótimo!\x1b[0m");
            break;
        case 3:
            console.log("\x1b[32mMuito bem! Dano crítico!\x1b[0m");
            break;
    }
    return dano;
}

// Função da defesa
function defender() {
    const danoReduzido = Math.floor(Math.random() * 2); // Redução de dano entre 0 e 1
    console.log(`\x1b[1mVocê se defende!\x1b[0m O próximo ataque será reduzido em \x1b[34m${danoReduzido}\x1b[0m dano.`);
    return danoReduzido;
}

// Função de fugir da luta
function fugir() {
    console.log("Você tenta fugir...");
    // 50% de chance de fugir
    const sucesso = Math.random() < 0.5; 
    if (sucesso) {
        console.log("\x1b[32mVocê conseguiu escapar do inimigo!\x1b[0m");
        return true;
    } else {
        console.log("\x1b[31mVocê falhou em fugir! O inimigo ataca.\x1b[0m");
        return false;
    }
}

// Função para o uso de itens
function usarItem() {
    console.log("Itens disponíveis no inventário:");
    // Lista o inventário
    inventarioItens.forEach((item, index) => {
        console.log(`[${index + 1}] ${item[0]} (Quantidade: ${item[1]})`);
    });
    // Escolha do usuário
    let escolha = parseInt(prompt("Escolha um item para usar: ")) - 1;

    if (escolha >= 0 && escolha < inventarioItens.length && inventarioItens[escolha][1] > 0) {
        let item = inventarioItens[escolha];
        let efeito;

        switch (item[0]) {
            case "Poção":
                const cura = Math.floor(Math.random() * 3) + 3;
                playerHP = Math.min(playerHP + cura, maxHP);
                console.log(`Você usou uma Poção e recuperou \x1b[91m${cura}\x1b[0m de HP. Seu HP atual é \x1b[91m${playerHP}\x1b[0m.`);
                break;
            case "Afiador de Espada":
                console.log("Você usa o Afiador de Espada! \x1b[35mSeu próximo ataque causará dano dobrado.\x1b[0m");
                efeito = "buffDano"; // Define o efeito para ser retornado depois
                break;
            case "Atordoador":
                console.log("Você usa o Atordoador! \x1b[35mO inimigo ficará atordoado e perderá o próximo turno.\x1b[0m");
                efeito = "stunInimigo"; // Define o efeito para ser retornado depois
                break;
            default:
                console.log("Item inválido!");
                return;
        }

        // Decrementa a quantidade do item
        inventarioItens[escolha][1] -= 1;

        // Se a quantidade do item for zero, remove-o do inventário
        if (inventarioItens[escolha][1] === 0) {
            inventarioItens.splice(escolha, 1);
            console.log(`${item[0]} foi removido do inventário.`);
        }

        // Retorna o efeito do item (caso haja)
        if (efeito) return efeito;
        } else {
            console.log("Escolha inválida ou item esgotado.");
        }
}

// Função com o menu
function menu() {
    // cria as barras de vida do player e inimigo
    let hpbar = barraHP(playerHP, maxHP);
    let hpbarEnemy = barraHP(enemyHP, maxHP);

    console.log(`
        Seu HP: [${hpbar}]    HP do Inimigo: [${hpbarEnemy}]`);
        console.log("+-------------------+");
        console.log("|  [1] Atacar       |");
        console.log("|  [2] Defender     |");
        console.log("|  [3] Usar Item    |");
        console.log("|  [4] Fugir        |");
        console.log("+-------------------+");
}

// Função principal
function main() {
    // Variáveis 
    let defesaReduzida = 0;
    let buffDano = false, inimigoAtordoado = false;
    // Pede o nome do jogador e inicia o jogo
    const playerNome = prompt("Saudações, bravo aventureiro! Qual é o seu nome? ");
    console.log(`Bem-vindo à sua grande jornada, ${playerNome}!`);
    console.log("O destino chama, e seu primeiro desafio está à espreita. Prepare-se!\n");  
    console.log(`A sua frente o inimigo se aproxima.\n`);

    // Roda as escolhas de ação
    while (playerHP > 0 && enemyHP > 0) {
        menu(); //lista o menu
        let escolha = parseInt(prompt(`O que vai fazer, ${playerNome}?! `));
        switch (escolha) {
            case 1: // Atacar
                console.clear();
                let dano = atacar();
                // Reduz o HP do inimigo, mas não permite valores negativos
                enemyHP = Math.max(enemyHP - dano, 0); 
                break;
            case 2: // Defender
                console.clear();
                defesaReduzida = defender();
                break;
            case 3: // Usar item
                console.clear();
                const efeito = usarItem();
                if (efeito === "buffDano") {
                    buffDano = true;
                } else if (efeito === "stunInimigo") {
                    inimigoAtordoado = true;
                }
                break;
            case 4: // Fugir
                console.clear();
                if (fugir()) {
                    return; //Sai do jogo
                }
                break;
            default:
                console.log("Escolha inválida. Tente novamente.");
                continue;
        }

        // Turno do inimigo
        if (enemyHP > 0 && !inimigoAtordoado) {
            // Gera o dano do inimigo
            const danoInimigo = Math.floor(Math.random() * 3) + 1 - defesaReduzida;
            // Garante que o dano não seja negativo
            const danoFinal = Math.max(0, danoInimigo); 
            console.log(`\x1b[31mO inimigo ataca e causa ${danoFinal} de dano a você!\x1b[0m`);
            // Diminui a vida do jogador
            playerHP = Math.max(0, playerHP - danoFinal);
            // Zera a redução de dano após o ataque do inimigo
            defesaReduzida = 0; 
        } else if (inimigoAtordoado) {
            console.log("O inimigo está atordoado e perde o turno!");
            inimigoAtordoado = false;
        }
    }

    // Finaliza o jogo
    if (playerHP <= 0) {
        console.log("Você foi derrotado... O mundo escurece.");
    } else if (enemyHP <= 0) {
        console.log("\x1b[32mParabéns! Você derrotou o inimigo e venceu esta batalha!\x1b[0m");
    }
}


main()