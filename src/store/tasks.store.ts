import { IBoard } from "../types/board.type";
import { taskLocalStorage } from "../utils/task_storage";
import * as uuid from 'uuid';
import { makeAutoObservable } from "mobx";
import { ITask } from "../types/task.type";
import { ITaskGroup } from "../types/task_group.type";
import { editObject } from "../utils/edit_object";
import { UIStore } from "./ui.store";
import { ITag } from "../types/tag.type";

interface TaskStoreState {
	boards: IBoard[];
}

interface CreateTaskData {
	name: string;
	description: string;
	tags: ITag[];
}

interface CrateGroupData {
	name: string;
	description: string;
}

interface MoveTaskData {
	orTask: ITask;
	orGroup: ITaskGroup;
	toTask: ITask;
	toGroup: ITaskGroup;
	placeAfterTask?: boolean; 
}

interface moveGroupData {
	board: IBoard;
	orGroup: ITaskGroup;
	toGroup: ITaskGroup;
	placeAfter?: boolean;
}

export class TasksStore {
	boards: IBoard[];

	constructor(override?: TaskStoreState) {
		makeAutoObservable(this);

		if (override) {
			this.boards = override.boards;
			return;
		}

		this.boards = this.loadBoardsFromLocalStore();
	}

	private saveStateToLocalStore() {
		taskLocalStorage.saveBoards(this.boards);
	}

	private loadBoardsFromLocalStore(): IBoard[] {
		const savedBoards = taskLocalStorage.loadBoards();

		if (savedBoards.length > 0) {
			return savedBoards;
		}

		return [
			{
				groups: [],
				id: uuid.v4()
			}
		];
	}

	deleteAll(uiStore: UIStore) {
		taskLocalStorage.saveBoards([]);
		taskLocalStorage.saveCurBoardId('');
		this.boards = this.loadBoardsFromLocalStore();
		uiStore.setCurBoard(this.boards[0]);
	}	

	createBoard(board: IBoard) {
		this.boards.push(board);
		this.saveStateToLocalStore();
	}

	deleteBoard(id: string) {
		this.boards = this.boards.filter(b => b.id != id);
		this.saveStateToLocalStore();
	}
	
	createTask(group: ITaskGroup, task: CreateTaskData) {
		if (task.name.length == 0) {
			// MVP SOLUTION!
			// TODO create alert form or visual validation
			return;
		}

		const fullTask = {
			...task,
			fullfilled: false,
			id: uuid.v4()
		};

		const validTags = task.tags.filter(t => t.text.length > 0);
		const taskToPush = {
			...fullTask,
			tags: validTags,
		}

		group.tasks.push(taskToPush);
		this.saveStateToLocalStore();
	}

	createGroup(board: IBoard, group: CrateGroupData) {
		const fullGroup = {
			...group,
			id: uuid.v4(),
			tasks: [],
		} as ITaskGroup;
		
		board.groups.push(fullGroup);
		this.saveStateToLocalStore();
	}

	editTask(task: ITask, data: Partial<ITask>) {
		editObject(task, data);
		this.saveStateToLocalStore();
	}

	editGroup(group: ITaskGroup, data: Partial<ITaskGroup>) {
		editObject(group, data);
		this.saveStateToLocalStore();
	}

	deleteTask(group: ITaskGroup, id: string) {
		group.tasks = group.tasks.filter(t => t.id != id);
		this.saveStateToLocalStore();
	}

	deleteGroup(board: IBoard, id: string) {
		board.groups = board.groups.filter(g => g.id != id);
		this.saveStateToLocalStore();
	}

	moveGroup(data: moveGroupData) {
		const {
			board,
			orGroup,
			toGroup,
			placeAfter,
		} = data;

		const siblingIndex = board.groups.findIndex(g => g.id == toGroup.id);
		const placeIndex = placeAfter? siblingIndex + 1 : siblingIndex;
		this.deleteGroup(board, orGroup.id);
		board.groups.splice(placeIndex, 0, orGroup);
		this.saveStateToLocalStore();
	}

	moveTask(data: MoveTaskData) {
		const {
			orGroup,
			orTask,
			toGroup,
			toTask,
			placeAfterTask
		} = data;

		// append to another group
		if (!data.toTask) {
			if (orGroup == data.toGroup) {
				return;
			}

			// add to new group
			toGroup.tasks.push(orTask);

			// delete from prev group
			this.deleteTask(orGroup, orTask.id);

			return;
		}

		if (toGroup != orGroup) {
			if (toGroup.tasks.includes(orTask)) {
				return;
			}
		}

		// place before / after another task
		const siblingIndex = toGroup.tasks.findIndex(t => t.id == toTask.id);
		const placeIndex = placeAfterTask? siblingIndex + 1 : siblingIndex;
		this.deleteTask(orGroup, orTask.id);
		toGroup.tasks.splice(placeIndex, 0, orTask);
		this.saveStateToLocalStore();
	}
}