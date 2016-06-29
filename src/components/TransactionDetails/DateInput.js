import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../../actions/Actions';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

function DateInput(props) {
  const {account_slug, transaction, label, property, dispatch, className} = props
  const format = props.format || "YYYY-MM-DD"

  const string2Date = (str) => new Date(moment(str, format))
  const date2String = (date) => moment(date).format(format)

  return (
    <span className={`date-field ${property} ${className}`}>
      <DatePicker hintText={label}
                floatingLabelText={label}
                textFieldStyle={{width: '100%'}}
                autoOk={true}
                value={string2Date(transaction[property])}
                onChange={(e,date) => dispatch.updateTransaction(account_slug, transaction.id, {[property]: date2String(date)})}/>
    </span>
  )
}

DateInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  account_slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  format: PropTypes.string
};

export default connect(
  state => ({
    account_slug: state.views.selected.account_slug,
    transaction: state.transactions[state.views.selected.account_slug][state.views.selected.transaction_id]
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(DateInput)
