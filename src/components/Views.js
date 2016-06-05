import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SwipeableViews from 'react-swipeable-views';

import Actions from '../actions/Actions';
import Accounts from './Accounts';
import Transactions from './Transactions';
import TransactionDetails from './TransactionDetails';
import TabViews from './TabViews';

import {Account, Money, Wallet} from './Icons';

function Views(props) {
  const {dispatch, tabs, active_tab} = props;
  const tab_index = tabs.indexOf(active_tab);
  const views = {
    accounts: <Accounts />,
    transactions: <Transactions/>,
    details: <TransactionDetails />
  }

  return (
    <div>
      <TabViews />
      <SwipeableViews
          index={tab_index}
          onChangeIndex={(i)=> {dispatch.activateTab(tabs[i])}}>
        {tabs.map( tab => views[tab])}
      </SwipeableViews>
    </div>
  )
}

Views.propTypes = {
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
)(Views)
