import css from './index.module.scss';
import { createContext, useEffect } from 'react'
import { TasksStore } from './store/tasks.store'
import { TaskGroupList } from './components/TaskGroupList';
import { boardsFixture } from './fixture/boards.fixture';
import { MainStore } from './store/main.store';
import { FormsSelector } from './components/Forms';
import { FormNames, UIStore } from './store/ui.store';
import { MenuButton } from './components/MenuBtn';
import { HomePage } from './pages/home.page';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { printAuthorsInfo } from './utils/authors_info';

// const tasksStore = new TasksStore({
//   boards: boardsFixture,
//   curBoard: boardsFixture[0]
// });

// const uiStore = new UIStore(FormNames.createGroup);

const mainStore = new MainStore({
  // tasksStore,
  // uiStore,
});

export const StoreCtx = createContext(mainStore); 

function App() {
  return (
    <StoreCtx.Provider value={mainStore}>
      <DndProvider backend={HTML5Backend}>
        <div className={`app ${css['content']}`}>
          <HomePage />
        </div>
      </DndProvider>
      <FormsSelector />
    </StoreCtx.Provider>      
  )
}

export default App;
