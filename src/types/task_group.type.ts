import { ITask } from "./task.type";

export interface ITaskGroup {
	name: string;
	description: string;
	tasks: ITask[];
	id: string;
}