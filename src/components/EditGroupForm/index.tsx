import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreCtx } from "../../App";
import { useSyntheticInput } from "../../hooks/synthetic_input.hook";
import { FormNames } from "../../store/ui.store";
import { BaseForm } from "../BaseForm";
import { TextAreaInputField } from "../TextAreaInputField";
import { TextInputField } from "../TextInputField";
import css from './index.module.scss';

export const EditGroupForm = observer(() => {
	const store = useContext(StoreCtx);
	const board = store.uiStore.curBoard;
	const group = store.uiStore.formTaskGroup;

	if (!group) {
		throw new Error('Form task is not set');
	}

	const nameInp = useSyntheticInput(group.name);
	const descriptionInp = useSyntheticInput(group.description);

	const handleClick = () => {
		if (!nameInp.value) {
			return;
		}

		store.tasksStore.editGroup(group, {
			description: descriptionInp.value,
			name: nameInp.value,
		});
		
		store.uiStore.setActiveForm(FormNames.none);
	};

	const onDelete = () => {
		store.tasksStore.deleteGroup(board, group.id);
		store.uiStore.setActiveForm(FormNames.none);
	};

	return (
		<BaseForm name="Изменить группу задач" actionName="Сохранить"
		onAction={handleClick} onDelete={onDelete}>
			<TextInputField {...nameInp} className={`${css['name-field']}`}
			name="Название" placeholder="Название вашей группы" />

			<TextAreaInputField {...descriptionInp} className={`${css['description-field']}`}
			name="Описание" placeholder="Описание вашей группы" />
		</BaseForm>
	);
});