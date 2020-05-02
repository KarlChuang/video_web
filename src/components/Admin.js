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

const Admin = () => (
  <Pagewrapper>
    <Topbar />
    admin
  </Pagewrapper>
);

Admin.propTypes = {
};

export default Admin;
