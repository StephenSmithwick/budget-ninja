import {ACTIVATE_TAB, SELECT_ACCOUNT, SELECT_TRANSACTION, UNSELECT_TRANSACTION} from '../actions/Actions'
import update from 'react-addons-update'

const initialState = {
  selected: {
    account_slug: null,
    transaction_id:  null,
  },
  active_tab: 'accounts',
  tabs: ['accounts']
}

export default function views(state = initialState, action) {
  switch (action.type) {
  case ACTIVATE_TAB:
    return update(state, {
      active_tab: {$set: action.tab}
    })

  case SELECT_ACCOUNT:
    return update(state, {
      selected: {
        account_slug: {$set: action.account_slug}
      },
      tabs: {$set: ['accounts', 'transactions']},
      active_tab: {$set: 'transactions'}
    })

  case SELECT_TRANSACTION:
    return update(state, {
      selected: {
        transaction_id: {$set: action.transaction_id}
      },
      tabs: {$set: ['accounts', 'transactions', 'details']},
      active_tab: {$set: 'details'}
    })

  case UNSELECT_TRANSACTION:
    return update(state, {
      selected: {
        transaction_id: {$set: null}
      },
      tabs: {$set: ['accounts', 'transactions']},
      active_tab: {$set: 'transactions'}
    })

  default:
    return state;
  }
}
