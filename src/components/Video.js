import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Pagewrapper = styled.div`
  width: 100%;
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PasswordDiv = styled.div`
  background-color: #272727;
  width: 100%;
  height: 100%;
  position: fixed;
  flex-direction: row;
  align-items: center;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  display: ${({ pass }) => ((pass === 'error') ? '' : 'none')};
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
`;

const InputTxt = styled.div`
  color: white;
  margin-right: 20px;
`;

const InputBox = styled.input`
  margin-right: 20px;
  flex-grow: 1;
  font-size: 15px;
`;

const Button = styled.button`
  border-radius: 5px;
  border: 0;
`;

const Video = ({
  pathname,
  pass,
  password,
  handlePasswordChange,
  handlePasswordSubmit,
  setVideoNode,
  handleTimeout,
}) => {
  const filename = pathname.split('video/')[1].split('/')[0];
  return (
    <Pagewrapper>
      <PasswordDiv pass={pass}>
        <PasswordBox>
          <InputTxt>密碼</InputTxt>
          <InputBox value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
          <Button onClick={handlePasswordSubmit}>提交</Button>
        </PasswordBox>
      </PasswordDiv>
      <video
        onError={() => {
          if (pass !== 'error') {
            alert('Timeout, plaese enter password again.');
            handleTimeout();
          }
        }}
        ref={(node) => setVideoNode(node)}
        id="my-video"
        className="video-js"
        controls
        preload="auto"
        width="100%"
        height="600px"
      >
        <source src={`/api/video/${filename}/${pass}`} type="video/mp4" />
      </video>
    </Pagewrapper>
  );
};

const VideoRouter = withRouter(({
  location,
  pass,
  password,
  handlePasswordChange,
  handlePasswordSubmit,
  setVideoNode,
  handleTimeout,
}) => (
  <Video
    pathname={location.pathname}
    pass={pass}
    password={password}
    handlePasswordChange={handlePasswordChange}
    handlePasswordSubmit={handlePasswordSubmit}
    setVideoNode={setVideoNode}
    handleTimeout={handleTimeout}
  />
));

Video.propTypes = {
  pathname: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handlePasswordSubmit: PropTypes.func.isRequired,
  setVideoNode: PropTypes.func.isRequired,
  handleTimeout: PropTypes.func.isRequired,
};

export default VideoRouter;
