import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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


export default class Accounts extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {accounts} = this.props;

    return (
      <List subheader="Accounts" insetSubheader={true}>
        {accounts.map((account) => (
          <ListItem
            leftAvatar={<Avatar icon={<ActionAccountBalance />} />}
            primaryText={account.name}
            secondaryText={`${account.balance} ${account.currency}`}
          />
        ))}
      </List>
    );
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
