import { EDirections } from '../../settings/constants';
import { ECanvas, ICanvas, ICanvasMap, IConsequences, IPosition, IWalker } from './types';

export const INITIAL_CANVAS = getInitialCanvas();
function getInitialCanvas(): ICanvas {
  const {
    FLOOR: FL,
    WALL: WL,
    DOOR: DR,
    TRAP: TR,
    MINI_DEMON: MD,
    DEMON: DE,
    CHEST: CH,
    HERO: HE,
  } = ECanvas;

  return [
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, DR, DR, WL, WL, WL, WL, WL],
    [WL, FL, FL, WL, FL, FL, FL, FL, WL, FL, FL, FL, FL, FL, FL, FL, WL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, MD, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, CH, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, TR, FL, DE, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, FL, FL, FL, FL, CH, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, TR, FL, FL, FL, FL, FL, WL],
    [WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, MD, FL, WL],
    [WL, HE, WL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
    [WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL, WL],
  ];
}

export const INITIAL_CANVAS_MAP = getCanvasMap(INITIAL_CANVAS);
export function getCanvasMap(canvas: ICanvas): ICanvasMap {
  const map: ICanvasMap = {};
  for (let y = 0; y < canvas.length; y++) {
    const canvasY = canvas[y];

    for (let x = 0; x < canvasY.length; x++) {
      const canvasYX = canvas[y][x];
      const position = { x: x, y: y };
      const key = `${x}-${y}`;

      map[key] = { tile: canvasYX, position };
    }
  }

  return map;
};

export function handleWalk(direction: EDirections, position: IPosition): IPosition {
  switch (direction) {
    case EDirections.UP:
      return { x: position.x, y: position.y - 1 };

    case EDirections.RIGHT:
      return { x: position.x + 1, y: position.y };

    case EDirections.DOWN:
      return { x: position.x, y: position.y + 1 };

    case EDirections.LEFT:
      return { x: position.x - 1, y: position.y };
  }
}

export function checkNextMoveIsValid(
  canvas: ICanvas,
  position: IPosition,
  walker: IWalker
): IConsequences {
  const pos: ECanvas = canvas[position.y][position.x] as ECanvas;

  if (walker === 'Hero') {
    return getHeroValidMoves(pos);
  }

  return getEnemyValidMoves(pos);
}

function getHeroValidMoves(pos: ECanvas) {
  const { FLOOR, DOOR, TRAP, CHEST, MINI_DEMON, DEMON } = ECanvas;

  return {
    valid: [FLOOR, TRAP, CHEST, MINI_DEMON, DEMON].includes(pos),
    dead: [TRAP, MINI_DEMON, DEMON].includes(pos),
    chest: CHEST === pos,
    door: DOOR === pos,
  };
}

function getEnemyValidMoves(pos: ECanvas) {
  const { FLOOR, HERO } = ECanvas;

  return {
    valid: [FLOOR, HERO].includes(pos),
    dead: HERO === pos,
    chest: false,
    door: false,
  };
}
