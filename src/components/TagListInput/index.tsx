import { memo } from "react";
import { ITag } from "../../types/tag.type";
import { TagColors } from "../../types/tag_color.type";
import { TextButton } from "../Button";
import { PlusIconSvg } from "../icons/Plus";
import { TagInput} from "../TagInput";
import css from './index.module.scss';
import * as uuid from 'uuid';

interface TagsListInputProps {
	inputStates: ITag[];
	className?: string;
	onChange?: (inputStates: ITag[]) => void;
}

export const TagsListInput = memo(({
	inputStates: tags,
	className = '',
	onChange,
}: TagsListInputProps) => {
	const getInputs = () => {
		return tags.map((t, i) => {
			const localOnChange = (newState: ITag) => {
				const newInputStates = [...tags];
				newInputStates[i] = newState;
				onChange?.call({}, newInputStates);
			};

			const onDelete = () => {
				const newInputStates = [...tags];
				newInputStates.splice(i, 1);
				onChange?.call({}, newInputStates);
			};
			
			return (
				<TagInput {...t} key={i} onChange={localOnChange}
				textInputClassName={css['text-input']} onDelete={onDelete}
				tagId={t.id} />
			);
		});
	};

	const onCreateTag = () => {
		const newInputStates = [...tags];
		newInputStates.push({
			color: TagColors.gray,
			text: '',
			id: uuid.v4()
		});

		onChange?.call({}, newInputStates);
	};

	return (
		<div className={`${css['wrapper']} ${className}`}>
			<div className={`${css['headline-block']}`}>			
				<span className={`${css['tags-headline']}`}>Название тега</span>
				<span className={`${css['color-headline']}`}>Цвет</span>
			</div>

			<div className={`${css['inputs']}`}>
				{getInputs()}
			</div>

			<TextButton className={css['create-btn']} onClick={onCreateTag}>
				<PlusIconSvg className={css['create-btn__svg']} />
			</TextButton>
		</div>
	);
});
