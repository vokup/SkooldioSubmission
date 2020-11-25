export const CARD_FACES = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ] as const;
export const CARD_NAMES = [ 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King' ] as const;

export type CardFace = (typeof CARD_FACES)[number];
export type CardName = (typeof CARD_NAMES)[number];
export type CardValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class Card {
    public constructor(
        public readonly face: CardFace,
        public readonly name: CardName
    ) { }

    value(): number {
        switch (this.name) {
            case 'Ace':
                return 1;
            case '2':
                return 2;
            case '3':
                return 3;
            case '4':
                return 4;
            case '5':
                return 5;
            case '6':
                return 6;
            case '7':
                return 7;
            case '8':
                return 8;
            case '9':
                return 9;
            case '10':
                return 0;
            case 'Jack':
                return 0;
            case 'Queen':
                return 0;
            case 'King':
                return 0;
        }
    
        throw new Error('unhandled error');
    }

    toString(): string {
        return `${this.face}-${this.name}`;
    }
}