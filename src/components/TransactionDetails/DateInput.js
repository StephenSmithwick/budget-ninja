import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TransactionActions from '../../actions/TransactionActions';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

function DateInput(props) {
  const {transaction, label, property, dispatch} = props
  const format = props.format || "YYYY-MM-DD"

  const string2Date = (str) => new Date(moment(str, format))
  const date2String = (date) => moment(date).format(format)

  return (
    <span className="date-field {property} col-xs">
      <DatePicker hintText={label}
                floatingLabelText={label}
                textFieldStyle={{width: '100%'}}
                autoOk={true}
                value={string2Date(transaction[property])}
                onChange={(e,date) => dispatch.updateTransaction(transaction, {[property]: date2String(date)})}/>
    </span>
  )
}

DateInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  format: PropTypes.string
};

export default connect(
  state => ({
    transaction: state.transactions.selected
  }),
  dispatch => ({
    dispatch: bindActionCreators(TransactionActions, dispatch)
  })
)(DateInput)
