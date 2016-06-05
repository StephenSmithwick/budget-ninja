import { combineReducers } from 'redux';
import accounts from './accounts';
import transactions from './transactions';
import categories from './categories';
import views from './views';

const rootReducer = combineReducers({
  accounts, transactions, categories, views
});

export default rootReducer;
