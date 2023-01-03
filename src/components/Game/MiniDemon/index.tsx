import React from 'react';
import { IPosition } from '../../../contexts/canvas/types';
import useEnemyMoviment from '../../../hooks/useEnemyMoviment';
import { EDirections, HELMET_OFFSET, TILE_SIZE } from '../../../settings/constants';
import './MiniDemon.css';

interface IProps {
  initialPosition: IPosition;
}

function MiniDemon(props: IProps) {
  // const [direction, position] = [EDirections.LEFT, props.initialPosition];
  const { position, direction } = useEnemyMoviment(props.initialPosition);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y * TILE_SIZE - HELMET_OFFSET}px`,
        left: `${position.x * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE + HELMET_OFFSET,
        backgroundImage: `url(./assets/mini-demon.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px -${TILE_SIZE - HELMET_OFFSET}px`,
        animation: 'mini-demon-animation 1s steps(4) infinite',
        transform: `scaleX(${direction === EDirections.LEFT ? -1 : 1})`,
      }}
    />
  );
}

export default MiniDemon;
