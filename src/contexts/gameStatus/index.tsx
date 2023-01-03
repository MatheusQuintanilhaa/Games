import React, { createContext, PropsWithChildren, useState } from 'react';
import { IGameStatusContext } from './types';

export const GameStatusContext = createContext<IGameStatusContext>({
  steps: 56,
  updateSteps: () => null,

  dead: false,
  updateIsDead: () => null,

  winner: false,
  updateIsWinner: () => null,
});

function GameStatusProvider(props: PropsWithChildren<{}>) {
  const [chestsState, setChestsState] = useState<IGameStatusContext>({
    steps: 56,
    updateSteps: () => {
      setChestsState(prevState => {
        const remainingSteps = prevState.steps - 1;

        return {
          ...prevState,
          steps: remainingSteps,
          dead: remainingSteps === -1,
        }
      });
    },

    dead: false,
    updateIsDead: () => {
      setChestsState(prevState => ({ ...prevState, dead: true }));
    },

    winner: false,
    updateIsWinner: () => {
      setChestsState(prevState => ({ ...prevState, winner: true }));
    },
  });

  return <GameStatusContext.Provider value={chestsState}>{props.children}</GameStatusContext.Provider>;
}

export default GameStatusProvider;
