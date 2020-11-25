import { Card } from "../domain/card";
import { IDeckDomainService } from "../domain/interfaces/deck.service";
import { DeckDomainService } from "../domainservice/deck";
import { IRandomService } from "../domainservice/interfaces/random.service";
import { ConsoleGameIO } from "../infrastructure/gameio.console";
import { SimpleRandomService } from "../infrastructure/random.service";
import { Game } from "./game";
import { IGameIO } from "./interfaces/game.io";

export class DummyIO implements IGameIO {
    prompt(question: string): Promise<string> {
        return Promise.resolve('5');
    }
    print(str: string): void {
        // do nothing
    }
}

describe('Game', () => {
  let game: Game;
  let randomService: IRandomService;
  let deckDomainService: IDeckDomainService;

  beforeEach(async () => {
    randomService = new SimpleRandomService();
    deckDomainService = new DeckDomainService(randomService);
    game = new Game(deckDomainService, new DummyIO());
  });

  describe('CardScoring', () => {
    it('should be zero', () => {
      expect(game.calculateCardScoring([
          new Card('Clubs', '10'),
          new Card('Clubs', '10'),
      ])).toBe(0);
    });

    it('should be two', () => {
        expect(game.calculateCardScoring([
            new Card('Clubs', 'Ace'),
            new Card('Hearts', 'Ace'),
        ])).toBe(2);
    });

    it('should be nine', () => {
        expect(game.calculateCardScoring([
            new Card('Clubs', 'King'),
            new Card('Hearts', '9'),
        ])).toBe(9);
    });

    it('should be eight', () => {
        expect(game.calculateCardScoring([
            new Card('Spades', '4'),
            new Card('Spades', '4'),
        ])).toBe(8);
    });
  });
});
