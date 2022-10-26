import { provider } from 'spotify';
import { playerReducer } from './player.slice'

export * from './player.slice'

export * from 'spotify';

export const reducers = {
  ...provider.reducers,
  player: playerReducer,
};