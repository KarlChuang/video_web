import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Pagewrapper = styled.div`
  height: 100%;
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Admin = () => (
  <Pagewrapper>
    admin
  </Pagewrapper>
);

Admin.propTypes = {
};

export default Admin;
