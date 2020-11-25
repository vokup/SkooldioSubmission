import { Card } from "../domain/card";
import { Deck } from "../domain/deck";
import { IDeckDomainService } from "../domain/interfaces/deck.service";
import { IGameIO } from "./interfaces/game.io";

export class Game {
    private totalChip: number;

    constructor(
        private readonly deckDomainService: IDeckDomainService,
        private readonly gameIo: IGameIO,
    ) {
        this.totalChip = 0;
    }

    async start(): Promise<void> {
        while (true) {
            const deck = this.deckDomainService.createDeck();
            this.deckDomainService.shuffleDeck(deck);
    
            const bet = +(await this.gameIo.prompt('Please put your bet: '));

            const yourCards = this.dealPairCard(deck);
            const dealerCards = this.dealPairCard(deck);
    
            this.gameIo.print(`You got ${yourCards[0]}, ${yourCards[1]}`);
            this.gameIo.print(`The dealer got ${dealerCards[0]}, ${dealerCards[1]}`);

            const yourValue = this.calculateCardScoring(yourCards);
            const dealerValue = this.calculateCardScoring(dealerCards);
            
            if (yourValue === dealerValue) {
                this.gameIo.print('You tie!!!, received 0 chip');
            } else if (yourValue > dealerValue) {
                this.gameIo.print(`You won!!!, received ${bet} chip${bet > 1 ? 's' : ''}`);
                this.totalChip += bet;
            } else {
                this.gameIo.print(`You lost!!!, lost ${bet} chip${bet > 1 ? 's' : ''}`);
                this.totalChip -= bet;
            }

            const playMore = await this.gameIo.prompt('Wanna play more (Yes/No)?: ');
            if (playMore.localeCompare('No') === 0) {
                break;
            }

            // spacing for next round
            console.log();
        }
        this.gameIo.print(`You got total ${this.totalChip} chip${this.totalChip > 1 ? 's' : ''}`)
    }

    dealPairCard(deck: Deck): [ Card, Card ] {
        return [
            this.deckDomainService.dealFromDeck(deck), 
            this.deckDomainService.dealFromDeck(deck) 
        ];
    }

    calculateCardScoring(cards: [ Card, Card ]): number {
        if (cards.length !== 2) {
            throw new Error('incorrect card length');
        }
        return cards[0].value() + cards[1].value();
    }
}