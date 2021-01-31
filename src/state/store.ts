import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// Temp code for testing purposes
import { ActionType } from './action-types';

store.dispatch({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: 'text',
    },
});

store.dispatch({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: null,
        type: 'code',
    },
});
