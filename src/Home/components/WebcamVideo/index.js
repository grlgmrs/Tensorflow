import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import HandPose from "../HandPose";

import { CanvasWebcam, Container, PausedVideoWrapper } from "./styles";

const WebcamVideo = ({ webcamRef, webcamController }) => {
  const [showStream, setShowStream] = useState(false);
  const [ready, setReady] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
  const canvasRef = useRef(null);
  const setTimeoutCanvas = useRef(null);
  const handPoseInstance = useRef(new HandPose());

  useEffect(() => {
    const handPoseLoad = async () => {
      await handPoseInstance.current.load();

      setReady(true);
    };

    handPoseLoad();
  }, []);

  useEffect(() => {
    if (ready && showStream && !setTimeoutCanvas.current) {
      setTimeout(async () => {
        await handPoseInstance.current.detect(webcamRef.current.video);

        setWebcamReady(true);
      }, 3000);
    }
  }, [ready, showStream]);

  useEffect(() => {
    if (
      ready &&
      webcamReady &&
      canvasRef?.current &&
      webcamRef?.current &&
      !setTimeoutCanvas.current
    ) {
      console.log("ready");

      setTimeoutCanvas.current = setInterval(async () => {
        if (!showStream) return;

        const { video } = webcamRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const points = await handPoseInstance.current.detect(
          webcamRef.current.video
        );

        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        ctx.drawImage(video, 0, 0);

        const { indexFinger, middleFinger } = points?.annotations || {};
        if (indexFinger) {
          [indexFinger, middleFinger].forEach((finger) =>
            finger.forEach((fingerPoints) => renderCircle(fingerPoints, ctx))
          );
        }
      }, 1000 / 30);
    }
  });

  const renderCircle = ([x, y, z], ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.stroke();
  };

  const handlePause = (paused) => {
    if (paused) {
      clearInterval(setTimeoutCanvas.current);
      setTimeoutCanvas.current = null;
      setReady(false);
      setShowStream(false);
    }

    setShowStream(!paused);
  };

  return (
    <Container>
      <PausedVideoWrapper>
        {showStream && (
          <>
            <CanvasWebcam ref={canvasRef} />
            <Webcam
              ref={webcamRef}
              style={{ display: "none" }}
              audio={false}
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user",
              }}
            />
          </>
        )}
      </PausedVideoWrapper>
      {webcamController({ onChange: handlePause })}
    </Container>
  );
};

export default WebcamVideo;
