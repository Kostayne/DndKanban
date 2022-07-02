import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { StoreCtx } from "../../App";
import { useSyntheticInput } from "../../hooks/synthetic_input.hook";
import { FormNames } from "../../store/ui.store";
import { ITag } from "../../types/tag.type";
import { BaseForm } from "../BaseForm";
import { TagsListInput } from "../TagListInput";
import { TextAreaInputField } from "../TextAreaInputField";
import { TextInputField } from "../TextInputField";
import css from './index.module.scss';

export const CreateTaskForm = observer(() => {
	const nameInp = useSyntheticInput();
	const descriptionInp = useSyntheticInput();
	const store = useContext(StoreCtx);
	const [tagInputStates, setTagInputStates] = useState<ITag[]>([]);

	const handleClick = () => {
		const g = store.uiStore.formTaskGroup;

		if (!g) {
			throw new Error('form task group is not set!');
		}

		if (!nameInp.value) {
			return;
		}

		store.tasksStore.createTask(g, {
			name: nameInp.value,
			description: descriptionInp.value,
			tags: tagInputStates
		});
		
		store.uiStore.setActiveForm(FormNames.none);
	};

	return (
		<BaseForm name="Создать задачу" actionName="Создать"
		onAction={handleClick}>
			<TextInputField {...nameInp} className={`${css['name-field']}`}
			name="Название" placeholder="Название вашей задачи" />

			<TextAreaInputField {...descriptionInp} className={`${css['description-field']}`}
			name="Описание" placeholder="Описание вашей задачи" />

			<TagsListInput inputStates={tagInputStates} className={css['tags']} 
			onChange={states => setTagInputStates(states)} />
		</BaseForm>
	);
});
