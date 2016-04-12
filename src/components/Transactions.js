import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import IconChooser from './IconChooser';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import {ActionAccountBalance} from 'material-ui/lib/svg-icons';

import TransactionActions from '../actions/TransactionActions';
import * as Icons from './Icons';

class Transactions extends Component {
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
    const {transactions, actions, accounts} = this.props;

    return (
      <List subheader="Transactions" insetSubheader={true}>
        {(transactions||[]).map(transaction => {
          const account = this.account(transaction);
          const currency = <span className='currency'>{account.currency}</span>

          return (<ListItem className='transaction' 
            leftAvatar={<Avatar icon={this.mainCategoryIcon(transaction)} />}
            primaryText={transaction.payee}>
            <span className='date'>{transaction.date}</span>
            <span className='description'>{transaction.description}</span>
            <span className='total'>{transaction.total} {currency}</span>
          </ListItem>)
        })}
      </List>
    );
  }
}

Transactions.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  state => ({
    accounts: state.accounts,
    transactions: state.transactions.collection,
    categories: state.categories
  }),
  dispatch => ({
    actions: bindActionCreators(TransactionActions, dispatch)
  })
)(Transactions)
