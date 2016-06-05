import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Actions from '../../actions/Actions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function SelectInput(props) {
  const {account_slug, transaction, label, property, options, dispatch} = props

  return (
    <span className="select-field {property} col-xs">
      <SelectField hintText={label}
                   floatingLabelText={label}
                   style={{width: '100%'}}
                   value={transaction.account_slug}
                   onChange={(e, i, value) => dispatch.updateTransaction(account_slug, transaction.id, {[property]: value})}>
        {options.map(options =>
          <MenuItem key={options.slug} value={options.slug} primaryText={options.name}/>
        )}
      </SelectField>
    </span>
  )
}

SelectInput.propTypes = {
  transaction: PropTypes.object.isRequired,
  account_slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(
  state => ({
    account_slug: state.views.selected.account_slug,
    transaction: state.transactions[state.views.selected.account_slug][state.views.selected.transaction_id]
  }),
  dispatch => ({
    dispatch: bindActionCreators(Actions, dispatch)
  })
)(SelectInput)
