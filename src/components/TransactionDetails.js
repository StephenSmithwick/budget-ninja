import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import TransactionActions from '../actions/TransactionActions';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';


class TransactionsDetails extends Component {
  constructor(props, context) {
    super(props, context);
  }

  mainCategory(transaction) {
    const max = transaction.itemized.reduce(
      (x,y) => x.amount > y.amount ? x : y,
      {amount: 0}
    )
    return this.lookupCategory(max);
  }

  mainCategoryIcon(transaction) {
    const category = this.mainCategory(transaction)
    const Icon = Icons[category.icon]
    return <Icon />
  }

  lookupCategory(item) {
    const {categories} = this.props;
    return categories.find(c => c.id === item.category_id) || {icon: 'Problem'};
  }

  account(transaction) {
    const {accounts} = this.props;
    return accounts.find((a) => a.id == transaction.account_id)
  }

  render() {
    const {transaction, actions, accounts} = this.props;
    if(!transaction) return null;

    const account = this.account(transaction);

    const select = (label, property, options) =>
      <SelectField hintText={label}
                   floatingLabelText={label}
                   value={transaction.account_id}
                   onChange={(e, i, value) => actions.updateTransaction(transaction, {[property]: value})}>
        {options.map(options =>
          <MenuItem key={options.id} value={options.id} primaryText={options.name}/>
        )}
      </SelectField>

    const text = (label, property) =>
      <TextField hintText={label}
                 floatingLabelText={label}
                 value={transaction[property]}
                 onChange={e => actions.updateTransaction(transaction, {[property]: e.target.value})}/>

    // const date = <DatePicker label={label} onChange={date => actions.updateTransaction(transaction, {[property]: date})} value={transaction.date} />
    const string2Date = (str) => new Date(moment(str, "YYYY-MM-DD"))
    const date2String = (date) => moment(date).format("YYYY-MM-DD")
    const date = (label, property) =>
      <DatePicker hintText={label}
                  floatingLabelText={label}
                  autoOk={true}
                  value={string2Date(transaction[property])}
                  onChange={(e,date) => actions.updateTransaction(transaction, {[property]: date2String(date)})}/>

    const ok = <RaisedButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={actions.unselectTransaction}
      />

    return (
        <Dialog
          title={transaction.payee}
          actions={ok}
          open={true}
          autoScrollBodyContent={true}
          onRequestClose={actions.unselectTransaction}
        >
          <div className='row'>{select('Account', 'account_id', accounts)}</div>
          <div className='row'>{text('Payee', 'payee')}</div>
          <div className='row'>{date('Date', 'date')}</div>
          <div className='row'>{text('Description', 'description')}</div>
          <div className='row'>{text('Total', 'total')} <span className='currency'>{account.currency}</span></div>
      </Dialog>
    );
  }
}

TransactionsDetails.propTypes = {
  transaction: PropTypes.object
};

export default connect(
  state => ({
    categories: state.categories,
    accounts: state.accounts,
    transaction: state.transactions.selected
  }),
  dispatch => ({
    actions: bindActionCreators(TransactionActions, dispatch)
  })
)(TransactionsDetails);
