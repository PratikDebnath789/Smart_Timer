## 📚 Core Libraries & Dependencies

The **Smart Timer** project leverages a modern tech stack designed for high-performance AI processing and a seamless user experience.

### 1. [MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)
*   **Purpose:** The backbone of the application's AI. 
*   **Role:** It provides the Gesture Recognition task using **WebAssembly (WASM)**. It detects hand landmarks and classifies gestures (Thumb Up, Closed Fist, etc.) in real-time without needing a server-side API.

### 2. [Next.js 15+](https://nextjs.org/)
*   **Purpose:** The React framework for production.
*   **Role:** Handles the overall application structure, routing, and optimization. Using the **App Router** ensures fast page loads and efficient component rendering.

### 3. [React Webcam](https://www.npmjs.com/package/react-webcam)
*   **Purpose:** Camera interface.
*   **Role:** Provides a smooth, configurable webcam component that allows the MediaPipe engine to access the user's video stream for gesture analysis.

### 4. [Tailwind CSS](https://tailwindcss.com/)
*   **Purpose:** Utility-first styling.
*   **Role:** Used to build the dark-mode interface and the "glowing" visual feedback systems. It keeps the bundle size small while allowing for complex, responsive animations.

### 5. [Lucide React](https://lucide.dev/)
*   **Purpose:** Icon library.
*   **Role:** Provides the clean, modern icons used in the Gesture Guide and UI buttons, ensuring a professional look and feel.

---

## 🛠️ Installation of Libraries
If you are setting this up locally, these are the primary packages installed:
```bash
npm install @mediapipe/tasks-vision react-webcam lucide-react clsx tailwind-merge
