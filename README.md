# Expiration Help
## Description
Pantry Pals is a web application designed to assist users in tracking the expiration dates of their food items. This project aims to reduce food waste by helping users manage their pantry and refrigerator contents more effectively.

## Table of Contents
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)
* [Deployment](#deployment)
* [Future Enhancements](#future-enhancements)

## Features
- User authentication and authorization
- Dashboard for viewing all tracked items
- Add, edit, and delete food items
- Set and manage expiration dates
- Categorize food items
- Reminder system for approaching expiration dates

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- React (assuming frontend is built with React)
- JWT for authentication
- Render for deployment

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your PostgreSQL database
4. Create a `.env` file with your database URL, JWT secret, and other necessary environment variables
5. Run database migrations and seed commands if applicable

## Usage
To use the application locally:
1. Start the server with `npm start`
2. Access the application through your web browser at `http://localhost:3000` (or whatever port you've configured)

For the deployed version, visit: https://p2-expiration-help.onrender.com/dashboard

## API Endpoints

- GET /api/items - Retrieve all food items for the authenticated user
- POST /api/items - Add a new food item
- PUT /api/items/:id - Update an existing food item
- DELETE /api/items/:id - Delete a food item

## License
NA License

## Contributing
We are not currently accepting contributions to this project.


## Questions

Please feel free to reach out to our collaborators.

## Collaborators

This project is a collaborative effort. Our team members are:

- [jknowles10](https://github.com/jknowles10)
- [daniels-pancakes](https://github.com/daniels-pancakes)
- [mlipscomb24](https://github.com/mlipscomb24)

We appreciate the hard work and contributions of all team members in making this project possible.


## Deployment
This application is deployed on Render. You can access it at:
https://p2-expiration-help.onrender.com/dashboard

## Future Enhancements
- Implement barcode scanning for easy item addition
- Integrate with smart refrigerator APIs
- Add meal planning features based on expiring items
- Implement push notifications for mobile devices
