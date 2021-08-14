import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './Browser.module.css';
import { SquareButton } from '../../common/squareButton/SquareButton';
import {
  addRule,
  addSmartTile,
  addTileset,
  rulesSelector,
  smartTilesSelector,
  tilesetsSelector,
  selectedSelector,
  select,
} from './browserSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Rule, SmartTile, Tileset } from './browserTypes';
import { BrowsingGroup } from '../../common/browsingGroup/BrowsingGroup';
import { Card } from '../../common/card/Card';

export function Browser() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectedSelector);

  const rules = useAppSelector(rulesSelector);
  let rulesContent = null;
  if (rules)
    rulesContent = rules.map((rule: Rule) => {
      const isSelected = !!selected && selected.type === rule.type && selected.id === rule.id;
      return (
        <Card
          key={rule.id}
          object={rule}
          selected={isSelected}
          onClick={() => {
            dispatch(select(rule));
          }}
        />
      );
    });

  const smartTiles = useAppSelector(smartTilesSelector);
  let smartTilesContent = null;
  if (smartTiles)
    smartTilesContent = smartTiles.map((smartTile: SmartTile) => {
      const isSelected = !!selected && selected.type === smartTile.type && selected.id === smartTile.id;
      return (
        <Card
          key={smartTile.id}
          object={smartTile}
          selected={isSelected}
          onClick={() => {
            dispatch(select(smartTile));
          }}
        />
      );
    });

  const tilesets = useAppSelector(tilesetsSelector);
  let tilesetsContent = null;
  let tilesetsPreview = null;
  if (tilesets) {
    tilesetsContent = tilesets.map((tileset: Tileset, index) => {
      const isSelected = !!selected && selected.type === tileset.type && selected.id === tileset.id;
      return (
        <Card
          key={tileset.id}
          object={tileset}
          selected={isSelected}
          onClick={() => {
            dispatch(select(tileset));
          }}
        />
      );
    });
  }

  const [width, setWidth] = useState(300);
  let lastWidth = width;
  let lastPos: number = 0;

  function handleDragStart(e: React.MouseEvent<HTMLDivElement>) {
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    lastPos = e.clientX;
    lastWidth = width;
  }

  function handleDragEnd() {
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  }

  function handleDragMove(e: MouseEvent) {
    lastWidth = lastWidth + e.clientX - lastPos;
    setWidth(lastWidth);
    lastPos = e.clientX;
  }

  return (
    <div className={styles.container} style={{ width: `${width}px` }}>
      <div className={styles.title}>
        <span>BROWSER</span>
        <SquareButton icon='tag' onClick={() => {}} title='filter' />
      </div>
      <div className={styles.scrollable}>
        <BrowsingGroup
          title='rules'
          onAdd={() => {
            dispatch(addRule(nanoid()));
          }}
        >
          {rulesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='smart tiles'
          onAdd={() => {
            dispatch(addSmartTile(nanoid()));
          }}
        >
          {smartTilesContent}
        </BrowsingGroup>
        <BrowsingGroup
          title='tilesets'
          onAdd={() => {
            dispatch(addTileset(nanoid()));
          }}
        >
          {tilesetsContent}
          {tilesetsPreview}
        </BrowsingGroup>
      </div>
      <div className={styles.resizeBar} onMouseDown={handleDragStart}></div>
    </div>
  );
}
