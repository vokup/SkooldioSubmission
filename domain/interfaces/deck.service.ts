import { Card } from "../card";
import { Deck } from "../deck";

export interface IDeckDomainService {
    createDeck(): Deck;
    shuffleDeck(deck: Deck): void;
    dealFromDeck(deck: Deck): Card;
}