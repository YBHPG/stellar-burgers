import { RootState } from './store';

export const userDataSelector = (globalState: RootState) =>
  globalState.user.user;
