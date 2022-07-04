import { observer } from 'mobx-react-lite';
import React, { DragEvent, memo, useContext, useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { StoreCtx } from '../../App';
import { FormNames } from '../../store/ui.store';
import { ITask } from '../../types/task.type';
import { ITaskGroup } from '../../types/task_group.type';
import { DraggableTypes } from '../../utils/draggable_types';
import { TaskView } from '../TaskView';

interface TaskProps {
	task: ITask;
	group: ITaskGroup;
}

interface DragTaskInfo {
	task: ITask;
	group: ITaskGroup;
}

const Component = ({
	task,
	group,
}: TaskProps) => {
	const store = useContext(StoreCtx);
	const uiStore = store.uiStore;
	const ref = useRef<HTMLDivElement>(null);

	const [{ isDragging }, dragRef, dragPreview] = useDrag(() => {
		return {
			type: DraggableTypes.Task,

			item: () => {
				return {
					group,
					task
				} as DragTaskInfo;
			},

			collect(monitor) { 
				const isDragging = monitor.isDragging();

				return {
					isDragging
				};
			},
		};
	});

	const sortItems = (item: DragTaskInfo, monitor: DropTargetMonitor<DragTaskInfo, {}>) => {
		const clientOffset = monitor.getClientOffset();

		if (!ref.current || !clientOffset) {
			return;
		}

		const hoverBoundingRect = ref.current.getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const distanceToTop = clientOffset.y - hoverBoundingRect.top;
		
		if (distanceToTop < hoverMiddleY * 0.25 || distanceToTop > hoverMiddleY * 1.25) {
			return;
		}

		const placeAfterTask = distanceToTop > hoverMiddleY;

		store.tasksStore.moveTask({
			orGroup: item.group,
			orTask: item.task,
			toGroup: group,
			toTask: task,
			placeAfterTask
		});	
	};

	const [{}, dropRef] = useDrop<DragTaskInfo, void, {}>(() => {
		return {
			accept: DraggableTypes.Task,

			collect: (monitor) => {
				return {
					
				};
			},

			hover: (item, monitor) => {
				// ignore it self
				if (item.task == task) {
					return;
				}

				// bug fix
				if (item.group != group) {
					return;
				}

				sortItems(item, monitor);
			},

			drop: (item, monitor) => {
				if (item.task == task) {
					return;
				}

				sortItems(item, monitor);
			}
		};
	});

	useEffect(() => {
		dragPreview(getEmptyImage());
	}, []);	

	const onEdit = () => {
		uiStore.setFormTaskGroup(group);
		uiStore.setFormTask(task);
		uiStore.setActiveForm(FormNames.editTask);
	};

	const onDragStart = () => {
		uiStore.setDraggingTask(task);
	};

	const onClick = (e: React.MouseEvent) => {
		const isHtmlElem = e.target instanceof HTMLElement;

		if (!isHtmlElem) {
			return;
		}

		const tg = e.target as HTMLElement;
		if (tg.tagName == 'button') {
			return;
		}

		uiStore.setFormTask(task);
		uiStore.setActiveForm(FormNames.fullTask);
	}

	dragRef(dropRef(ref))

	return (
		<TaskView onClick={onClick} onEdit={onEdit} task={task}
		onDragStart={onDragStart} ref={ref} isDragging={isDragging} />
	);
};

export const Task = memo(Component);
