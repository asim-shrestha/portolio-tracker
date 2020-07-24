## Trendline:
Trendline is an app that helps users visualize and track their investment portfolios.

## Key Features:
- Ability to register a new account and login
- Ability to add information about individual stocks the user owns
- Ability to view the daily return for all stocks held by a user
- Ability to view graphs pertaining to user's stocks

## Setup:
    > sudo docker-compose build
    > sudo docker-compose up
    Travel to http://localhost:8080/ in your web browser

## Technology Stack:
- Express
- React
- Postgres
- Docker
- Nginx

## Notable dependencies:
- Material UI: A UI framework for React
- IEX Cloud: API for financial data
- Axios for front-end HTTP requests
- Recharts for React charting and data visualization
- Knex for data migration and seeding