import React, { Component } from 'react';
import logo from '../images/ninja_small.png';

export default function Header() {
  return (
    <header>
      <h2><img src={logo} alt="ninja logo"/>Budget Ninja</h2>
    </header>
  )
}
