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

const Table = styled.table`
  width: 100%;
`;

const Tr = styled.tr`
  width: 80%;
  height: 70px;
`;

const Th = styled.th``;

const Td = styled.td``;

const Link = styled.a``;

const Customer = ({ content }) => (
  <Pagewrapper>
    <Table>
      <thead>
        <Tr>
          <Th style={{ width: 100 }}>週次</Th>
          <Th style={{ width: 70 }}>日期</Th>
          <Th style={{ width: 200 }}>單元主題</Th>
          <Th style={{ width: 70 }}>課程內容</Th>
          <Th style={{ width: 70 }}>上課影片</Th>
        </Tr>
      </thead>
      <tbody>
        {
          content.map(({
            date,
            chapter,
            pdf,
            video,
          }, idx) => (
            <Tr key={date}>
              <Td>{`第${idx + 1}週`}</Td>
              <Td>{date}</Td>
              <Td>{chapter}</Td>
              <Td>
                {
                  pdf.map(({ pdfTitle, pdfLink, index }) => (
                    <div key={index}>
                      <Link href={pdfLink}>{pdfTitle}</Link>
                    </div>
                  ))
                }
              </Td>
              <Td>
                {
                  video.map(({ videoTitle, videoLink, index }) => (
                    <div key={index}>
                      <Link href={videoLink}>{videoTitle}</Link>
                    </div>
                  ))
                }
              </Td>
            </Tr>
          ))
        }
      </tbody>
    </Table>
  </Pagewrapper>
);

Customer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    chapter: PropTypes.string.isRequired,
    pdf: PropTypes.arrayOf(PropTypes.shape({
      pdfTitle: PropTypes.string.isRequired,
      pdfLink: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    })).isRequired,
    video: PropTypes.arrayOf(PropTypes.shape({
      videoTitle: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

export default Customer;
