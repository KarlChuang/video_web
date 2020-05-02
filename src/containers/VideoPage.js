import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import Video from '../components/Video';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      pass: 'error',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.setVideoNode = this.setVideoNode.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
  }

  setVideoNode(node) {
    this.videoNode = node;
  }

  handlePasswordChange(password) {
    this.setState({
      password,
    });
  }

  async handlePasswordSubmit() {
    const { password } = this.state;
    const res = await fetch('/api/password', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    const { pass } = await res.json();
    this.setState({
      pass,
    });
    if (this.videoNode !== undefined) {
      this.videoNode.load();
    }
  }

  handleTimeout() {
    this.setState({
      pass: 'error',
      password: '',
    });
  }

  render() {
    const { password, pass } = this.state;
    return (
      <Video
        pass={pass}
        password={password}
        handlePasswordChange={this.handlePasswordChange}
        handlePasswordSubmit={this.handlePasswordSubmit}
        setVideoNode={this.setVideoNode}
        handleTimeout={this.handleTimeout}
      />
    );
  }
}

VideoPage.propTypes = {
};

VideoPage.defaultProps = {
};

export default VideoPage;
