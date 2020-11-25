import { Card } from "./domain/card";
import { DeckDomainService } from "./domainservice/deck";
import { SimpleRandomService } from "./infrastructure/random.service";

async function main(): Promise<void> {
    const randomService = new SimpleRandomService();
    const deckDomainService = new DeckDomainService(randomService);

    const deck = deckDomainService.createDeck();
    // console.log(deck);
    deckDomainService.shuffleDeck(deck);
    // console.log(deck);

    console.log(deckDomainService.dealFromDeck(deck));
    console.log(deckDomainService.dealFromDeck(deck));
    console.log(deckDomainService.dealFromDeck(deck));
    console.log(deckDomainService.dealFromDeck(deck));
}

main();