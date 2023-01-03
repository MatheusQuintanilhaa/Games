import React, { createContext, PropsWithChildren, useState } from 'react';
import { INITIAL_CANVAS_MAP } from '../canvas/helpers';
import { ECanvas } from '../canvas/types';
import { IChestsContext } from './types';

const numberOfChests: number = Object.keys(INITIAL_CANVAS_MAP).reduce((prev, key) => {
  const { tile } = INITIAL_CANVAS_MAP[key];

  if (tile === ECanvas.CHEST) {
    return prev + 1;
  }

  return prev;
}, 0);

export const ChestsContext = createContext<IChestsContext>({
  totalChests: numberOfChests,
  openedChests: { total: 0, positions: [] },
  updateOpenedChests: () => null,
});

function ChestsProvider(props: PropsWithChildren<{}>) {
  const [chestsState, setChestsState] = useState<IChestsContext>({
    totalChests: 2,
    openedChests: {
      total: 0,
      positions: [],
    },
    updateOpenedChests: (position) => {
      setChestsState(prevState => ({
        ...prevState,
        openedChests: {
          total: prevState.openedChests.total + 1,
          positions: [...prevState.openedChests.positions, position],
        },
      }));
    },
  });

  return <ChestsContext.Provider value={chestsState}>{props.children}</ChestsContext.Provider>;
}

export default ChestsProvider;
