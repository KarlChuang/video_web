import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminVideo from '../components/AdminVideo';

class AdminVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFile: undefined,
      videoName: '',
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleVideoNameChange = this.handleVideoNameChange.bind(this);
    this.handleVideoSubmit = this.handleVideoSubmit.bind(this);
  }

  handleVideoChange(e) {
    this.setState({
      videoFile: e.target.files[0],
    });
  }

  handleVideoNameChange(value) {
    this.setState({
      videoName: value,
    });
  }

  handleVideoSubmit() {
    const { videoName, videoFile } = this.state;
    const form = new FormData();
    form.append('video', videoFile);
    form.append('videoName', videoName);
    console.log(videoName);
    console.log(videoFile);
    fetch('/api/upload/video', {
      method: 'POST',
      body: form,
    });
  }

  render() {
    const { videoName } = this.state;
    return (
      <AdminVideo
        videoName={videoName}
        handleVideoChange={this.handleVideoChange}
        handleVideoNameChange={this.handleVideoNameChange}
        handleVideoSubmit={this.handleVideoSubmit}
      />
    );
  }
}

AdminVideoPage.propTypes = {
};

AdminVideoPage.defaultProps = {
};

export default AdminVideoPage;
