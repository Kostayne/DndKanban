import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useDragLayer } from "react-dnd";
import { StoreCtx } from "../../App";
import { TaskGroupView } from "../TaskGroupView";

export const GroupDragPreview = observer(() => {
	const store = useContext(StoreCtx);
	const group = store.uiStore.draggingGroup;

	if (!group) {
		return null;
	}

	const {
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
			width: '270px',
		};
	};

	return (
		<TaskGroupView group={group} styles={getStyles()} />
	);
});