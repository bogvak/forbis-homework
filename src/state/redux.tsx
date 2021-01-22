import { combineReducers, createStore } from 'redux';
import { SortMode } from "src/interfaces/SortMode.interface";
import { LoadingState } from "src/interfaces/Analyses.types";

const defaultVal = {
    sortMode: { field: "code", direction: "asc" },
    analysesData: {
        data: undefined,
        ldState: LoadingState.Idle,
        url: ""
    }
};

// Actions
export const storeSortMode = (sortMode: SortMode) => ({
    type: 'STORE_SORTMODE',
    payload: sortMode
});

export const storeAnalysesData = (analysesData: Record<string, unknown>) => ({
    type: 'STORE_ANALYSES',
    payload: analysesData
});

// Reducers
export const root = (state = defaultVal, action) => {
    switch (action.type) {
        case 'STORE_SORTMODE':
            return { ...state, sortMode: action.payload };
        case 'STORE_ANALYSES':
            return { ...state, analysesData: action.payload };
        default:
            return state;
    }
};

export const reducers = combineReducers({
    root
});

// Store
export function configureStore(initialState = {}): any {
    const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}

export const store = configureStore();