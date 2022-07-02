import css from './home.module.scss';
import { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite';
import { StoreCtx } from '../App';
import { FormNames } from '../store/ui.store';
import { MenuButton } from '../components/MenuBtn';
import { TaskGroupList } from '../components/TaskGroupList';
import { CustomDragLayer } from '../components/CustomDragLayer';
import { printAuthorsInfo } from '../utils/authors_info';

export const HomePage = observer(() => {
    const store = useContext(StoreCtx);
    const curBoard = store.uiStore.curBoard;
    const groupsRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

    const onCreateGroupClick = () => {
        store.uiStore.setActiveForm(FormNames.createGroup);
    };

    const scrollToLeft = () => {
        const el = groupsRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        setTimeout(() => {
            el.scrollTo({
                left: maxScrollLeft + 500,
                behavior: 'smooth',
            });
        }, 100);
    }; 

    useEffect(() => {
        store.uiStore.onTaskCreatedCb = scrollToLeft;
    });

    const onDeleteAllClick = () => {
        store.tasksStore.deleteAll(store.uiStore);
    }

    return (
        <div className={css['page']}>
            <CustomDragLayer />
            <MenuButton onClick={onDeleteAllClick} className={css['delete-all-btn']}>Очистить данные</MenuButton>

            <div className={`${css['groups-block']}`} ref={groupsRef}>
                {curBoard.groups.length > 0 && (
                    <TaskGroupList className={`${css['groups']}`}
                    groups={curBoard.groups} />
                )}

                <MenuButton className={`${css['create-group']}`}
                onClick={onCreateGroupClick}>
                    Создать группу
                </MenuButton>
            </div>
        </div>
    );
});