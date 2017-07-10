import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <Toolbar className='header'>
        <ToolbarGroup firstChild>
          <FlatButton className='header-title' href='/' label='Comfy Investor' />
        </ToolbarGroup>
        <ToolbarGroup>
          <TextField hintText='Ex: AAPL' underlineFocusStyle={{ borderColor: '#1E392A' }} />
          <IconButton href='/chart'>
            <Search />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
};

export default CoreLayout;
