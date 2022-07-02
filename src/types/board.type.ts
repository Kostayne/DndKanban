import { ITaskGroup } from "./task_group.type";

export interface IBoard {
	groups: ITaskGroup[];
	id: string;
}