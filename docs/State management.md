---
id: project-setup-guide
title: Project Setup Guide (Web & Mobile)
---

# Project Setup Guide (Web & Mobile)

This guide explains how to set up and run the project locally for both the web application and mobile devices.

---

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- **Node.js:** Version 16 or higher.
- **npm or Yarn:** Your preferred package manager.
- **Git:** To clone the repository.

Also, confirm that your environment variables are properly configured in a `.env.local` file located in the project root. This file contains sensitive data such as API keys and configuration settings.

---

## Step 1: Clone the Repository

Clone the repository from your version control system. In your terminal, run:

```bash
git clone <repository-url>
cd <repository-folder>/web-app
```

## Step 2: Install Dependencies

Install the required dependencies using your preferred package manager. For example:

```bash
npm install
```

## Step 3: Run the Application

### 3.1 Run the application on web

To run the web application locally, use:

```bash
npm run dev
```

### 3.2 Run the application on mobile

#### 3.2.1 To access the app from other devices on your network, use:

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

#### 3.2.2 Run below command to get ipv4 address

```bash
ipconfig
```

for MAC use elow

```bash
ifconfig
```

#### 3.2.3 Open the App on Your Mobile Device

Ensure that your mobile device is connected to the same Wi-Fi network

```bash
http://<your-computer-ip>:3000
```

Example:

```bash
http://192.168.1.123:3000
```
