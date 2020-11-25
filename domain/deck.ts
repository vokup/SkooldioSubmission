import { Card } from "./card";

export class Deck {
    constructor(        
        private cards: Array<Card>,
    ) {}

    // swap card between index i and j
    // for card shuffling after deck created
    swap(i: number, j: number) {
        if (i < 0 || i >= this.cards.length) {
            throw new RangeError('i is out of range');
        }

        if (j < 0 || j >= this.cards.length) {
            throw new RangeError('j is out of range');
        }

        const temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }

    deal(i : number): Card {
        if (i < 0 || i >= this.cards.length) {
            throw new RangeError('i is out of range');
        }

        const retCard = this.cards[i];
        this.cards = this.cards.filter((_, j) => {
            return j !== i;
        });

        return retCard;
    }

    count(): number {
        return this.cards.length;
    }

    
    toString(): string {
        return `${this.cards}`;
    }
}