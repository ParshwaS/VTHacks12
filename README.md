# Monocle

Monocle brings stock market-style analytics to real estate investing. View rent and sale trends like stock charts for any zip code. Access crime rates and upcoming developments to make informed decisions with Monocle.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Devpost Project Page](#devpost-project-page)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Team Members](#team-members)
- [Installation](#installation)

## Features

- **Stock Market-Style Charts**: Visualize historical rent and sale prices as interactive charts resembling stock market graphs.
- **Comprehensive Data**: Access detailed information on crime rates and upcoming developments for any zip code.

## Demo

Watch our project demo on YouTube: [Monocle Demo](https://youtu.be/1G0J0IH8sOY)

## Devpost Project Page

Learn more about Monocle on our Devpost page: [Monocle on Devpost](https://devpost.com/software/monocle-gflcbq?ref_content=my-projects-tab&ref_feature=my_projects)

## Usage

1. **Sign Up / Log In**

   - Use the authentication (PropelAuth) system to create an account or log in.

2. **Search by Zip Code**

   - Enter a zip code to view real estate data for that area.

3. **View Analytics**

   - Analyze rent and sale price trends through interactive charts.
   - Review crime rates and information on upcoming developments.

4. **Customize Data**

   - Filter data based on time ranges or specific metrics.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Node.js, Express.js
- **Authentication**: PropelAuth
- **Database**: MongoDB Atlas
- **Charting Library**: D3.js (Complicated but the most contollable)
- **Version Control**: Git and GitHub

## Team Members

- **Parshwa Shah**
- **Foram Shah**
- **Samarth Bhole**
- **Shreyash Karandikar**

## Installation

To run Monocle locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone
    ```
2. Navigate to the project directory:
    ```bash
    cd /monocle/frontend
    ```
3. Install dependencies:
    ```bash
    bun install
    ```
4. Start the frontend development server:
    ```bash
    bun dev
    ```
5. In a new terminal, navigate to the backend directory:
    ```bash
    cd /monocle/backend
    ```
6. Install backend dependencies:
    ```bash
    bun install
    ```
7. Start the backend server:
    ```bash
    bun dev
    ```
8. Open your browser and go to `http://localhost:3000` to view the application.
