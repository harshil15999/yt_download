# Application Overview

## Description

This application is designed to fetch the latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Components

### 1. Database

The application relies on a MongoDB database to store and manage data. Key features of the database include:

- **Database Type:** MongoDB

- **Data Model:**

    - **Metadata Collection:**
    
        Stores all the metadata for the videos fetched by the microservice. Indexes are present on text and description of the video.

    - **API Keys Collection (To be made):**
    
        Purpose: Will store all the API keys to be used by the application. It will have the following schema:

        - API key: Unique alphanumeric text

        - ExpiredAt: Timestamp when the quota got exhausted

        - CostLeft: Number of units left for this query [describe the role of the database in the application]

### 2. Python Script

The application utilizes a Python script for calling the search API. Key aspects of the Python script include:

- **Script Name:** yt_service.py

- **Functionality:** Calls the YouTube search API and saves in the database

- **Dependencies:** The database has to be up for it to store the data.

#### TO DO: API KEY ROTATION:

- If we have exhausted the quota for the current key, then we will store its timestamp and fetch the next key.
- The logic to fetch the next key: Any key which has not been used for the current day and has the maximum of CostLeft.
- If we do not want our application to get a quota expired error, then for each query, we will calculate the units that could be used, and based on that, we will decide whether to use the current API key or not.
  - If it is less, we will try matching the expected cost < CostLeft for some other API Key.

### 3. Node.js Backend

The backend of the application is developed using Node.js and is responsible for fetching the data and showing it to the users.

- **Framework:** Express

- **API Endpoints:** /search

- **Middleware:** A middleware to sanitize the query has been used.

- **Interactions with the Database:** The application interacts with the backend using the native db drivers

#### TO DO:

- While fetching the YouTube videos for each video ID, only send back the data with the latest timestamp.

### 4. Dashboard

It is a dashboard responsible for calling the Node.js application and displaying the JSON results.

## Installation

1. **Open VSCode with the Docker extension:**

    - Starting the database and Node.js application: Right-click on the `docker-compose.yml` and it will bring up the database and Node application.

    - Start the `yt_service` to populate DB data:
        1. Go into the folder `yt_service` and run the `docker-compose.yml` file.
        2. Login to docker-desktop and see the logs for this image and validate data is stored.
        3. Check the DB if the data is there.

    - Use Postman to query the Node application:
        1. Starting the dashboard - Go to the folder `yt_dashboard` and run the command `streamlit run app1.py`.
