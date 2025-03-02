---
id: api-integration-details
title: API Integration Details
---

# API Integration Details

This document explains how the project integrates with external APIs to fetch, validate, and update cryptocurrency data. The system uses React and React Query for efficient data management.

## Overview

The application pulls cryptocurrency data (like prices, market ranks, and percentage changes) from external APIs such as CoinGecko. The data flows through custom hooks, gets validated, and is then displayed on the dashboard. The key steps are:

1. **Data Fetching:** Custom hooks with React Query handle API calls.
2. **Data Validation:** API responses are validated to ensure they match expected formats.
3. **UI Integration:** Validated data is mapped to UI components for display.
4. **Data Updating:** Data is updated automatically or manually for a smooth user experience.

## Data Fetching with React Query

Custom hooks (e.g., `useAllCryptos`) are used to manage API calls. React Query handles asynchronous requests, caches responses, and provides states like loading, error, and refetch methods. Key features include:
- **Query Keys:** Unique identifiers for each API request.
- **Stale Time & Refetch:** Controls how long data stays fresh and when to refetch.
- **Retry Logic:** Limits retries on failed requests to avoid overloading the API.

## Data Validation

Before using the data in the UI, it’s validated against predefined schemas. This ensures:
- The data structure is consistent.
- Any discrepancies in the API response are caught early.
- Only reliable and correctly formatted data is processed.

## UI Integration and Data Updates

### Dashboard Components

- **Market Table:** Displays a summary of the top 5 cryptocurrencies. It includes a manual refresh button to trigger updates.
- **Crypto Dialog and Data Table:** Provides detailed views with features like sorting, filtering, pagination, and CSV export.

### Data Updating

Data updates happen in two ways:
1. **Automatic Updates:** React Query refetches data in the background based on settings like stale time.
2. **Manual Refresh:** Users can click a refresh button to update data. A loader is shown during the refetch to ensure smooth transitions.

## Conclusion

The API integration combines:
- Efficient data fetching with React Query.
- Robust validation to ensure data reliability.
- User-friendly UI components for a seamless experience.
- Flexible update mechanisms for both automatic and manual refreshes.

This approach ensures the dashboard always displays accurate and up-to-date cryptocurrency information in a responsive and reliable manner.
---