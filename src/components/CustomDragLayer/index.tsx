import { ReactNode } from "react";
import { useDragLayer } from "react-dnd";
import { DraggableTypes } from "../../utils/draggable_types";
import { GroupDragPreview } from "../GroupDragPreview";
import { TaskDragPreview } from "../TaskDragPreview";
import css from './index.module.scss';

export const CustomDragLayer = () => {
	const {
		isDragging, itemType,
	} = useDragLayer((monitor) => {
		const isDragging = monitor.isDragging();

		return {
			isDragging,
			itemType: monitor.getItemType(),
			item: monitor.getItem(),
		};
	});

	if (!isDragging) {
		return null;
	}

	interface DragPreviewInfo {
		type: DraggableTypes;
		component: ReactNode;
	}

	const info: DragPreviewInfo[] = [
		{
			type: DraggableTypes.Group,

			component: (
				<GroupDragPreview />
			),
		},

		{
			type: DraggableTypes.Task,

			component: (
				<TaskDragPreview />
			)
		}
	];

	const c = info.find(c => c.type == itemType)?.component;

	return (
		<div className={css['layer']}>
			{c}
		</div>
	);
};