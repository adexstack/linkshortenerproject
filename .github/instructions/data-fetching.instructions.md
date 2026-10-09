---
description: This file describes the data fetching strategy for the project.
---
This document outlines the best practices and guidelines for fetch
data fetching strategy for the project, including best practices and guidelines in out Next.js applications.
Adhering to these guidelines will help ensure consistent and efficient data fetching throughout the project.

## 1. Use Server Components for Data Fetching

In Next.js, prefer using server components for data fetching whenever possible. Server components allow you to fetch data on the server side, reducing the amount of JavaScript sent to the client and improving performance. Use server components to fetch data from APIs, databases, or other external sources, and pass the fetched data as props to client components when necessary.
Never use client components for data fetching unless absolutely necessary, as this can lead to increased bundle sizes and slower page loads.

## 2. data Fetching Methods

ALWAYS use the helper functions in /data directory for fetching data. This ensures a consistent approach to data fetching across the project and allows for easier maintenance and testing of data fetching logic. Never fetch data directly within components; always delegate to the helper functions.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions to ensure consistency and maintainability across the project.