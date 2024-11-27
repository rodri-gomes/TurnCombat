/*
Algoritmos e Programação — Ativ. 28/nov.
Alunos: Gustavo Menezes, Leandro Rafael Rodriguez, Rodrigo Souza
*/
const prompt = require('prompt-sync')(); // Importa a biblioteca prompt-sync

// Variáveis globais
let playerHP = 10; // Define o HP atual do jogador como 10
let enemyHP = 10;
let maxHP = 10; // Define o HP máximo como 10
// Cria uma barra de HP repetindo '#' conforme o HP atual do jogador
function atualizarHPBar(hp, maxHP) {
    return '#'.repeat(hp) + '-'.repeat(maxHP - hp);
}

function menu() {
    let hpBar = atualizarHPBar(playerHP, maxHP);
    let enemyHpBar = atualizarHPBar(enemyHP, maxHP);
    console.log(`
Seu HP: [${hpBar}]    HP do Inimigo: [${enemyHpBar}]`);
    console.log("+-------------------+");
    console.log("|  [1] Atacar       |");
    console.log("|  [2] Defender     |");
    console.log("|  [3] Usar Item    |");
    console.log("|  [4] Fugir        |");
    console.log("+-------------------+");
}

function main() {
    const playerName = prompt("Saudações, bravo aventureiro! Qual é o seu nome? ");
    console.log(`Bem-vindo à sua grande jornada, ${playerName}!`);
    console.log("O destino chama, e seu primeiro desafio está à espreita. Prepare-se!\n");  
    console.log(`A sua frente o inimigo se aproxima.\n`);
    while (playerHP > 0 && enemyHP > 0) {
        menu();
        let escolha = parseInt(prompt(`O que vai fazer, ${playerName}?!`));
        switch (escolha) {
            case 1:
                console.log("Você ataca o inimigo!");
                enemyHP--;
                break
            case 2:
                console.log("Você se defende do ataque do inimigo!");
                playerHP - 0.5;
                break
            case 3:
                console.log("You cant do this now");
                break
            case 4:
                console.log("You cant do this now");
                break
        }
    }


    if (playerHP <= 0) {
        console.log("Você foi derrotado... O mundo escurece.");
    } else if (enemyHP <= 0) {
        console.log("Parabéns! Você derrotou o inimigo e venceu esta batalha!");
    }

}
main()