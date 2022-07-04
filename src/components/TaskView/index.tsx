import { observer } from 'mobx-react-lite';
import React, { forwardRef, memo } from 'react';
import { ITask } from '../../types/task.type';
import { TextButton } from '../Button';
import { EditIconSvg } from '../icons/Edit';
import { TagList } from '../TagList';
import css from './index.module.scss';

interface TaskViewProps {
	task: ITask;
	isDragging?: boolean;
	styles?: any;
	preview?: boolean;
	onEdit?: () => void;
	onClick?: (e: React.MouseEvent) => void;
	onDragStart?: () => void;
}

const Component = forwardRef<HTMLDivElement, TaskViewProps>((props: TaskViewProps, ref) => {
	const {
		task,
		isDragging,
		styles,
		preview,
		onClick,
		onDragStart,
		onEdit,
	} = props;

	return (
		<div className={`${css['task']} ${isDragging? css['_drag'] : ''}
			${preview? css['_preview'] : ''}
		`}
		onClick={onClick} onDragStart={onDragStart} ref={ref}
		style={styles}>
			<div className={`${css['top-block']}`}>
				<span className={`${css['name']}`}>{task.name}</span>

				<TextButton className={css['edit']} onClick={onEdit}>
					<EditIconSvg className={css['edit__svg']} />
				</TextButton>
			</div>
			
			{task.description && (
				<span className={`${css['description']}`}>
					{task.description}
				</span>
			)}

			{task.tags.length > 0 && (
				<TagList tags={task.tags} className={css['tags']} />
			)}
		</div>
	);
});

export const TaskView = observer(Component);
