import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import Actions from '../actions/Actions';
import {Account} from './Icons';

export default function Accounts(props) {
  const {accounts, dispatch} = props;

  return (
    <List>
      {_.map(accounts, (account, i) => {
        const currency = <span className='currency'>{account.currency}</span>;
        const accountIcon = <Avatar icon={<Account/>}/>;
        function selectAccount() { dispatch.selectAccount(account.slug) }

        return (<ListItem onClick={selectAccount} className='account' key={i} leftAvatar={accountIcon}>
          <span className='row'>
            <span className='col-xs'>
              <span className='name'>{account.name}</span>
            </span>
            <span className='col-xs'>
              <span className='total'>{account.balance} {currency}</span>
            </span>
          </span>
        </ListItem>)
      })}
    </List>
  )
}

Accounts.propTypes = {
  accounts: PropTypes.object.isRequired
};

export default connect(
  state => ({
    accounts: state.accounts
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(Accounts);
