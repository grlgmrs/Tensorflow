import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faHandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import HandPose from "../HandPose";

import { WebcamControllerWrapper, IconWrapper } from "./styles";

const WebcamController = ({ onChange, getSource }) => {
  const [paused, setPaused] = useState(true);
  const [handPoseInstance, setHandPoseInstance] = useState(null);
  const [handPoseSnapshotAvailable, setHandPoseSnapshotAvailable] =
    useState(false);

  useEffect(() => {
    const handPoseLoad = async () => {
      const handPose = new HandPose();
      await handPose.load();

      setHandPoseInstance(handPose);
    };

    handPoseLoad();
  }, []);

  useEffect(() => {
    onChange && onChange(paused);
  }, [paused]);

  useEffect(() => {
    setHandPoseSnapshotAvailable(!paused && handPoseInstance);
  }, [paused, handPoseSnapshotAvailable]);

  const handleHandSnapshot = async () => {
    if (handPoseSnapshotAvailable) {
      const { result, callback } = getSource();

      callback(await handPoseInstance.detect(result));
    }
  };

  return (
    <WebcamControllerWrapper>
      <IconWrapper onClick={() => setPaused(!paused)}>
        {paused ? (
          <FontAwesomeIcon icon={faPlay} color="white" size="2x" />
        ) : (
          <FontAwesomeIcon icon={faPause} color="white" size="2x" />
        )}
      </IconWrapper>
      <IconWrapper
        onClick={handleHandSnapshot}
        disabled={!handPoseSnapshotAvailable}
      >
        <FontAwesomeIcon icon={faHandSparkles} color="white" size="2x" />
      </IconWrapper>
    </WebcamControllerWrapper>
  );
};

export default WebcamController;
