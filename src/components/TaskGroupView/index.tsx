import { observer } from "mobx-react-lite";
import { forwardRef } from "react";
import { ITaskGroup } from "../../types/task_group.type";
import { TextButton } from "../Button";
import { DotsIconSvg } from "../icons/Dots";
import { PlusIconSvg } from "../icons/Plus";
import { TaskList } from "../TaskList";
import css from './index.module.scss';

export interface TaskGroupViewProps {
	group: ITaskGroup;
	isPreview?: boolean;
	isDragging?: boolean;
	styles?: any;
	onEdit?: () => void;
	onCreateNewTask?: () => void;
	onViewFull?: () => void;
	onDragStart?: () => void;
};

const Component = forwardRef<HTMLDivElement, TaskGroupViewProps>((props: TaskGroupViewProps, ref) => {
	const {
		group,
		isPreview,
		isDragging,
		styles,
		onViewFull,
		onCreateNewTask,
		onDragStart,
		onEdit,
	} = props;

	return (
		<div className={`${css['group']} ${isDragging? css['_dragging'] : ''}`} ref={ref}
		style={styles} onDragStart={onDragStart}>
			<div className={`${css['top-block']}`}>
				<span className={`${css['name']}`} onClick={onViewFull}>{group.name}</span>

				<TextButton className={`${css['dots']}`}
				onClick={onEdit}>
					<DotsIconSvg />
				</TextButton>
			</div>

			{group.description && (
				<span className={`${css['description']}`}>{group.description}</span>
			)}

			<TaskList tasks={group.tasks} className={css['tasks']}
			group={group} areTaskPreviews={isPreview} />

			<TextButton className={css['create-new']}
			onClick={onCreateNewTask}>
				<div className={css['create-new__content']}>
					<PlusIconSvg className={css['create-new__svg']}
					pathClassName={css['create-new__path']} />

					<span className={css['create-new__text']}>Создать задачу</span>
				</div>
			</TextButton>
		</div>
	);
});

export const TaskGroupView = observer(Component);
