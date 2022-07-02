import { ITag } from "./tag.type";

export interface ITask {
	tags: ITag[];
	fullfilled: boolean;
	description: string;
	name: string;
	id: string;
}