import { useAppDispatch } from '../../../app/hooks';
import { TagsDisplay } from '../../../common/tags/TagsDisplay';
import { TagInput } from '../../../common/tags/TagInput';
import { TextInput } from '../../../common/textInput/TextInput';
import { update, remove } from '../browserSlice';
import { Rule } from '../browserTypes';
import { Propertie } from '../../../common/propertie/Propertie';
import styles from './Panel.module.css';
import { SquareButton } from '../../../common/squareButton/SquareButton';

export function RulePanel({ selected }: { selected: Rule }) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h1>Rule</h1>
      <Propertie
        name='Name'
        about='The rule name have to:\n
          • start and end with a letter or digit\n
          • contain only letters, digits, [underscores], [dashes] and [spaces]\n
          • contain at least 2 characters and 25 at most'
      >
        <TextInput
          text={selected.name}
          onChange={(newName) => {
            dispatch(update({ target: selected, changes: { name: newName } }));
          }}
        />
      </Propertie>
      <Propertie name='Tags' about='Use tags to easily filter items\nDescription TODO'>
        <>
          <TagsDisplay
            tags={selected.tags}
            onChange={(newTags) => {
              dispatch(update({ target: selected, changes: { tags: newTags } }));
            }}
          />
          <TagInput
            className={styles.tagInput}
            tags={selected.tags}
            onChange={(newTags) => {
              dispatch(update({ target: selected, changes: { tags: newTags } }));
            }}
          />
        </>
      </Propertie>
      <Propertie name='Properties'>
        <input type='checkbox' name='' id='' />
      </Propertie>
      <SquareButton
        title='delete'
        onClick={() => {
          dispatch(remove(selected));
        }}
        icon='trash'
      />
    </div>
  );
}
