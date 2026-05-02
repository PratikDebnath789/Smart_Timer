# 🌐 How to Access Smart Timer

You can access and use the **Smart Timer** in two ways: via the live web application or by setting it up locally on your machine.

---

## 1. Live Web Application (Recommended)
The fastest way to use the project is through the live deployment on Vercel. 

*   **URL:** [(https://smart-timer-yonf.vercel.app/)]
*   **Requirements:** A modern web browser (Chrome, Edge, or Brave recommended) and a functional webcam.
*   **Note:** When you first open the link, your browser will request **Camera Permission**. You must click **"Allow"** for the AI gesture recognition to function.

---

## 2. Local Development Setup
If you want to run the code on your own computer to see how it works, follow these steps:

### Prerequisites
*   **Node.js** (v18.x or higher)
*   **npm** or **yarn**

### Steps
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/PratikDebnath789/Smart_Timer.git](https://github.com/PratikDebnath789/Smart_Timer.git)
    ```
2.  **Navigate to the Folder:**
    ```bash
    cd Smart_Timer
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Launch the App:**
    ```bash
    npm run dev
    ```
5.  **Open in Browser:** 
    Go to `http://localhost:3000` to see the app running locally.

---

## 🛠️ Access Troubleshooting

*   **Camera not working:** Ensure no other application (like Zoom or Teams) is using your webcam.
*   **Gestures not recognized:** Make sure you are in a well-lit room and your hand is clearly visible within the camera frame.
*   **HTTPS Requirement:** If you are hosting this yourself, remember that browser camera APIs strictly require an **HTTPS** connection or `localhost` to function for security reasons.
