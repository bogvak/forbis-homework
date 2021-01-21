import { combineReducers, createStore } from 'redux';
import { SortMode } from "src/interfaces/SortMode.interface";

// Actions
export const storeSortMode = (sortMode: SortMode) => ({
    type: 'STORE_SORTMODE',
    payload: sortMode
});

// Reducers
export const root = (state = { sortMode: { field: "code", direction: "asc" }}, action) => {
    switch (action.type) {
        case 'STORE_SORTMODE':
            return { ...state, sortMode: action.payload };
        default:
            return state;
    }
};

export const reducers = combineReducers({
    root
});

// Store
export function configureStore(initialState = { sortMode: { field: "code", direction: "asc" } }) {
    const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
};

export const store = configureStore();