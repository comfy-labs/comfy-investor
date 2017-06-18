import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './HomeView.scss';

export const HomeView = () => (
  <div>
    <div id='cover-image'>
      <h1 className='home-text'>INVEST</h1>
      <h1 className='home-text'>LIKE</h1>
      <h1 className='home-text'>A PRO</h1>
      <div className='home-landing-buttons-container'>
        <RaisedButton className='home-landing-button' backgroundColor='transparent' label='Sign Up' />
        <RaisedButton className='home-landing-button' backgroundColor='transparent' label='Log In' />
      </div>
    </div>
  </div>
);

export default HomeView;
