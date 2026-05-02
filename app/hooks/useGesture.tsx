"use client";
import { useEffect, useRef, useState } from "react";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

export const useGesture = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [gesture, setGesture] = useState("Initializing AI...");
  const recognizerRef = useRef<GestureRecognizer | null>(null);

  useEffect(() => {
    const setup = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      recognizerRef.current = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
      });
    };
    setup();
  }, []);

  const detect = async () => {
    if (recognizerRef.current && videoRef.current && videoRef.current.readyState === 4) {
      const result = recognizerRef.current.recognizeForVideo(videoRef.current, Date.now());
      if (result.gestures.length > 0) {
        setGesture(result.gestures[0][0].categoryName);
      }
    }
    requestAnimationFrame(detect);
  };

  return { gesture, detect };
};