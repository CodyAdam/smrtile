import { useState } from 'react';
import SmallSquareButton from '../../common/smallSquareButton/SmallSquareButton';

export function TilesetCreation() {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    console.log('open');
    setShow(true);
  };

  const handleCancel = () => {
    console.log('cancel');
  };
  return (
    <>
      <SmallSquareButton onClick={handleOpen}>
        <div className={`icon icon-add`} />
      </SmallSquareButton>
      <div>
        <>
          <h1>CREATE A NEW TILESET</h1>
          <article>
            <h2>Tilesheet file import</h2>
          </article>
          <article>
            <h2>Tileset name</h2>
          </article>
          <article>
            <h2>Repetition grid</h2>
            <p>Tile size in pixel:</p>
          </article>
          <article>
            <h2>Thumbnail</h2>
          </article>
          <article>
            <h2>Display</h2>
          </article>
          <article>
            <h2>Tags</h2>
          </article>
          <article>
            <h2>Id</h2>
          </article>
        </>
      </div>
    </>
  );
}
