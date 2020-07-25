## Trendline:
Trendline is an app designed to help users visualize and track their investment portfolios. After registering a new account, users have the ability to
add all of the investments they have made to their portfolio. It is here that their data is visualized graphically and tabularly with financial data connected through the IEX Cloud API.

## Key Features:
- Ability to register a new account and login
- Ability to add information about individual stocks the user owns
- Ability to view the total return for all stocks held by a user
- Ability to view graphs pertaining to user's stocks (More graph options will be available in the future)
- Alert messages through a snackbar package
- User login session kept track of through JWT

## Setup:
    > sudo docker-compose build
    > sudo docker-compose up
    Travel to http://localhost:8080/ in your web browser
    Register a new account or use the sample account below. (Sample account contains data)

## Sample account:
    Email: test@sfu.ca
    Password: 123456

## Future plans
- Ability to import a CSV file of their stock data
- More options for how the user wants to display their data
- Other undecided features

## Notes
- If you ever get a "Error: Request failed with status code 400" in the dashboard page, this is beacuse our IEX account is getting too many requests. You probably just need to wait a couple of seconds before hitting refresh.
- It is hard to see initially but the homepage scrolls down to reveal information about the app

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
- Objection.js for an ORM
- Passport.hs for authentication
- Notistack for snackbars 