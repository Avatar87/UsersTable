import './index.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import UserListContainer from './containers/UserListContainer';

export class App extends Component {
  
  render () {

    return (
      <Fragment>  
        <UserListContainer />
      </Fragment>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'));
