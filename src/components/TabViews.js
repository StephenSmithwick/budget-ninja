import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwipeableViews from 'react-swipeable-views';
import {Tabs, Tab} from 'material-ui/Tabs';

import {Account, Money, Wallet} from '../components/Icons';
import Actions from '../actions/Actions';

function TabViews(props) {
  const {dispatch, tabs, active_tab} = props;

  return (
    <Tabs value={active_tab}>
      <Tab value='accounts' label="Accounts"
        icon={<Account>Accounts</Account>} onActive={() => dispatch.activateTab('accounts')}/>
      <Tab value='transactions' label="Transactions"
        icon={<Money>Transactions</Money>} onActive={() => dispatch.activateTab('transactions')}/>
      <Tab value='details' label="Details"
        icon={<Wallet/>} onActive={() => dispatch.activateTab('details')}/>
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
