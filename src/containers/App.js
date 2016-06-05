import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions/Actions';
import Views from '../components/Views';
import Footer from '../components/Footer';
import Header from '../components/Header';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const colors = {
  bg_color_light: '#f1f2f0',
  bg_color_dark: '#026873',
  accent_blue: '#37bbe4',
  accent_gray: '#e1e0dd',
  accent_black: '#35342f',
  accent_orange: '#ec6b2d',
  accent_red: '#dd6464',
  white: '#fff',
  gray: '#ccc',
  black: '#111'
}

const muiTheme = getMuiTheme({
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.bg_color_dark,
    primary2Color: colors.accent_blue,
    primary3Color: colors.accent_gray,
    accent1Color: colors.accent_orange,
    accent2Color: colors.accent_red,
    accent3Color: colors.accent_red,
    textColor: colors.black,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.gray,
    disabledColor: fade(colors.gray, 0.3),
    pickerHeaderColor: colors.accent_blue,
    clockCircleColor: fade(colors.gray, 0.07),
    shadowColor: colors.black,
  }
});

const ninjaMuiTheme = getMuiTheme(muiTheme);

// style={{'background-color': '#026873', 'color': '#ffffff'}}
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ninjaMuiTheme}>
        <div className="container">
          <Header/>
          <Views/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, null)(App);
