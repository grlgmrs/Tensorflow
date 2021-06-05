import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;

  video {
    width: 100%;
  }
`;

export const PausedVideoWrapper = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  background: #222;
  position: relative;
`;

export const CanvasWebcam = styled.canvas`
  position: absolute;
`;
