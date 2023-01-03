import useEventListener from '@use-it/event-listener';
import { useContext, useState } from 'react';
import { CanvasContext } from '../../contexts/canvas';
import { IPosition } from '../../contexts/canvas/types';
import { ChestsContext } from '../../contexts/chests';
import { GameStatusContext } from '../../contexts/gameStatus';
import { EDirections } from '../../settings/constants';

export default function useHeroMoviment(initialPositions: IPosition) {
  const { updateCanvas } = useContext(CanvasContext);
  const { updateIsWinner, updateIsDead, updateSteps } = useContext(GameStatusContext);
  const { updateOpenedChests, openedChests, totalChests } = useContext(ChestsContext);

  const [position, setPosition] = useState<IPosition>(initialPositions);
  const [direction, setDirection] = useState<EDirections>(EDirections.RIGHT);

  useEventListener('keydown', move);

  function move(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key.indexOf('Arrow') === -1) {
      return;
    }

    const keyDirection = event.key.replace('Arrow', '').toUpperCase() as EDirections;
    const movement = updateCanvas(keyDirection, position, 'Hero');
    setPosition(movement.position);
    updateSteps();

    if (keyDirection === EDirections.LEFT || keyDirection === EDirections.RIGHT) {
      setDirection(keyDirection);
    }

    if (movement.consequences.dead) {
      updateIsDead();
    }

    if (movement.consequences.chest) {
      updateOpenedChests(movement.position);
    }

    if (totalChests === openedChests.total && movement.consequences.door) {
      updateIsWinner();
    }
  }

  return { position, direction };
}
