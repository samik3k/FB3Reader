/// <reference path="../FB3ReaderHeaders.ts" />

module FB3PPCache {
	export interface IFB3PPCache {
		Set(I: number, Instr: FB3Reader.IPageRenderInstruction): void;
		Get(I: number): FB3Reader.IPageRenderInstruction;
		Save(Key: string): void;
		Load(Key: string): void;
		SetMargin(XP: string, Margin: number): void;
		GetMargin(XP: string): number;
		Reset(): void;
		Length(): number;
		LastPage(LastPageN?:number): number;
	}

}