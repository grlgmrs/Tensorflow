import { useState, useEffect, useRef } from "react";
import WebcamVideo from "./components/WebcamVideo";
import WebcamController from "./components/WebcamController";
import ScreenshotsList from "./components/ScreenshotsList";

import { Container } from "./styles";

const Home = () => {
  const [screenshots, setScreenshots] = useState([]);
  const webcamRef = useRef(null);

  useEffect(() => {
    window.webcamRef = webcamRef;
    window.handleGetSource = handleGetSource;
  }, []);

  const renderCircle = ([x, y, z], ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.stroke();
  };

  const takeScreenshot = (canvas, points) => {
    const ctx = canvas.getContext("2d");
    const { indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb } =
      points?.annotations || {};
    console.log(points);

    if (indexFinger) {
      [indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb].forEach(
        (finger) =>
          finger.forEach((fingerPoints) => renderCircle(fingerPoints, ctx))
      );
    }

    const base64Image = canvas.toDataURL();

    setScreenshots([base64Image, ...screenshots]);
  };

  const handleGetSource = () => {
    const { video } = webcamRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    return {
      result: canvas,
      callback: (points) => takeScreenshot(canvas, points),
    };
  };

  return (
    <Container>
      <WebcamVideo
        webcamRef={webcamRef}
        webcamController={(props) => (
          <WebcamController {...props} getSource={handleGetSource} />
        )}
      />
      <ScreenshotsList list={screenshots} />
    </Container>
  );
};

export default Home;
