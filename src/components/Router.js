import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Topbar from './Topbar';
import AdminPage from '../containers/AdminPage';
import CustomerPage from '../containers/CustomerPage';
import VideoPage from '../containers/VideoPage';

const Rootwrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

class Router extends Component {
  shouldComponentUpdate(prevProps) {
    const keys = Object.keys(prevProps);
    const { props } = this;
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (prevProps[key] !== props[key]) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { account } = this.props;
    return (
      <BrowserRouter>
        <Rootwrapper>
          <Topbar account={account} />
          <Route
            exact
            path="/"
            component={() => (
              <CustomerPage />
            )}
          />
          <Route
            path="/admin"
            component={() => (
              <AdminPage />
            )}
          />
          <Route
            path="/video"
            component={() => (
              <VideoPage />
            )}
          />
        </Rootwrapper>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  account: PropTypes.string.isRequired,
};

export default Router;
