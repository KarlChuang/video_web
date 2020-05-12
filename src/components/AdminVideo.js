import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

import Topbar from './Topbar';
import { FlexRow, FlexColumn } from '../style/flex';

const Pagewrapper = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  overflow: scroll;
  flex-grow: 1;
  justify-content: flex-start;
`;

const PageDiv = styled(FlexColumn)`
  width: 100%;
  justify-content: flex-start;
`;

const VideoNameDiv = styled.div`
  font-size: 20px;
  color: white;
`;

const VideoInputDiv = styled(FlexColumn)`
  width: 50%;
  height: 250px;
  margin: 20px;
  justify-content: flex-start;
`;

const VideoInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const VideoLable = styled.label`
  width: 100%;
  flex-grow: 1;
  background-color: #5d5d5d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: .3s;
  :hover {
    transition: .3s;
    background-color: #a0a0a0;
  }
`;

const VideoButton = styled(FlexRow)`
  font-size: 20px;
  width: 50%;
  height: 40px;
  border-radius: 5px;
  background-color: #5d5d5d;
  color: white;
  transition: .3s;
  :hover {
    transition: .3s;
    background-color: #a0a0a0;
  }
`;

const ProgressBar = styled(Progress)`
  width: 50%;
  height: 40px;
  border-radius: 5px;
  color: white;
`;

const FileDetail = styled(FlexColumn)`
  margin: 5px;
  font-size: 15px;
  align-items: flex-start;
  width: 100%;
  color: #41a3b8;
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

const AdminVideo = ({
  progress,
  videoName,
  videoData: {
    filename,
    path,
    size,
  },
  handleVideoChange,
  handleVideoSubmit,
  pass,
  password,
  handlePasswordSubmit,
  handlePasswordChange,
}) => (
  <Pagewrapper>
    <PasswordDiv pass={pass}>
      <PasswordBox>
        <InputTxt>密碼</InputTxt>
        <InputBox value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
        <Button onClick={handlePasswordSubmit}>提交</Button>
      </PasswordBox>
    </PasswordDiv>
    <Topbar />
    <PageDiv>
      <VideoInputDiv>
        <VideoInput type="file" id="file" accept="video/mp4" onChange={(e) => handleVideoChange(e)} />
        <VideoLable htmlFor="file">
          <i className="fas fa-upload fa-5x" style={{ color: 'white' }} />
          <VideoNameDiv>{videoName}</VideoNameDiv>
        </VideoLable>
      </VideoInputDiv>
      {
        (progress === 0) ? (
          <VideoButton onClick={handleVideoSubmit}>Upload</VideoButton>
        ) : (
          <ProgressBar color="info" max="100" value={progress}>{`${progress}%`}</ProgressBar>
        )
      }
      {
        (progress === 100) ? (
          <div>
            <FileDetail>{`filename: ${filename}`}</FileDetail>
            <FileDetail>{`path: ${path}`}</FileDetail>
            <FileDetail>{`size: ${(size / 1000000).toFixed(3)} MB`}</FileDetail>
          </div>
        ) : (null)
      }
    </PageDiv>
  </Pagewrapper>
);

AdminVideo.propTypes = {
  progress: PropTypes.number.isRequired,
  videoName: PropTypes.string.isRequired,
  videoData: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
  handleVideoChange: PropTypes.func.isRequired,
  handleVideoSubmit: PropTypes.func.isRequired,
};

export default AdminVideo;
