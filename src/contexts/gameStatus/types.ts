export interface IGameStatusContext {
  steps: number;
  updateSteps: () => void;

  dead: boolean;
  updateIsDead: () => void;

  winner: boolean;
  updateIsWinner: () => void;

}
