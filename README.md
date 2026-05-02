# 🕒 Smart Timer (Focus Flow)

**Smart Timer** is an AI-powered productivity tool that uses hand gesture recognition to control a countdown timer. Built with **Next.js** and **Google MediaPipe**, it allows for a completely touchless experience, making it ideal for cooking, exercising, or deep-work sessions where you want to avoid touching your device.


---

## 🚀 Features

*   **Gesture Control:** Start, Pause, and Reset the timer using hand signs.
*   **Real-time AI Processing:** Utilizes MediaPipe's **WebAssembly (WASM)** for 60FPS tracking directly in the browser.
*   **Privacy-First:** All video processing is performed locally on your device; no camera data is sent to a server.
*   **Responsive UI:** A sleek, dark-mode interface built with **Tailwind CSS**.

---

## 🖐️ How to Use

| Gesture | Action |
| :--- | :--- |
| 👍 **Thumb Up** | Start Timer |
| ✊ **Closed Fist** | Pause Timer |
| ✌️ **Victory Sign** | Reset Timer |

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **AI Engine:** [MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment:** [Vercel](https://vercel.com/)

---


3.  **Run the development server:**
    ```bash
    npm run dev
