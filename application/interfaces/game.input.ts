export interface IGameIO {
    prompt(question: string): Promise<string>;
    print(str: string): void;
}