import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const Topbarwrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(25, 25, 25);
  box-shadow: 0px 4px 21px -1px #ccc;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  z-index: 1;
`;

const Tool = styled(Link)`
  font-size: 18px;
  color: rgb(160, 160, 160);
  ${({ label, path }) => ((label === path) ? `
    color: white;
    cursor: default;
    pointer-events: none;
  ` : '')}
  transition: .3s;
  margin: 20px;
  text-decoration: none;
  overflow: hidden;
  :hover {
    color: white;
    transition: .5s;
  }
`;

const Topbar = ({ location }) => (
  <Topbarwrapper>
    <Tool to="/admin/upload_video/" label="/upload_video/" path={location.pathname.split('/admin')[1]}>upload video</Tool>
    <Tool to="/admin/" label="/" path={location.pathname.split('/admin')[1]}>content</Tool>
  </Topbarwrapper>
);

const TopbarRouter = withRouter(({ location }) => (
  <Topbar location={location} />
));

Topbar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TopbarRouter;
