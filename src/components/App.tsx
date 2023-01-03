import React from 'react';
import CanvasProvider from '../contexts/canvas';
import ChestsProvider from '../contexts/chests';
import GameStatusProvider from '../contexts/gameStatus';
import { GAME_SIZE } from '../settings/constants';
import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <div style={{ position: 'relative', width: GAME_SIZE, height: GAME_SIZE }}>
        <CanvasProvider>
          <ChestsProvider>
            <GameStatusProvider>
              <Game />
            </GameStatusProvider>
          </ChestsProvider>
        </CanvasProvider>
      </div>
    </div>
  );
}

export default App;
