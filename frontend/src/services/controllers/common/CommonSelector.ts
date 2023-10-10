import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const selectCommon = (state: RootState) => state.common;

export const selectLoading = createSelector(selectCommon, (common) => common.loading);
export const selectModalStatus = createSelector(selectCommon, (common) => common.ui.dialog);
