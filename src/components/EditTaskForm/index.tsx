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

export const EditTaskForm = observer(() => {
	const store = useContext(StoreCtx);
	const group = store.uiStore.formTaskGroup;
	const task = store.uiStore.formTask;
	
	if (!group) {
		throw new Error('Form group is not set!');
	}

	if (!task) {
		throw new Error('Form task is not set!');
	}
	
	const nameInp = useSyntheticInput(task.name);
	const descriptionInp = useSyntheticInput(task.description);

	const [tagInputStates, setTagInputStates] = useState<ITag[]>(task.tags);

	const handleClick = () => {
		const t = store.uiStore.formTask;

		if (!t) {
			throw new Error('form task group is not set!');
		}

		if (!nameInp.value) {
			return;
		}

		const validatedTags = tagInputStates.filter(tag => tag.text);

		store.tasksStore.editTask(t, {
			name: nameInp.value,
			description: descriptionInp.value,
			tags: validatedTags,
		});
		
		store.uiStore.setActiveForm(FormNames.none);
	};

	const onDeleteClick = () => {
		store.tasksStore.deleteTask(group, task.id);
		store.uiStore.setActiveForm(FormNames.none);
	};

	return (
		<BaseForm name="Редактировать задачу" actionName="Сохранить"
		onAction={handleClick} onDelete={onDeleteClick}>
			<div className={css['top-block']}>
				<TextInputField {...nameInp} className={`${css['name-field']}`}
				name="Название" placeholder="Название вашей задачи" />	
			</div>

			<TextAreaInputField {...descriptionInp} className={`${css['description-field']}`}
			name="Описание" placeholder="Описание вашей задачи" />

			<TagsListInput inputStates={tagInputStates} className={css['tags']} 
			onChange={states => setTagInputStates(states)} />
		</BaseForm>
	);
});
