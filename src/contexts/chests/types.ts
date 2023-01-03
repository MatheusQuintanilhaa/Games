import { IPosition } from '../canvas/types';

export interface IChestsContext {
  totalChests: number;
  openedChests: {
    total: number;
    positions: IPosition[];
  };
  updateOpenedChests: (position: IPosition) => void;
}
