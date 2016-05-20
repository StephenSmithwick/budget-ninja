import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import TransactionActions from '../actions/TransactionActions';

import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
// import DatePicker from 'react-toolbox/lib/date_picker';
import DatePicker from 'material-ui/lib/date-picker/date-picker';


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
    const {transaction} = this.props;

    if(transaction) {
      return this.render_transaction();
    } else {
      return <span/>
    }
  }

  render_transaction() {
    const {transaction, actions, accounts} = this.props;
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
    const date = (label, property) => 
      <DatePicker hintText={label} 
                  floatingLabelText={label}
                  mode="landscape" 
                  value={transaction[property]}
                  onChange={(e,date) => actions.updateTransaction(transaction, {[property]: date})}/>

    console.log("transaction['date'] = %o", transaction['date'])
    console.log("moment(transaction['date']) = %o", moment(transaction['date']))
    console.log("moment(transaction['date']).valueOf() = %i", moment(transaction['date']).valueOf())
    console.log("new Date(moment(transaction['date']).valueOf()) = %o", new Date(moment(transaction['date']).valueOf()))

    return (
      <Dialog title={transaction.payee} 
              actions={<RaisedButton label="Done" primary={true} keyboardFocused={true} onClick={actions.unselectTransaction}/>} 
              open={true} 
              modal={true}>
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
  transaction: PropTypes.object.isRequired
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
