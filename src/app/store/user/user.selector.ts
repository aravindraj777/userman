// user.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.model';


const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(
  getUserFeatureState,
  (state) => state.users
);

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);
