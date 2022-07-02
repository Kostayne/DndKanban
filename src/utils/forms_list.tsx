import { ReactElement } from "react";
import { CreateGroupForm } from "../components/CreateGroupForm";
import { CreateTaskForm } from "../components/CreateTaskForm";
import { EditGroupForm } from "../components/EditGroupForm";
import { EditTaskForm } from "../components/EditTaskForm";
import { ViewFullGroupForm } from "../components/ViewFullGroup";
import { ViewFullTaskForm } from "../components/ViewFullTaskForm";
import { FormNames } from "../store/ui.store";

type FormInfo = {
	component: ReactElement;
	name: FormNames;
};

export const formsInfo: FormInfo[] = [
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