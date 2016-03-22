import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../actions/TransactionActions';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class TransactionsDetails extends Component {
  constructor(props, context) {
    super(props, context);
  }

  mainCategory(expense) {
    return {name: "test"};
    const max = expense.itemized.reduce((x,y) =>
      x.amount > y.amount ? x : y
    );
    return lookupCategory(max);
  }

  lookupCategory(item) {
    const {categories} = this.props;
    return categories.find((c) => c.id == item.category_id);
  }

  account(expense) {
    return {name: "test"};
    const {accounts} = this.props;
    return accounts.find((a) => a.id == expense.account_id)
  }

  render() {
    const {transaction, actions} = this.props;

    const actionsButtons = [
      <FlatButton
        label="Cancel"
        secondary={true}
      />,
      <FlatButton
        label="Submit"
        primary={true}
      />,
    ];

    return (
      <Dialog
          title="Dialog With Custom Width"
          actions={actionsButtons}
          modal={true}
          contentStyle={{ width: '100%', maxWidth: 'none' }}
          open={transaction}
        >
          This dialog spans the entire width of the screen.
        </Dialog>
    );
  }
}

TransactionsDetails.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default connect(
  state => ({
    transaction: state.transactions.selected
  }),
  dispatch => ({
    actions: bindActionCreators(TransactionActions, dispatch)
  })
)(TransactionsDetails);
