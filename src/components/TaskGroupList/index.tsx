import { observer } from "mobx-react-lite";
import { ITaskGroup } from "../../types/task_group.type";
import { TaskGroup } from "../TasksGroup";
import css from './index.module.scss';

interface TaskGroupList {
	groups: ITaskGroup[];
	className?: string;
}

const Component = ({
	groups,
	className,
}: TaskGroupList) => {
	const getGroups = () => {
		return groups.map(g => {
			return (
				<TaskGroup group={g} key={g.id} />
			);
		});
	};

	return (
		<div className={`${css['list']} ${className}`}>
			{getGroups()}
		</div>
	);	
};

export const TaskGroupList = observer(Component);