import css from './index.module.scss';
import { memo, useEffect, useState } from "react";
import { TagColors } from "../../types/tag_color.type";
import { tagColorsInfo } from "../../utils/colors_info";
import { getTagColorByName } from "../../utils/get_color_by_name";
import { useClickOutside } from 'react-click-outside-hook';

interface ColorInputProps {
	value: TagColors;
	onChange?: (val: TagColors) => void;
	className?: string;
}

export const TagColorInput = memo(({
	value,
	onChange,
	className = '',
}: ColorInputProps) => {
	const [opened, setOpened] = useState(false);
	const [ref, clickedOutside] = useClickOutside();
	
	useEffect(() => {
		if (clickedOutside) {
			setOpened(false);
		}
	}, [clickedOutside]);

	const getColors = () => {
		return tagColorsInfo.map(i => {
			const onClick = () => {
				onChange?.call({}, i.name);
				setOpened(false);
			};

			return (
				<button className={`${css['selector__color']}`}
				onClick={onClick} key={i.name} 
				style={{ background: '#' + i.color }} />
			);
		});
	};

	return (
		<div className={`${css['wrapper']} ${className}`} ref={ref}>
			<button className={`${css['cur-color']}`}
			style={{ background: getTagColorByName(value) }}
			onClick={() => setOpened(true)} />

			{opened && (
				<div className={`${css['selector']}`}>
					{getColors()}
				</div>
			)}
		</div>
	);
});