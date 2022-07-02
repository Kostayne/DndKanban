import { IBoard } from "../types/board.type";

class TaskLocalStorage {
	protected prefix = 'k_todo_list';
	protected boardsKey = this.prefix + '_boards';
	protected curBoardIDKey = this.prefix + '_cur_board_id';

	loadBoards(): IBoard[] {
		const json = localStorage.getItem(this.boardsKey);

		if (!json) {
			return [];
		}

		const boards = JSON.parse(json) as IBoard[];
		return boards;
	}

	saveCurBoardId(id: string) {
		localStorage.setItem(this.curBoardIDKey, id);	
	}

	loadCurBoardId() {
		return localStorage.getItem(this.curBoardIDKey);
	}

	saveBoards(boards: IBoard[]) {
		const json = JSON.stringify(boards);
		localStorage.setItem(this.boardsKey, json);
	}
}

export const taskLocalStorage = new TaskLocalStorage();