import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Pagewrapper = styled.div`
  width: 100%;
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Customer = () => (
  <Pagewrapper>
    home
  </Pagewrapper>
);

Customer.propTypes = {
};

export default Customer;
