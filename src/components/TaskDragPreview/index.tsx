import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useDragLayer } from "react-dnd";
import { StoreCtx } from "../../App";
import { TaskView } from "../TaskView";

export const TaskDragPreview = observer(() => {
	const store = useContext(StoreCtx);
	const task = store.uiStore.draggingTask;

	if (!task) {
		return null;
	}

	const {
		isDragging,
		curOffset,
		initClientOffset,
		initSourceClientOfsset,
	} = useDragLayer((monitor) => {
		const isDragging = monitor.isDragging();

		return {
			isDragging,
			initClientOffset: monitor.getInitialClientOffset(),
			initSourceClientOfsset: monitor.getInitialSourceClientOffset(),
			curOffset: monitor.getSourceClientOffset()
		};
	});

	const getStyles = () => {
		if (!curOffset || !initClientOffset || !initSourceClientOfsset) {
			return {
				display: 'none'
			};
		}

		return {
			transform: `translate(${curOffset.x}px, ${curOffset.y}px) rotate(2.5deg)`,
			width: '246px'
			// left: curOffset.x + 'px',
			// top: curOffset.y + 'px'
		};
	};

	return (
		<TaskView task={task} styles={getStyles()} />
	);
});