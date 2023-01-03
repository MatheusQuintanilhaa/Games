import React, { PropsWithChildren, useEffect, useState } from 'react';
import { INITIAL_CANVAS_MAP } from '../../../contexts/canvas/helpers';
import { ECanvas, ICanvas } from '../../../contexts/canvas/types';
import { GAME_SIZE } from '../../../settings/constants';
import Chest from '../Chest';
import Demon from '../Demon';
import Hero from '../Hero';
import MiniDemon from '../MiniDemon';
import Trap from '../Trap';
import Door from './Door';
import GameStatus from './GameStatus';

interface IProps {
  canvas: ICanvas;
}

function Board(props: PropsWithChildren<IProps>) {
  const [enemies, setEnemies] = useState<(JSX.Element | null)[]>([]);

  useEffect(() => {
    renderEnemies();

    function renderEnemies() {
      const enemiesMap = Object.keys(INITIAL_CANVAS_MAP).map((key) => {
        const { tile, position } = INITIAL_CANVAS_MAP[key];

        if (tile === ECanvas.TRAP) {
          return <Trap key={key} position={position} />;
        }

        if (tile === ECanvas.MINI_DEMON) {
          return <MiniDemon key={key} initialPosition={position} />;
        }

        if (tile === ECanvas.DEMON) {
          return <Demon key={key} initialPosition={position} />;
        }

        if (tile === ECanvas.CHEST) {
          return <Chest key={key} position={position} />;
        }

        if (tile === ECanvas.HERO) {
          return <Hero key={key} initialPosition={position} />;
        }

        return null;
      }).filter(Boolean);

      setEnemies(enemiesMap);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <img src="./assets/tileset.gif" alt="Cenário" width={GAME_SIZE} height={GAME_SIZE} />

      <Door />
      <GameStatus />

      {props.children}
      {enemies}
    </>
  );
}

export default Board;
