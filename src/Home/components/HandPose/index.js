import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";

class HandPose {
  constructor() {
    this.model = global.handPoseModel || null;
  }

  async load() {
    if (!this.model) {
      this.model = await handpose.load();
      global.handPoseModel = this.model;
    }

    return this.model;
  }

  async detect(target) {
    const hand = await this.model.estimateHands(target);

    return (hand.length > 0 && hand[0]) || [];
  }
}

export default HandPose;
