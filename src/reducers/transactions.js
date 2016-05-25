import {UPDATE_TRANSACTION, SELECT_TRANSACTION, UNSELECT_TRANSACTION} from '../actions/TransactionActions'
import update from 'react-addons-update'

const initialState = {
  selected: null,
  collection: [{
      id: 1,
      account_id: 2,
      date: "1-1-1983",
      description: "Test AU - 1",
      payee: "Coles",
      total: 80,
      tags: ['pending'],
      itemized: [
        {category_id: 2, amount: 20 },
        {category_id: 1, amount: 60 }
      ]
    }, {
      id: 2,
      account_id: 2,
      date: "28-12-1982",
      description: "Test AU - 2",
      payee: "Woolworths",
      total: 120,
      tags: [],
      itemized: [
        {category_id: 1, amount: 30 },
        {category_id: 3, amount: 40 }
      ]
    }, {
      id: 3,
      account_id: 1,
      date: "16-12-1982",
      description: "Test US",
      payee: "Amazon",
      total: 80,
      tags: [],
      itemized: [
        {category_id: 2, amount: 80 }
      ]
    }, {
      id: 4,
      account_id: 2,
      date: "16-12-1982",
      description: "Test Australia",
      payee: "Woolworths",
      total: 110,
      tags: [],
      itemized: [
        {category_id: 3, amount: 20 },
        {category_id: 1, amount: 90 }
      ]
    }
  ]
}

function update_state(state, transaction, change) {
  const index = state.collection.findIndex( t => t.id == transaction.id)
  return (index == -1) ? state : update(state, change(index))
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
  case UPDATE_TRANSACTION:
    return update_state(state, action.transaction,  function(i) {
      const updated_transaction = update(state.collection[i], {$merge: action.delta})
      return {
        selected: {$set: updated_transaction},
        collection: { $splice: [[i, 1, updated_transaction]] }
      }
    })

  case SELECT_TRANSACTION:
    return update_state(state, action.transaction, i => ({
      selected: {$set: action.transaction}
    }))

  case UNSELECT_TRANSACTION:
    return update(state, {selected: {$set: null}})

  default:
    return state
  }
}
