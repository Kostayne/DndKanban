import { observer } from "mobx-react-lite";
import { ReactNode, useContext } from "react";
import { StoreCtx } from "../../App";
import { FormNames } from "../../store/ui.store";
import { Banner } from "../Banner";
import { CreateGroupForm } from "../CreateGroupForm";
import { CreateTaskForm } from "../CreateTaskForm";
import { EditGroupForm } from "../EditGroupForm";
import { EditTaskForm } from "../EditTaskForm";
import { ViewFullGroupForm } from "../ViewFullGroup";
import { ViewFullTaskForm } from "../ViewFullTaskForm";

export const FormsSelector = observer(() => {
	const store = useContext(StoreCtx);
	const uiStore = store.uiStore;
	const activeForm = store.uiStore.activeForm;

	if (activeForm == FormNames.none) {
		return null;
	}

	type FormInfo = {
		component: ReactNode;
		name: FormNames;
	};

	const forms: FormInfo[] = [
		{
			component: (
				<CreateGroupForm />
			),

			name: FormNames.createGroup,
		},

		{
			component: (
				<CreateTaskForm />
			),

			name: FormNames.createTask,
		},

		{
			component: (
				<EditGroupForm />
			),

			name: FormNames.editGroup,
		},

		{
			component: (
				<EditTaskForm />
			),

			name: FormNames.editTask,
		},

		{
			component: (
				<ViewFullTaskForm />
			),

			name: FormNames.fullTask
		},

		{
			component: (
				<ViewFullGroupForm />
			),

			name: FormNames.fullGroup
		}
	];

	const form = forms.find(f => f.name == activeForm);
	if (!form) {
		throw new Error('Can not find form binded to ' + activeForm);
	}

	const onClickOutside = () => {
		uiStore.setActiveForm(FormNames.none);
	};

	return (
		<Banner onClickOutside={onClickOutside}>
			{form.component}
		</Banner>
	);
});