import { observer } from "mobx-react-lite";
import { memo } from "react";
import { ITask } from "../../types/task.type";
import { ITaskGroup } from "../../types/task_group.type";
import { Task } from "../Task";
import { TaskView } from "../TaskView";
import css from './index.module.scss';

export interface TaskListProps {
	group: ITaskGroup;
	tasks: ITask[];
	className?: string;
	areTaskPreviews?: boolean;
}

const Component = ({
	tasks,
	className = '',
	group,
	areTaskPreviews,
}: TaskListProps) => {
	const getTasks = () => {
		return tasks.map((t) => {
			if (areTaskPreviews) {
				return (
					<TaskView task={t} />
				);
			}

			return (
				<Task task={t} key={t.id} group={group} />
			);
		});
	};

	return (
		<div className={`${css['list']} ${className}`}>
			{getTasks()}
		</div>
	);
};

export const TaskList = observer(Component);