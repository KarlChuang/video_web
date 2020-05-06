import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import AdminVideo from '../components/AdminVideo';

class AdminVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      videoFile: undefined,
      videoName: 'Choose a file...',
      videoData: {
        filename: '',
        path: '',
        size: 0,
      },
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleVideoSubmit = this.handleVideoSubmit.bind(this);
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
    const { videoFile } = this.state;
    const form = new FormData();
    form.append('video', videoFile);
    const res = await axios.post('/api/upload/video', form, {
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

  render() {
    const { videoName, progress, videoData } = this.state;
    return (
      <AdminVideo
        progress={progress}
        videoName={videoName}
        videoData={videoData}
        handleVideoChange={this.handleVideoChange}
        handleVideoSubmit={this.handleVideoSubmit}
      />
    );
  }
}

// AdminVideoPage.propTypes = {
// };

// AdminVideoPage.defaultProps = {
// };

export default AdminVideoPage;
