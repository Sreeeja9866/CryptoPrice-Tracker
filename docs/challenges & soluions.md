---
id: challenges-and-solutions
title: Challenges & Solutions Faced While Building the Project
---

# Challenges & Solutions Faced While Building the Project

Building this project came with several obstacles, but each one was an opportunity to learn and improve the process. Here's a quick rundown of the challenges I faced and the solutions I implemented:

---

## 1. Script Execution Policy on Windows

**Challenge:**  
When running npm commands in PowerShell, I encountered a blocking error related to the system's script execution policy.

**Solution:**  
I updated the PowerShell execution policy to `RemoteSigned`, allowing scripts to run while maintaining security.

---

## 2. Passing Command-Line Parameters to Next.js

**Challenge:**  
Passing hostname and port parameters to Next.js led to errors, with Next.js misinterpreting them as a directory.

**Solution:**  
I learned to use a double dash `--` to correctly pass the parameters, which let me bind the server to `0.0.0.0` and specify the port.

---

## 3. Accessing the Application on Mobile Devices

**Challenge:**  
Initially, my dev server was bound to `localhost`, which blocked mobile devices from accessing the app on the same network.

**Solution:**  
I changed the server to bind to `0.0.0.0` and used my computer’s IP address, allowing mobile devices to access it.

---

## 4. Hydration Warnings Due to Browser Extensions

**Challenge:**  
I ran into hydration warnings from mismatched HTML caused by browser extensions like Grammarly.

**Solution:**  
I realized these warnings were harmless for production and recommended disabling extensions during development.

---

## 5. Loader Behavior and User Experience

**Challenge:**  
The table initially appeared empty before data was fetched, affecting the user experience.

**Solution:**  
I added a skeleton loader with a minimum display time to ensure a smooth loading experience, even for fast data loads.

---

## 6. API Request Rate Limits

**Challenge:**  
I ran into "Too Many Requests" errors when hitting the external API too frequently.

**Solution:**  
I adjusted React Query’s configuration to manage request frequency, reducing unnecessary calls and avoiding rate limit errors.

---

## 7. State Management Integration

**Challenge:**  
Managing both asynchronous data and shared UI state in a scalable way was tricky.

**Solution:**  
I used **React Query** for data fetching and caching, and **Zustand** for managing UI state. This provided a simple yet efficient setup for both.

---

## Conclusion

Each challenge taught me valuable lessons that ultimately improved the architecture and quality of the project. By resolving issues related to script execution, API requests, UI state, and more, I built a solid, scalable system. Using **React Query** and **Zustand** has set a great foundation for future improvements, and I’m confident in the app’s performance and scalability moving forward.
