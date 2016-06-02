import React, { Component } from 'react';
import logo from '../images/ninja_small.png';

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1><img src={logo} alt="ninja logo"/>Budget Ninja</h1>
      </div>
    </header>
  )
}
