import React, { memo } from "react";
import { ITag } from "../../types/tag.type";
import { TagColors } from "../../types/tag_color.type";
import { TextButton } from "../Button";
import { CloseSvgIcon } from "../icons/Close";
import { TagColorInput } from "../TagColorInput";
import { TextInputField } from "../TextInputField";
import css from './index.module.scss';

interface TagInputProps {
	text: string;
	color: TagColors;
	textInputClassName?: string;
	tagId: string;

	onChange: (state: ITag) => void;
	onDelete?: () => void;
}

export const TagInput = memo(({
	color,
	tagId,
	text,
	textInputClassName = '',
	onChange,
	onDelete,
}: TagInputProps) => {
	const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;

		onChange?.call({}, {
			text: newText,
			color,
			id: tagId,
		});
	};

	const onColorChange = (newColor: TagColors) => {
		onChange?.call({}, {
			text,
			color: newColor,
			id: tagId
		});
	};

	return (
		<div className={`${css['wrapper']}`}>
			<TextInputField value={text} onChange={onTextChange}
			inputClassName={`${textInputClassName}`} />
			
			<TagColorInput value={color} className={`${css['color']}`}
			onChange={onColorChange} />

			{onDelete && (
				<TextButton className={`${css['delete']}`} onClick={onDelete}>
					<CloseSvgIcon className={`${css['delete__svg']}`} />
				</TextButton>
			)}
		</div>
	);
});
