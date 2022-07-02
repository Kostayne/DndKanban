import { IBoard } from "../types/board.type";

const board: IBoard = {
	groups: [
		{
			id: 'test_group_0',
			description: 'test description will be displayed here',
			name: 'Test group',

			tasks: [
				{
					id: 'test_task_0',
					description: 'Full task description here',
					fullfilled: false,
					name: 'Test task'
				},

				{
					id: 'test_task_2',
					description: 'Full task description here',
					fullfilled: false,
					name: 'Test task 3'
				}
			]
		},

		{
			id: 'test_group_1',
			description: 'test description will be displayed here',
			name: 'Test group 2',

			tasks: [
				{
					id: 'test_task_1',
					description: 'Full task description here',
					fullfilled: false,
					name: 'Test task 2'
				}
			]
		}
	],

	id: 'test_board_0'
}

export const boardsFixture: IBoard[] = [
	board
];