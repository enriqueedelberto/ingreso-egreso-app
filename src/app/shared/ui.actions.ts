//Section 8 class 87: Creation reducers and actions with snippets

import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] isLoading');
export const stopLoading = createAction('[UI Component] stopLoading');