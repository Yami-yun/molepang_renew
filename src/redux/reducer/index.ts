import { combineReducers } from 'redux';
import comment from './commentReducer';
import game from './gameReducer';


const rootReducer = combineReducers({
    game,
    comment,
})

export default rootReducer;