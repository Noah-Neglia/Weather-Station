import React from 'react';
import styled from 'styled-components';

// Define a styled component for a container that covers the entire screen with a semi-transparent black background
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Define a styled component for a message box that appears on top of the container
const Message = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

// Define a styled component for a button to close the message box
const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3f8fd8;
  color: white;
  font-size: 14pt;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #89b6e5;
  }
`;

// Define the Error component
const Error = ({ onClose }) => {
  return (
    <Container>
      <Message>
        <h3>Please enable location services to use this feature.</h3>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Message>
    </Container>
  );
};

export default Error;
