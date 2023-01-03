import React from 'react';
import { IPosition } from '../../../contexts/canvas/types';
import useEnemyMoviment from '../../../hooks/useEnemyMoviment';
import { DEMON_TILE_SIZE, EDirections, TILE_SIZE } from '../../../settings/constants';
import './Demon.css';

interface IProps {
  initialPosition: IPosition;
}

function Demon(props: IProps) {
  // const [direction, position] = [EDirections.LEFT, props.initialPosition];
  const { position, direction } = useEnemyMoviment(props.initialPosition);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y * TILE_SIZE}px`,
        left: `${position.x * TILE_SIZE}px`,
        width: DEMON_TILE_SIZE,
        height: DEMON_TILE_SIZE,
        backgroundImage: `url(./assets/demon.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px 0px`,
        animation: 'demon-animation 1s steps(4) infinite',
        transform: `scaleX(${direction === EDirections.LEFT ? -1 : 1})`,
        zIndex: 1,
      }}
    />
  );
}

export default Demon;
