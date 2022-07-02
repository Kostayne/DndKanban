import { makeAutoObservable } from "mobx";
import { TasksStore } from "./tasks.store";
import { UIStore } from "./ui.store";

interface MainStoreConstructorOptions {
	tasksStore?: TasksStore;
	uiStore?: UIStore;	
}

export class MainStore {
	tasksStore: TasksStore;
	uiStore: UIStore;

	constructor(options?: MainStoreConstructorOptions) {
		this.tasksStore = options?.tasksStore || new TasksStore();
		this.uiStore = options?.uiStore || new UIStore(this.tasksStore);

		makeAutoObservable(this);
	}
}