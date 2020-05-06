import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

import AdminPage from '../containers/AdminPage';
import AdminVideoPage from '../containers/AdminVideoPage';
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
    return (
      <BrowserRouter>
        <Rootwrapper>
          <Route
            exact
            path="/"
            component={() => (
              <CustomerPage />
            )}
          />
          <Route
            path="/video"
            component={() => (
              <VideoPage />
            )}
          />
          <Route
            exact
            path="/admin"
            component={() => (
              <AdminPage />
            )}
          />
          <Route
            path="/admin/upload_video"
            component={() => (
              <AdminVideoPage />
            )}
          />
        </Rootwrapper>
      </BrowserRouter>
    );
  }
}

// Router.propTypes = {
// };

export default Router;
