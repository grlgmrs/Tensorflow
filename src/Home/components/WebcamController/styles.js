import styled from "styled-components";

export const WebcamControllerWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100px;
  background-color: #353535;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.button`
  border: none;
  background: transparent;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;

  path {
    fill: ${({ disabled }) =>
      disabled ? "rgba(255,255,255,0.4)" : "currentColor"};
  }

  &:hover {
    background: rgba(0, 0, 0, 0.13);
  }
`;
