
# 💹 Crypto Tracker – Real-Time Cryptocurrency App

**Crypto Tracker** is a responsive web and mobile application that provides real-time data on top cryptocurrencies. It integrates external APIs with modern state management to deliver fast, dynamic updates and a smooth user experience.

---

## 📦 Project Structure

```
📦 crypto-tracker/
├── components/         # Reusable UI components
├── hooks/              # Custom hooks for data fetching
├── pages/              # Application routes
├── public/             # Static assets
├── styles/             # Global and component-specific styles
└── utils/              # API configs, constants, helpers
```

---

## 🚀 Features

- **🔄 Real-Time Data** – Live prices, market ranks, and percentage changes
- **📦 React Query** – Smart caching, data sync, and background refresh
- **🧠 Custom Hooks** – Centralized logic for API calls and validation
- **🔁 Refresh Options** – Manual button and automatic interval updates
- **📱 Mobile Friendly** – Works on both desktop and mobile devices

---

## 🛠️ Prerequisites

Before starting, make sure the following are installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or Yarn
- Git (optional but recommended)

Also create a `.env.local` file in the root directory to store sensitive values such as API keys and base URLs.

---

## 🧪 Getting Started

### 🔁 1. Clone the Repository

```bash
git clone <your-repo-url>
cd crypto-tracker
```

### 📦 2. Install Dependencies

```bash
npm install
```

### 💻 3. Run the Application

#### 🖥️ Web

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

#### 📱 Mobile Access on Same Network

```bash
npm run dev -- -H 0.0.0.0 -p 3000
```

Find your IP:
- **Windows**: `ipconfig`
- **Mac/Linux**: `ifconfig`

Then open on your phone:
```
http://<your-computer-ip>:3000
```

Example:
```
http://192.168.1.123:3000
```

---

## 🔌 API Integration

This app pulls data from external sources (e.g., CoinGecko) and displays it via reusable UI components.

### 🔄 Data Lifecycle

1. **Custom Hook (`useAllCryptos`)** – Fetches live data
2. **Validation Layer** – Checks incoming data for completeness
3. **React Query** – Handles caching, refetching, and error retries
4. **UI Components** – Present the data in user-friendly tables and dialogs

---

## ⚛️ React Query Features

| Feature | Purpose |
|--------|---------|
| **Query Keys** | Uniquely identify API requests |
| **Stale Time** | Determines how long data is “fresh” |
| **Retry Logic** | Auto-retry failed API calls |
| **Manual Refetch** | Refresh button for user control |

---

## 🧱 UI Components

- **Market Table** – Top 5 coins, sortable and refreshable
- **Crypto Dialog** – Detailed view for individual coins
- **Data Table** – Advanced table with pagination, search, export to CSV

---

## 📌 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.coingecko.com/api/v3
```

---

## 📚 Technologies Used

- **Next.js** – React framework
- **React Query** – State and server cache management
- **Tailwind CSS** – Styling
- **Chart.js or Recharts** – Data visualization
- **CoinGecko API** – Crypto data source

---

## 🙌 Contributors

- [Sreeja Sangras]

---

## ✅ Final Thoughts

Crypto Tracker brings real-time cryptocurrency tracking to your fingertips with an efficient, scalable architecture and responsive UI. Built with best practices in API integration and state management, it’s a solid base for any fintech or crypto-based application.

