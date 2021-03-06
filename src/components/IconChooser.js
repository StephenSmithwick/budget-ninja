import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import * as Icons from './Icons';

export default function IconChooser(props) {
  const {accounts} = props;

  return (
    <GridList cols={6} cellHeight={40} style={{ height: 400, overflowY: 'auto'}}>
      {Object.keys(Icons).map(name =>
        <GridTile key={name} title={name} actionIcon={React.createElement(Icons[name])}/>
      )}
    </GridList>
  )
}
