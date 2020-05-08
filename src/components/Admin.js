import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import { FlexColumn } from '../style/flex';
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

const Downwrapper = styled(FlexColumn)`
  flex-grow: 1;
  justify-content: flex-start;
  width: 100%;
`;

const Control = styled(Table)`
  width: 90%;
  justify-content: flex-start;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ControlName = styled.input`
  border: none;
  width: 100%;
`;

const ControlWeek = styled.select`
  border: none;
`;

const ControlBottom = styled.button`
  width: 200px;
  border: none;
  height: 30px;
  font-size: 15px;
  border-radius: 10px;
  margin: 20px;
  background-color: black;
  color: white;
`;

const dates = [
  '3/05', '3/12', '3/19', '3/26', '4/02',
  '4/09', '4/16', '4/23', '4/30', '5/07',
  '5/14', '5/21', '5/28', '6/04', '6/11',
];

const Admin = ({
  videoFiles,
  handleVideoChange,
  handleSubmit,
}) => (
  <Pagewrapper>
    <Topbar />
    <Downwrapper>
      <ControlBottom onClick={handleSubmit}>Submit</ControlBottom>
      <Control>
        <thead>
          <tr>
            <th>Video Name</th>
            <th>Week</th>
            <th>Index</th>
          </tr>
        </thead>
        <tbody>
          {
            videoFiles.map(({
              videoTitle,
              week,
              videoLink,
              index,
            }, idx1) => (
              <tr key={videoLink}>
                <td>
                  <ControlName
                    value={videoTitle}
                    onChange={(e) => handleVideoChange({ videoTitle: e.target.value }, idx1)}
                  />
                </td>
                <td>
                  <ControlWeek
                    value={week}
                    onChange={(e) => {
                      handleVideoChange({ week: parseInt(e.target.value, 10) }, idx1);
                    }}
                  >
                    <option value={-1}>Private</option>
                    {
                      dates.map((date, idx2) => (
                        <option value={idx2} key={date}>{`Week ${idx2 + 1}`}</option>
                      ))
                    }
                  </ControlWeek>
                </td>
                <td>
                  <ControlName
                    style={{ width: 40 }}
                    value={index}
                    onChange={(e) => {
                      handleVideoChange({ index: parseInt(e.target.value, 10) }, idx1);
                    }}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Control>
    </Downwrapper>
  </Pagewrapper>
);

Admin.propTypes = {
  videoFiles: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
    videoTitle: PropTypes.string.isRequired,
    week: PropTypes.number.isRequired,
  })).isRequired,
  handleVideoChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Admin;
