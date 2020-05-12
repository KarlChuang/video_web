import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Admin from '../components/Admin';
import { encrypt, decrypt } from '../utils/encrypt';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      videoFiles: [],
      password: cookies.get('password') || '',
      pass: cookies.get('pass') || 'error',
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handlePass = this.handlePass.bind(this);
  }

  async componentDidMount() {
    const { pass } = this.state;
    if (pass !== 'error') {
      await this.handlePass();
    }
  }

  async handlePass() {
    const res = await axios.get('/api/all_videos');
    const videoFiles = res.data;
    const { password } = this.state;

    const str = await decrypt(password, videoFiles);

    this.setState({
      videoFiles: JSON.parse(str),
    });
  }

  handleVideoChange(newVideo, idx) {
    this.setState(({ videoFiles }) => {
      const newFiles = [...videoFiles];
      newFiles[idx] = { ...newFiles[idx], ...newVideo };
      return {
        videoFiles: newFiles,
      };
    });
  }

  async handleSubmit() {
    const { videoFiles, password } = this.state;
    const timeInMs = Date.now();

    const data = await encrypt(password, JSON.stringify({
      time: timeInMs,
      data: videoFiles,
    }));

    await axios.post('/api/change_content/video', {
      data,
    });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  async handlePasswordSubmit() {
    const { password } = this.state;
    const timeInMs = Date.now();

    const data = await encrypt(password, JSON.stringify({ time: timeInMs }));

    const res = await axios.post('/api/admin/password', {
      data,
    });

    if (res.data.pass !== 'error') {
      await this.handlePass();
      const { cookies } = this.props;
      cookies.set('pass', res.data.pass, { path: '/admin', maxAge: 2 * 60 * 60 });
      cookies.set('password', password, { path: '/admin', maxAge: 2 * 60 * 60 });
    }

    this.setState(res.data);
  }

  render() {
    const {
      videoFiles,
      pass,
      password,
    } = this.state;
    return (
      <Admin
        videoFiles={videoFiles}
        handleVideoChange={this.handleVideoChange}
        handleSubmit={this.handleSubmit}
        pass={pass}
        password={password}
        handlePasswordChange={this.handlePasswordChange}
        handlePasswordSubmit={this.handlePasswordSubmit}
      />
    );
  }
}

AdminPage.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(AdminPage);
