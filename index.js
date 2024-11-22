/*
Algoritmos e Programação — Ativ. 28/nov.
Alunos: Gustavo Menezes, Leandro Rafael Rodrigues, Rodrigo Souza
*/
const prompt = require('prompt-sync')(); // Importa a biblioteca prompt-sync

// Variáveis globais
let playerHP = 10; // Define o HP atual do jogador como 10
let maxHP = 10; // Define o HP máximo como 10
// Cria uma barra de HP repetindo '#' conforme o HP atual do jogador
let hpBar = '#'.repeat(playerHP) + '-'.repeat(maxHP - playerHP);

function menu() {
    console.log(`HP: [${hpBar}]`);
    console.log("+-+-+-+-+-+-+-+-+-+-+");
    console.log("[1] Atacar");
    console.log("[2] Defender");
    console.log("[3] Usar Item");
    console.log("[4] Fugir");
    console.log("+-+-+-+-+-+-+-+-+-+-+");
}

function main() {
    const playerName = prompt("Saudações, bravo aventureiro! Qual é o seu nome? ");
    console.log(`Bem-vindo à sua grande jornada, ${playerName}!`);
    console.log("O destino chama, e seu primeiro desafio está à espreita. Prepare-se!\n");    
    console.log(`A sua frente o inimigo se aproxima. O que vai fazer, ${playerName}?!\n`)
    menu()
}

main()