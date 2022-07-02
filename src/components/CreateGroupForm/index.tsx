import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreCtx } from "../../App";
import { useSyntheticInput } from "../../hooks/synthetic_input.hook";
import { FormNames } from "../../store/ui.store";
import { BaseForm } from "../BaseForm";
import { TextAreaInputField } from "../TextAreaInputField";
import { TextInputField } from "../TextInputField";
import css from './index.module.scss';

export const CreateGroupForm = observer(() => {
	const nameInp = useSyntheticInput();
	const descriptionInp = useSyntheticInput();
	const store = useContext(StoreCtx);
	const curBoard = store.uiStore.curBoard;

	const handleClick = () => {
		if (!nameInp.value) {
			return;
		}

		store.tasksStore.createGroup(curBoard, {
			description: descriptionInp.value,
			name: nameInp.value,
		});
		
		store.uiStore.setActiveForm(FormNames.none);
		store.uiStore.onTaskCreatedCb?.call({});
	};

	return (
		<BaseForm name="Создать группу задач" actionName="Создать группу"
		onAction={handleClick}>
			<TextInputField {...nameInp} className={`${css['name-field']}`}
			name="Название" placeholder="Название вашей группы" />

			<TextAreaInputField {...descriptionInp} className={`${css['description-field']}`}
			name="Описание" placeholder="Описание вашей группы" />
		</BaseForm>
	);
});
