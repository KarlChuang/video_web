import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Video from '../components/Video';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Video />
    );
  }
}

VideoPage.propTypes = {
};

VideoPage.defaultProps = {
};

export default VideoPage;
