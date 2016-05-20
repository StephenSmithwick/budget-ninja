export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION'
export const SELECT_TRANSACTION = 'SELECT_TRANSACTION'
export const UNSELECT_TRANSACTION = 'UNSELECT_TRANSACTION'

const TransactionActions = {
  updateTransaction: function(transaction, delta) {
    return {
      type: UPDATE_TRANSACTION,
      transaction: transaction,
      delta: delta
    }
  },
  selectTransaction: function(transaction) {
    return {
      type: SELECT_TRANSACTION,
      transaction: transaction
    }
  },
  unselectTransaction: function() {
    return {
      type: UNSELECT_TRANSACTION
    }
  }
}


export default TransactionActions
