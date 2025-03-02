# Crypto Tracker

## Overview

Crypto Tracker is a web and mobile application that provides real-time cryptocurrency data, including prices, market ranks, and percentage changes. The app integrates with external APIs and utilizes efficient state management to ensure a seamless user experience.

---

## Features

- **Live Cryptocurrency Data**: Fetches real-time market data.
- **React Query for Data Management**: Ensures efficient caching and state updates.
- **Custom Hooks for API Calls**: Manages API interactions with validation.
- **Manual & Automatic Data Refresh**: Ensures the latest data is always displayed.
- **Mobile Compatibility**: Accessible from both web browsers and mobile devices.

---

## Prerequisites

Ensure the following dependencies are installed:

- **Node.js** (v18 or higher) → [Download Node.js](https://nodejs.org/)
- **npm or Yarn** (package managers)
- **Git** (for version control, optional)

Also, set up a `.env.local` file in the root directory to store environment variables such as API keys and configuration settings.

---

## Project Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd crypto-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

#### 3.1 Web Application

To start the development server, run:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

#### 3.2 Mobile Access

To access the application from a mobile device:

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

Then, find your computer's IP address:

- **Windows**: Run `ipconfig`
- **Mac/Linux**: Run `ifconfig`

Open a browser on your mobile device and navigate to:

```bash
http://<your-computer-ip>:3000
```

Example:

```bash
http://192.168.1.123:3000
```

---

## API Integration

The application fetches cryptocurrency data from external APIs (e.g., CoinGecko) and integrates it with React Query for state management.

### **Data Flow**

1. **Fetching Data**: Custom hooks (`useAllCryptos`) manage API requests.
2. **Data Validation**: Ensures data integrity before displaying it in the UI.
3. **UI Integration**: Displays validated data in market tables and detailed views.
4. **Data Updates**: Automatic or manual refresh keeps the information up to date.

### **React Query Features**

- **Query Keys**: Unique identifiers for API calls.
- **Stale Time & Refetch**: Optimizes performance and freshness of data.
- **Retry Logic**: Prevents excessive API calls on failures.

### **UI Components**

- **Market Table**: Displays top 5 cryptocurrencies with refresh functionality.
- **Crypto Dialog & Data Table**: Allows sorting, filtering, pagination, and CSV export.

---

## Conclusion

Crypto Tracker is designed to deliver real-time cryptocurrency insights through an efficient and user-friendly interface. With robust API integration, state management, and seamless web/mobile access, the application provides an optimal experience for tracking digital assets.

---


## Contributors

- [Sreeja Sangras]




