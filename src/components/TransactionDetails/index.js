import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../../actions/TransactionActions';
import {Check} from '../Icons';
import SelectInput from './SelectInput'
import TextInput from './TextInput'
import AmountInput from './AmountInput'
import DateInput from './DateInput'

import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {fullWhite, blue500} from 'material-ui/styles/colors';

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

  componentDidUpdate() {
    if(this._container) this._container.scrollIntoView()
  }

  render() {
    const {transaction, dispatch, accounts} = this.props;
    if(!transaction) return null;

    const account = this.account(transaction);

    return (
      <div ref={(ref) => this._container = ref}><List>
          <Subheader>{transaction.payee}</Subheader>
          <ListItem><span className="row">
            <SelectInput label='Account' property='account_id' options={accounts}/>
            <TextInput label='Payee' property='payee'/>
          </span></ListItem>
          <ListItem><span className="row">
            <DateInput label='Date' property='date'/>
            <AmountInput label='Total' property='total' currency={account.currency}/>
          </span></ListItem>
          <ListItem><span className="row">
            <TextInput  label='Description' property='description'/>
          </span></ListItem>
          <ListItem><span className="row">
              <RaisedButton
                label="Done"
                primary={true}
                icon={<Check color={fullWhite} />}
                className="col-xs"
                onTouchTap={dispatch.unselectTransaction}
              />
          </span></ListItem>
      </List></div>
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
    dispatch: bindActionCreators(TransactionActions, dispatch)
  })
)(TransactionsDetails)
