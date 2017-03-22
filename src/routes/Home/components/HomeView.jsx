import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './HomeView.scss';

export const HomeView = () => (
  <div>
    <div id='cover-image'>
      <h1 className='landing-text'>INVEST</h1>
      <h1 className='landing-text'>LIKE</h1>
      <h1 className='landing-text'>A PRO</h1>
      <div className='landing-buttons-container'>
        <RaisedButton className='landing-button' backgroundColor='transparent' label='Sign Up' />
        <RaisedButton className='landing-button' backgroundColor='transparent' label='Log In' />
      </div>
    </div>
  </div>
);

export default HomeView;
