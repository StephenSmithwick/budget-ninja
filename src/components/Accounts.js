import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import {Account} from './Icons';

export default class Accounts extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {accounts} = this.props;

    return (
      <div className="skeleton"><List className="container">
      <Subheader>Accounts</Subheader>
        {accounts.map((account, i) => {
          const currency = <span className='currency'>{account.currency}</span>;
          const avatar = <Avatar icon={<Account/>}/>;

          return (<ListItem className='account' key={i} leftAvatar={avatar}>
            <span className='row'>
              <span className='twelve columns'>
                <span className='name'>{account.name}</span>
                <span className='total'>{account.balance} {currency}</span>
              </span>
            </span>
          </ListItem>)
        })}
      </List></div>)
  }
}

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}
export default connect(mapStateToProps)(Accounts);
