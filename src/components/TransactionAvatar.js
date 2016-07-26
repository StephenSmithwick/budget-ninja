import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Avatar from 'material-ui/Avatar';

import * as Icons from './Icons';

function TransactionAvatar(props) {
  const {transaction, categories} = props;

  const max = transaction.itemized.reduce(
    (x,y) => x.amount > y.amount ? x : y,
    {amount: 0}
  )
  const category = categories.find(c => c.slug === max.category_slug) || {icon: 'Problem'};

  const Icon = Icons[category.icon]
  const style = {
    top: '50%',
    transform: 'translateY(-50%)',
    position: 'absolute',
    left: '16px' // TODO: Is this the best way to style a custom Avatar Component?
  }

  return <Avatar icon={<Icon />} style={style} />
}

TransactionAvatar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  transaction: PropTypes.object.isRequired
};

export default connect(
  state => ({ categories: state.categories })
)(TransactionAvatar)
