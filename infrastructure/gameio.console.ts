import { IGameIO } from "../application/interfaces/game.input";
import readline from 'readline';

function questionPromose(rl: readline.Interface, question: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

export class ConsoleGameIO implements IGameIO {

    constructor(
        private readonly rl: readline.Interface,
    ) { }

    prompt(question: string): Promise<string> {
        return questionPromose(this.rl, question);
    }

    print(str: string): void {
        console.log(str);
    }
}