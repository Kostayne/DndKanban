import * as uuid from 'uuid';
import { makeAutoObservable } from "mobx";
import { IBoard } from "../types/board.type";
import { ITask } from "../types/task.type";
import { ITaskGroup } from "../types/task_group.type";
import { taskLocalStorage } from "../utils/task_storage";
import { TasksStore } from "./tasks.store";

export enum FormNames {
	createGroup,
	editGroup,
	fullGroup,

	createTask,
	editTask,
	fullTask,
	none,
}

export class UIStore {
	activeForm: FormNames;
	formTaskGroup: ITaskGroup | null = null;
	formTask: ITask | null = null;
	curBoard: IBoard;

	draggingTask: ITask | null = null;
	draggingGroup: ITaskGroup | null = null;
	
	onTaskCreatedCb?: () => void;

	constructor(
		tasksStore: TasksStore,
		active: FormNames = FormNames.none
	) {
		this.activeForm = active;
		makeAutoObservable(this);

		const savedCurBoardId = taskLocalStorage.loadCurBoardId();

		if (!savedCurBoardId) {
			if (tasksStore.boards.length == 0) {
				throw new Error('There are no boards!');
			}

			this.curBoard = tasksStore.boards[0];
			taskLocalStorage.saveCurBoardId(this.curBoard.id);
			return;
		}

		const board = tasksStore.boards.find(b => b.id == savedCurBoardId);
		if (!board) {
			this.curBoard = tasksStore.boards[0];
			taskLocalStorage.saveCurBoardId(this.curBoard.id);
			return;
		}

		this.curBoard = board;
	}

	setActiveForm(val: FormNames) {
		this.activeForm = val;
	}

	setFormTaskGroup(group: ITaskGroup) {
		this.formTaskGroup = group;
	} 

	setFormTask(task: ITask) {
		this.formTask = task;
	}

	saveCurBoardToLocalStore() {
		taskLocalStorage.saveCurBoardId(this.curBoard.id);
	}

	setCurBoard(board: IBoard) {
		this.curBoard = board;
	}

	setOnTaskCreated(cb: () => void) {
		this.onTaskCreatedCb = cb;
	}

	setDraggingTask(task: ITask) {
		this.draggingTask = task;
	}

	setDraggingGroup(group: ITaskGroup) {
		this.draggingGroup = group;
	}
}