import { User } from '../shared/models/user.model';
import { UserActions, UserActionTypes } from './user.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../index';

export interface State extends fromRoot.State {
    users: UserState;
}

export interface UserState {
    users: User[];
    newUser: User;
    error: string;
}

const initialState: UserState = {
    users: [],
    newUser: {
        id: null,
        userName: null,
        emailAddress: null,
        birthDate: null
    },
    error: ''
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUserFeatureState,
    state => state.users
);

export function reducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.LoadSuccess:
            return {
                ...state,
                users: action.payload,
                error: ''
            };
        case UserActionTypes.LoadFail:
            return {
                ...state,
                users: [],
                error: action.payload
            };
        case UserActionTypes.CreateUserSuccess:
            return {
                ...state,
                newUser: action.payload,
                error: ''
            };
        case UserActionTypes.CreateUserFail:
            return {
                ...state,
                newUser: {
                    id: null,
                    userName: null,
                    emailAddress: null,
                    birthDate: null
                },
                error: action.payload
            };
        default:
            return state;
    }
}
