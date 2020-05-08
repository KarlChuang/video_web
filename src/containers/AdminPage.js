import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Admin from '../components/Admin';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFiles: [],
    };
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get('/api/all_videos');
    const videoFiles = res.data;
    this.setState({
      videoFiles,
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
    const { videoFiles } = this.state;
    await axios.post('/api/change_content/video', videoFiles);
  }

  render() {
    const { videoFiles } = this.state;
    return (
      <Admin
        videoFiles={videoFiles}
        handleVideoChange={this.handleVideoChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// AdminPage.propTypes = {
// };

// AdminPage.defaultProps = {
// };

export default AdminPage;
