import useInterval from '@use-it/interval';
import { useContext, useState } from 'react';
import { CanvasContext } from '../../contexts/canvas';
import { IPosition } from '../../contexts/canvas/types';
import { GameStatusContext } from '../../contexts/gameStatus';
import { EDirections } from '../../settings/constants';

export default function useEnemyMoviment(initialPositions: IPosition) {
  const { updateCanvas } = useContext(CanvasContext);
  const { updateIsDead } = useContext(GameStatusContext);

  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.LEFT);

  useInterval(move, 500);

  function move() {
    const directions = Object.values(EDirections);
    const random = Math.floor(Math.random() * directions.length);
    const keyDirection = directions[random];

    const movement = updateCanvas(keyDirection, position, 'Enemy');
    setPosition(movement.position);

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }

    if (movement.consequences.dead) {
      updateIsDead();
    }
  }

  return { position, direction };
}
