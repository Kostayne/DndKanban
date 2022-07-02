import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { StoreCtx } from "../../App";
import { FormNames } from "../../store/ui.store";
import { BaseForm } from "../BaseForm";
import css from './index.module.scss';

export const ViewFullTaskForm = observer(() => {	
	const store = useContext(StoreCtx);
	const task = store.uiStore.formTask;

	if (!task) {
		throw new Error('Form task is not set');
	}

	const handleClick = () => {
		store.uiStore.setActiveForm(FormNames.none);
	};

	return (
		<BaseForm name={task.name} actionName="OK"
		onAction={handleClick}>
			<span className={css['description']}>{task.description}</span>
		</BaseForm>
	);
});
