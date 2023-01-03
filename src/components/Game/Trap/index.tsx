import React from 'react';
import { IPosition } from '../../../contexts/canvas/types';
import { TILE_SIZE } from '../../../settings/constants';
import './Trap.css';

interface IProps {
  position: IPosition;
}

function Trap(props: IProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${props.position.y * TILE_SIZE}px`,
        left: `${props.position.x * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundImage: `url(./assets/trap.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px 0px`,
        animation: 'trap-animation 1s steps(8) infinite',
      }}
    />
  );
}

export default Trap;
