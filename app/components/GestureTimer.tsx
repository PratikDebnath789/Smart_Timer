"use client";
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

const GestureTimer = () => {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [gesture, setGesture] = useState("Loading AI...");
  
  const webcamRef = useRef<Webcam>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const initGestureRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        // Initialize strictly in VIDEO mode
        recognizerRef.current = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO", 
        });
        setGesture("Ready - Show Hand");
      } catch (error) {
        setGesture("AI Error");
      }
    };
    initGestureRecognizer();
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const detectGestures = () => {
    if (
      recognizerRef.current &&
      webcamRef.current &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const startTimeMs = performance.now(); // High-res timestamp required for VIDEO mode
      
      // Explicitly use recognizeForVideo
      const results = recognizerRef.current.recognizeForVideo(video, startTimeMs);

      if (results.gestures && results.gestures.length > 0) {
        const categoryName = results.gestures[0][0].categoryName;
        setGesture(categoryName);

        if (categoryName === "Thumb_Up") setIsActive(prev => (prev !== true ? true : prev));
        if (categoryName === "Closed_Fist") setIsActive(prev => (prev !== false ? false : prev));
        if (categoryName === "Victory") {
          setIsActive(false);
          setSeconds(1500);
        }
      }
    }
    requestRef.current = requestAnimationFrame(detectGestures);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tighter italic text-white leading-none">FOCUS FLOW</h1>
          <div className="flex justify-center gap-4">
            <span className={`px-5 py-1.5 rounded-full text-xs font-bold border transition-all ${isActive ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-slate-800 text-slate-500 border-transparent'}`}>
              {isActive ? "• ACTIVE" : "PAUSED"}
            </span>
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
               {gesture}
            </span>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-900 shadow-2xl aspect-video bg-black transform hover:scale-[1.02] transition-transform">
          <Webcam
            ref={webcamRef}
            mirrored
            onUserMedia={() => {
              requestRef.current = requestAnimationFrame(detectGestures);
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center space-y-12">
          <div className="text-[10rem] font-mono font-bold tracking-tighter tabular-nums leading-none text-white drop-shadow-md">
            {formatTime(seconds)}
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-sm font-black tracking-widest uppercase transition-all">
            <div className={`flex flex-col items-center gap-3 ${gesture === "Thumb_Up" ? "text-green-400 scale-125 drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]" : "text-slate-600"}`}>
              <span className="text-5xl">👍</span>
              <span className="mt-2">Start</span>
            </div>
            
            <div className={`flex flex-col items-center gap-3 ${gesture === "Closed_Fist" ? "text-red-400 scale-125 drop-shadow-[0_0_12px_rgba(248,113,113,0.6)]" : "text-slate-600"}`}>
              <span className="text-5xl">✊</span>
              <span className="mt-2">Pause</span>
            </div>
            
            <div className={`flex flex-col items-center gap-3 ${gesture === "Victory" ? "text-blue-400 scale-125 drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" : "text-slate-600"}`}>
              <span className="text-5xl">✌️</span>
              <span className="mt-2">Reset</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestureTimer;