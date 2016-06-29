import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Actions from '../../actions/Actions';
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

  componentDidUpdate() {
    if(this._container) this._container.scrollIntoView()
  }

  render() {
    const {transaction, dispatch, accounts, account} = this.props;
    if(!transaction) return null;
    const account_options = _.map(accounts, (a) => a);

    return (
      <div ref={(ref) => this._container = ref}><List>
        <ListItem><span className="row">
          <SelectInput label='Account' property='account_id' className="col-xs" options={account_options}/>
          <TextInput label='Payee' property='payee' className="col-xs"/>
        </span></ListItem>
        <ListItem><span className="row">
          <DateInput label='Date' property='date' className="col-xs"/>
          <AmountInput label='Total' property='total' currency={account.currency} className="col-xs"/>
        </span></ListItem>
        <ListItem><span className="row">
          <TextInput  label='Description' property='description' className="col-xs"/>
        </span></ListItem>
        <ListItem><span className="row">
          <RaisedButton
            label="Done" primary={true} onTouchTap={dispatch.unselectTransaction}
            icon={<Check color={fullWhite} />} className="button col-xs" />
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
    account: state.accounts[state.views.selected.account_slug],
    categories: state.categories,
    accounts: state.accounts,
    transaction: state.transactions[state.views.selected.account_slug][state.views.selected.transaction_id]
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(TransactionsDetails)
