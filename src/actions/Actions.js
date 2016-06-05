export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
export const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
export const UNSELECT_TRANSACTION = 'UNSELECT_TRANSACTION'
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'
export const ACTIVATE_TAB = 'ACTIVATE_TAB'

const Actions = {
  activateTab: function(tab) {
    return {
      tab: tab,
      type: ACTIVATE_TAB
    }
  },
  selectAccount: function(account_slug) {
    return {
      type: SELECT_ACCOUNT,
      account_slug: account_slug
    }
  },
  selectTransaction: function(transaction_id) {
    return {
      type: SELECT_TRANSACTION,
      transaction_id: transaction_id
    }
  },
  unselectTransaction: function() {
    return {
      type: UNSELECT_TRANSACTION
    }
  },
  updateTransaction: function(account_slug, transaction_id, delta) {
    console.log({account_slug, transaction_id, delta});
    return {
      type: UPDATE_TRANSACTION,
      account_slug: account_slug,
      transaction_id: transaction_id,
      delta: delta
    }
  }
}


export default Actions
