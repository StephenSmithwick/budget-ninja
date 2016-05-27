import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransactionActions from '../actions/TransactionActions';
import Accounts from '../components/Accounts';
import Transactions from '../components/Transactions';
import TransactionDetails from '../components/TransactionDetails';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Divider from 'material-ui/Divider';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const lightMuiTheme = getMuiTheme(lightBaseTheme);

export default class App extends Component {
  render() {
    const { actions, accounts } = this.props;

    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}><div className="main-app-container">
        <Header />
        <Accounts />
        <Divider inset={true} />
        <Transactions/>
        <TransactionDetails />
        <Footer />
      </div></MuiThemeProvider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    transactions: state.transactions.collection,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TransactionActions, dispatch)
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
