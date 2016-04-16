import React, { Component } from 'react';
import logo from '../images/ninja_small.png';

export default class Header extends Component {
  render() {
    return (
      <header><h1><img src={logo} alt="ninja logo"/>Budget Ninja</h1></header>
    );
  }
}
