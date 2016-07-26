import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {accent_blue} from '../../variables';

import {TableRowColumn} from 'material-ui/Table';

import * as Icons from '../Icons';

class CategoryRowColumn extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const {categories, slug} = this.props;
    const category = categories.find(c => c.slug === slug);
    const Icon = Icons[category.icon];

    return (
      <TableRowColumn className="category">
        <Icon style={{height: '16px'}} color={accent_blue}/>
        {category.name}
      </TableRowColumn>
    )
  }
}

export default connect(
  state => ({
    categories: state.categories
  })
)(CategoryRowColumn)
