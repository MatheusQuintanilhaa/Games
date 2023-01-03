import React from 'react';
import { ECanvas, IPosition } from '../../../../contexts/canvas/types';
import { TILE_SIZE } from '../../../../settings/constants';

interface IProps {
  tileId: ECanvas;
  position: IPosition;
}
function Tile(props: IProps) {
  function getTileColor() {
    switch (props.tileId) {
      case ECanvas.FLOOR:
        return 'darkgray';

      case ECanvas.WALL:
        return 'yellow';

      case ECanvas.DOOR:
        return 'white';

      case ECanvas.TRAP:
        return 'chartreuse';

      case ECanvas.MINI_DEMON:
      case ECanvas.DEMON:
        return 'red';

      case ECanvas.CHEST:
        return 'cyan';

      case ECanvas.HERO:
        return 'magenta';
    }
  }

  const color = getTileColor();
  return (
    <div
      style={{
        position: 'absolute',
        top: `${props.position.y * TILE_SIZE}px`,
        left: `${props.position.x * TILE_SIZE}px`,
        border: `1px solid ${color}`,
        color: color,
        backgroundColor: 'transparent',
        width: TILE_SIZE,
        height: TILE_SIZE,
        fontSize: 32,
        zIndex: 2,
      }}
    >
      {props.tileId}
    </div>
  );
}

export default Tile;
