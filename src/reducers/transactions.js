import {UPDATE_TRANSACTION, SELECT_TRANSACTION, UNSELECT_TRANSACTION} from '../actions/Actions'
import update from 'react-addons-update'

const initialState = {
  hsbc_au: {
    1: {
      id: 1,
      account_slug: 'hsbc_au',
      date: "1983-01-01",
      description: "Test AU - 1",
      payee: "Coles",
      total: 80,
      tags: ['pending'],
      itemized: [
        {category_slug: 'luxory',  amount: 20 },
        {category_slug: 'grocery', amount: 60 }
      ]
    },
    2: {
      id: 2,
      account_slug: 'hsbc_au',
      date: "1982-12-28",
      description: "Test AU - 2",
      payee: "Woolworths",
      total: 120,
      tags: [],
      itemized: [
        {category_slug: 'luxory', amount: 30 },
        {category_slug: 3, amount: 40 }
      ]
    },
    4: {
      id: 4,
      account_slug: 'hsbc_au',
      date: "1982-12-16",
      description: "Test Australia",
      payee: "Woolworths",
      total: 110,
      tags: [],
      itemized: [
        {category_slug: 3, amount: 20 },
        {category_slug: 1, amount: 90 }
      ]
    }
  },
  wellsfargo: {
    3: {
      id: 3,
      account_slug: 'wellsfargo',
      date: "1982-12-16",
      description: "Test US",
      payee: "Amazon",
      total: 80,
      tags: [],
      itemized: [
        {category_slug: 2, amount: 80 }
      ]
    }
  }
}

function update_state(state, transaction, change) {
  const index = state.collection.findIndex( t => t.id == transaction.id)
  return (index == -1) ? state : update(state, change(index))
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
  case UPDATE_TRANSACTION:
    console.log([state, {
      [action.account_slug]: {
        [action.transaction_id]: {
          $merge: action.delta
        }
      }
    }])
    return update(state, {
      [action.account_slug]: {
        [action.transaction_id]: {
          $merge: action.delta
        }
      }
    });

  default:
    return state
  }
}
