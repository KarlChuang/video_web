import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Customer from '../components/Customer';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Customer />
    );
  }
}

CustomerPage.propTypes = {
};

CustomerPage.defaultProps = {
};

export default CustomerPage;
