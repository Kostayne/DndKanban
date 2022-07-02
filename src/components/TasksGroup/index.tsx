import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { StoreCtx } from "../../App";
import { FormNames } from "../../store/ui.store";
import { ITask } from "../../types/task.type";
import { ITaskGroup } from "../../types/task_group.type";
import { DraggableTypes } from "../../utils/draggable_types";
import { TaskGroupView } from "../TaskGroupView";

export interface TaskGroupProps {
	group: ITaskGroup;
};

interface DragGroupData {
	group: ITaskGroup;
	task?: ITask;
}

const Component = ({
	group
}: TaskGroupProps) => {
	const store = useContext(StoreCtx);
	const uiStore = store.uiStore;
	const ref = useRef<HTMLDivElement>(null);

	const onViewFull = () => {
		uiStore.setFormTaskGroup(group);
		uiStore.setActiveForm(FormNames.fullGroup);
	};

	const onCreateNewTask = () => {
		uiStore.setFormTaskGroup(group);
		uiStore.setActiveForm(FormNames.createTask);
	};

	const onEdit = () => {
		uiStore.setFormTaskGroup(group);
		uiStore.setActiveForm(FormNames.editGroup);
	};

	const [{isDragging}, dragRef, previewRef] = useDrag(() => {
		return {
			type: DraggableTypes.Group,

			collect: (monitor) => {
				return {
					isDragging: monitor.isDragging()
				};
			},

			item: () => {
				return {
					group
				} as DragGroupData;
			}
		};
	});

	const [{}, dropRef] = useDrop<DragGroupData, {}, {}>(() => {
		return {
			accept: [DraggableTypes.Group, DraggableTypes.Task],

			collect: (monitor) => {
				return {

				};
			},

			hover: (item, monitor) => {
				if (item.task !== undefined) {
					return;
				}

				// ignore it self
				if (item.group == group) {
					return;
				}

				const clientOffset = monitor.getClientOffset();

				if (!ref.current || !clientOffset) {
					return;
				}

				const hoverBoundingRect = ref.current.getBoundingClientRect();
				const hoverMiddleX = (hoverBoundingRect.right- hoverBoundingRect.left) / 2;
				const distanceToLeft = clientOffset.x - hoverBoundingRect.left;
				
				if (distanceToLeft < hoverMiddleX * 0.1 || distanceToLeft > hoverMiddleX * 1.1) {
					return;
				}

				const placeAfter = distanceToLeft > hoverMiddleX;
				const board = uiStore.curBoard;
				
				store.tasksStore.moveGroup({
					board,
					orGroup: item.group,
					toGroup: group,
					placeAfter
				});
			},

			drop: (data) => {
				// ignore self
				if (data.group == group) {
					return;
				}	

				if (!data.task) {
					return;
				}

				if (group.tasks.includes(data.task)) {
					return;
				}

				store.tasksStore.moveTask({
					orGroup: data.group,
					orTask: data.task,
					toGroup: group,
					toTask: group.tasks[group.tasks.length - 1],
					placeAfterTask: true
				});

				return {};
			}
		};
	});

	const onDragStart = () => {
		uiStore.setDraggingGroup(group);
	};

	useEffect(() => {
		previewRef(getEmptyImage());
	}, []);

	dropRef(dragRef(ref));

	return (
		<TaskGroupView group={group} onCreateNewTask={onCreateNewTask}
		onEdit={onEdit} ref={ref} isDragging={isDragging}
		onViewFull={onViewFull} onDragStart={onDragStart} />
	);
};

export const TaskGroup = observer(Component);
