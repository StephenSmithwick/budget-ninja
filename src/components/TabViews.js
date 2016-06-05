import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';

import {Account, Money, Wallet} from '../components/Icons';
import Actions from '../actions/Actions';

function TabViews(props) {
  const {dispatch, tabs, active_tab} = props;

  const tabDoms = {
    accounts: <Tab value='accounts' icon={<Account>Accounts</Account>} label="Accounts" onActive={() => dispatch.activateTab('accounts')}/>,
    transactions: <Tab value='transactions' icon={<Money>Transactions</Money>} label="Transactions" onActive={() => dispatch.activateTab('transactions')}/>,
    details: <Tab value='details' icon={<Wallet/>} label="Details" onActive={() => dispatch.activateTab('details')}/>
  }

  return (
    <Tabs value={active_tab}>
      {tabs.map( tab => tabDoms[tab])}
    </Tabs>
  )
}

TabViews .propTypes = {
  active_tabs: PropTypes.number,
  tabs: PropTypes.array
};

export default connect(
  state => ({
    tabs: state.views.tabs,
    active_tab: state.views.active_tab
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(TabViews)
