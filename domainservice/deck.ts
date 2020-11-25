import { Card, CARD_FACES, CARD_NAMES } from "../domain/card";
import { Deck } from "../domain/deck";
import { IRandomService } from "./interfaces/random.service";

export class DeckDomainService {
    constructor(
        private readonly randomService: IRandomService,
    ) { }

    createDeck(): Deck {
        const cards: Array<Card> = [];
        for (const f of CARD_FACES) {
            for (const n of CARD_NAMES) {
                cards.push(new Card(f, n));
            }
        }

        return new Deck(cards);
    }

    shuffleDeck(deck: Deck): void {
        for (let i = deck.count() * deck.count(); i > 0; i--) {
            const j = this.randomService.randomIntegerRange(0, deck.count() - 1);
            const k = this.randomService.randomIntegerRange(0, deck.count() - 1);
            deck.swap(j, k);
        }
    }

    dealFromDeck(deck: Deck): Card {
        const dealIndex = this.randomService.randomIntegerRange(0, deck.count() - 1);
        return deck.deal(dealIndex);
    }
}