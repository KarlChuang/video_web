import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

import Video from '../components/Video';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      password: '',
      pass: cookies.get('pass') || 'error',
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
    const res = await axios.post('/api/password', { password });
    const { pass } = res.data;
    this.setState({
      pass,
    });
    const { cookies } = this.props;
    cookies.set('pass', pass, { path: '/video', maxAge: 2 * 60 * 60 });

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
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

VideoPage.defaultProps = {
};

export default withCookies(VideoPage);
