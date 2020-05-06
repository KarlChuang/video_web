import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import Customer from '../components/Customer';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get('/api/content');
    const resJson = res.data;
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

// CustomerPage.propTypes = {
// };

// CustomerPage.defaultProps = {
// };

export default CustomerPage;
