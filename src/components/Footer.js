import React, { Component } from 'react';

export default function Footer() {
  return (
    <footer>
      <div id="footer-text-wrap" className="container">
        <p>
          Made in Sydney with <span id="heart">♥</span>
          by <a href="http://stephensmithwick.github.io">Stephen Smithwick.</a>
        </p>
        <p>Special thanks to <a href="http://www.davidtsai.codes">David Tsai</a>.</p>
      </div>
    </footer>
  );
}
