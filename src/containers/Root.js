import React, { Component } from 'react';
import styled from 'styled-components';
import { CookiesProvider } from 'react-cookie';

import Router from '../components/Router';

const Rootwrapper = styled.div`
  width: inherit;
  height: inherit;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <CookiesProvider>
        <Rootwrapper>
          <Router />
        </Rootwrapper>
      </CookiesProvider>
    );
  }
}

export default Root;
