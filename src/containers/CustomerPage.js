import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import Customer from '../components/Customer';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  async componentDidMount() {
    const res = await fetch('/api/content');
    const resJson = await res.json();
    this.setState({
      content: resJson,
    });
  }

  render() {
    const { content } = this.state;
    return (
      <Customer
        content={content}
      />
    );
  }
}

CustomerPage.propTypes = {
};

CustomerPage.defaultProps = {
};

export default CustomerPage;
