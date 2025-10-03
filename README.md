# 🏠 Prefab Home Marketplace

[![React](https://img.shields.io/badge/React-17.0-blue?logo=react&logoColor=white)](https://reactjs.org/) 
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel&logoColor=white)](https://vercel.com/) 
[![Create.xyz](https://img.shields.io/badge/Create.xyz-Backend-brightgreen)](https://create.xyz/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) 
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A modern, AI-enhanced marketplace for prefab homes. Users can browse, compare, and interact with 3D/AR home models, save favorites, and receive AI-powered recommendations. Built with **React frontend hosted on Vercel** and powered by **Create.xyz backend**.

---

## Table of Contents
1. [About](#about)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Getting Started](#getting-started)  
5. [API Integration](#api-integration)  
6. [Deployment](#deployment)  
7. [Project Structure](#project-structure)  
8. [Flow Diagram](#flow-diagram)  
9. [Contributing](#contributing)  
10. [License](#license)  

---

## About
This project merges your original **Prefab Marketplace** ideas with **Prefab.2 enhancements**:

- Browse and filter prefab homes by type, price, and style  
- High-quality images, floor plans, and 3D/AR previews  
- AI-driven recommendations for upgrades and matching homes  
- Favorites, comparisons, and direct seller contact  
- Affiliate tracking for partner listings  

Designed with a **single free frontend platform** (React + Vercel) and a powerful **Create.xyz backend**.

---

## Tech Stack

| Layer | Tool / Library | Purpose |
|-------|-----------------|---------|
| Frontend | React + TailwindCSS | Responsive UI & marketplace interface |
| Hosting | Vercel | Free frontend hosting & CDN |
| Backend | Create.xyz | API, database, authentication, business logic |
| Authentication | Create.xyz / optional Supabase | Secure login/signup |
| AI Features | Create.xyz APIs | Recommendations, smart search |
| AR/3D Models | Three.js / Babylon.js | Interactive home previews |
| Affiliate Tracking | Create.xyz | Partner listings & commission tracking |

---

## Features

### Marketplace
- Browse homes with filters (type, size, price, location)  
- AI-powered recommendations  
- Interactive 3D/AR home previews  

### User Accounts
- Secure signup/login  
- Save favorites & compare listings  
- Dashboard to track inquiries or purchases  

### Admin / Seller Tools
- Post and manage prefab home listings  
- Upload images, floor plans, and 3D models  
- Track listing performance & affiliate earnings  

### Integrations
- Optional AR/VR viewing for premium listings  
- Affiliate tracking system for partner listings  
- AI-driven search suggestions & smart filtering  

---

## Getting Started

### Clone Repository
```bash
git clone https://github.com/yourusername/prefab-home-marketplace.git
cd prefab-home-marketplacenpm installREACT_APP_API_URL=YOUR_CREATE_XYZ_API_ENDPOINT
REACT_APP_AUTH_KEY=YOUR_AUTH_KEY
npm start
const response = await fetch(`${process.env.REACT_APP_API_URL}/homes`);
const homes = await response.json();
/src
  /components       # UI components (cards, filters, dashboards)
  /pages            # Pages (home, listings, dashboard)
  /assets           # Images, icons, 3D models
  /api              # API calls to Create.xyz
  /utils            # Utility functions
.env.local          # Environment variables
package.json        # Dependencies
User Browser / Mobile
       |
       v
  React Frontend (Vercel)
       |
       v
   API Requests
       |
       v
   Create.xyz Backend
       |        \
       v         v
  Database    AI Recommendations
       |         |
       v         v
   Prefab Home Listings & 3D Models
       |
       v
    Response to Frontend
