import React, { useContext } from 'react';
import { ChestsContext } from '../../../../contexts/chests';
import { GAME_SIZE } from '../../../../settings/constants';

function Door() {
  const { openedChests, totalChests } = useContext(ChestsContext);

  return (
    <>
      {openedChests.total === totalChests && (
        <img
          style={{
            position: 'absolute',
            width: 190,
            height: 96,
            zIndex: 1,
            left: 577,
          }}
          src="./assets/opened-door.png"
          alt="Porta Aberta"
          width={GAME_SIZE}
          height={GAME_SIZE}
        />
      )}
    </>
  )
}

export default Door;
