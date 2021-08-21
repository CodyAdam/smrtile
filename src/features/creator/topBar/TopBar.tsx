import styles from './TopBar.module.css';
import { SquareButton } from '../../../common/squareButton/SquareButton';
import { useAppDispatch } from '../../../app/hooks';
import { undo, redo, remove } from '../../explorer/explorerSlice';
import { useAppSelector } from '../../../app/hooks';
import { selectedContentSelector } from '../../explorer/explorerSlice';

export function TopBar() {
  const selectedContent = useAppSelector(selectedContentSelector);
  const dispatch = useAppDispatch();

  let selectionInfo = null;
  if (selectedContent)
    selectionInfo = (
      <div className={styles.infoContainer}>
        <div>
          <h2>Name</h2>
          <p>{selectedContent.name}</p>
        </div>
        <div>
          <h2>ID</h2>
          <p>{selectedContent.id}</p>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      {selectionInfo}
      <div className={styles.spacer} />

      <SquareButton
        title='remove'
        onClick={() => {
          if (selectedContent) dispatch(remove(selectedContent));
        }}
        icon='trash'
      />
      <SquareButton
        title='undo'
        onClick={() => {
          dispatch(undo());
        }}
        icon='arrow-small-left'
      />
      <SquareButton
        title='redo'
        onClick={() => {
          dispatch(redo());
        }}
        icon='arrow-small-right'
      />
    </div>
  );
}
