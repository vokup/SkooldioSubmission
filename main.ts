import { Card } from "./domain/card";
import { Game } from "./application/game";
import { DeckDomainService } from "./domainservice/deck";
import { SimpleRandomService } from "./infrastructure/random.service";
import readline from 'readline';
import { ConsoleGameIO } from "./infrastructure/gameio.console";



async function main(): Promise<void> {
    const randomService = new SimpleRandomService();
    const deckDomainService = new DeckDomainService(randomService);

    const deck = deckDomainService.createDeck();
    deckDomainService.shuffleDeck(deck);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var game = new Game(deckDomainService, new ConsoleGameIO(rl));
    await game.start();
    rl.close();
}

main();