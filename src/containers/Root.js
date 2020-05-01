import React, { Component } from 'react';
import styled from 'styled-components';

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
      account: 'LOGIN',
    };
  }

  render() {
    const { account } = this.state;
    return (
      <Rootwrapper>
        <Router
          account={account}
        />
      </Rootwrapper>
    );
  }
}

export default Root;
