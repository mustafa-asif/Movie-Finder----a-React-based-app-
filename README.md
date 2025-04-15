# Movie Finder

A **React**-based web application that allows users to search for movies, discover popular titles, and view trending movies based on user search counts. The app leverages the [TMDB API](https://www.themoviedb.org/documentation/api) for movie data and uses **Appwrite** as a backend service to track search metrics and display trending movies.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)



## Features

- **Movie Search**: Search for movies by title with debounced input to minimize unnecessary API calls.
- **Popular Movies**: Browse a list of popular movies sorted by popularity.
- **Trending Movies**: View top 5 trending movies based on user search counts stored in Appwrite.
- **Responsive UI**: Built with Tailwind CSS for mobile-first, responsive design.
- **Loading Indicators**: Display a spinner while fetching data.



## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Appwrite (Databases)
- **APIs**: TMDB API (The Movie Database)
- **Language**: JavaScript (ES6+), HTML, CSS



## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- npm (comes with Node.js)
- TMDB API key
- Appwrite project with a database and collection set up



## Installation

1. **Clone the repository**

   
   git clone https://github.com/mustafa-asif/Movie-Finder----a-React-based-app-.git
   
   cd Movie-Finder----a-React-based-app-
  

3. **Install dependencies**

   
   npm install
   

4. **Configure environment variables**

   Create a .env file in the project root and add the following 

   
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id_here
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id_here
   

## Environment Variables

| Variable                     | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| VITE_TMDB_API_KEY          | API key from TMDB (The Movie Database)              |
| VITE_APPWRITE_PROJECT_ID  | Your Appwrite project ID                            |
| VITE_APPWRITE_DATABASE_ID | ID of the database in Appwrite to store search data |
| VITE_APPWRITE_COLLECTION_ID| ID of the collection for search records             |









