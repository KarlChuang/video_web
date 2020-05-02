import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Topbar from './Topbar';

const Pagewrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputDiv = styled.div`
  width: 50%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputTitle = styled.div`
  width: 100px;
  font-size: 15px;
`;

const VideoInput = styled.input`
  flex-grow: 1;
  height: 40%;
`;

const VideoButton = styled.button`
  width:30%;
  height: 20px;
  border-radius: 5px;
`;

const AdminVideo = ({
  videoName,
  handleVideoChange,
  handleVideoNameChange,
  handleVideoSubmit,
}) => (
  <Pagewrapper>
    <Topbar />
    <PageDiv>
      <InputDiv>
        <InputTitle>Video File</InputTitle>
        <VideoInput type="file" accept="video/mp4" onChange={(e) => handleVideoChange(e)} />
      </InputDiv>
      <InputDiv>
        <InputTitle>Video Name</InputTitle>
        <VideoInput value={videoName} onChange={(e) => handleVideoNameChange(e.target.value)} />
      </InputDiv>
      <VideoButton onClick={handleVideoSubmit}>Submit</VideoButton>
    </PageDiv>
  </Pagewrapper>
);

AdminVideo.propTypes = {
};

export default AdminVideo;
