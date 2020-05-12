import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

import AdminVideo from '../components/AdminVideo';
import { encrypt } from '../utils/encrypt';

class AdminVideoPage extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      progress: 0,
      videoFile: undefined,
      videoName: 'Choose a file...',
      videoData: {
        filename: '',
        path: '',
        size: 0,
      },
      password: cookies.get('password') || '',
      pass: cookies.get('pass') || 'error',
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleVideoSubmit = this.handleVideoSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleVideoChange(e) {
    if (e.target.files[0] !== undefined) {
      this.setState({
        progress: 0,
        videoName: e.target.files[0].name,
        videoFile: e.target.files[0],
      });
    }
  }

  async handleVideoSubmit() {
    const { videoFile, password } = this.state;
    let res = await axios.get('/api/get_token');
    const { token } = res.data;
    const encToken = await encrypt(password, token);

    const form = new FormData();
    form.append('video', videoFile);
    form.append('token', encToken);
    res = await axios.post('/api/upload/video', form, {
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          progress: Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100),
        });
      },
    });
    const { filename, path, size } = res.data;
    this.setState({
      videoData: {
        filename,
        path,
        size,
      },
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
      const { cookies } = this.props;
      cookies.set('pass', res.data.pass, { path: '/admin', maxAge: 2 * 60 * 60 });
      cookies.set('password', password, { path: '/admin', maxAge: 2 * 60 * 60 });
    }

    this.setState(res.data);
  }

  render() {
    const {
      videoName,
      progress,
      videoData,
      pass,
      password,
    } = this.state;
    return (
      <AdminVideo
        progress={progress}
        videoName={videoName}
        videoData={videoData}
        handleVideoChange={this.handleVideoChange}
        handleVideoSubmit={this.handleVideoSubmit}
        pass={pass}
        password={password}
        handlePasswordSubmit={this.handlePasswordSubmit}
        handlePasswordChange={this.handlePasswordChange}
      />
    );
  }
}

AdminVideoPage.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

// AdminVideoPage.defaultProps = {
// };

export default withCookies(AdminVideoPage);
