# Census Application

A backend REST API built with Express.js and MySQL, allowing an Admin to manage participant data.

## Deployed Application

Deployed to Render, link:

🔗 [Live App](https://server-deployment-ca-672m.onrender.com)

## Tech Stack

- Node.js / Express.js
- MySQL (hosted on Aiven)
- Deployed on Render

## Environment Variables

To run this project, please create a `.env` file in the root of the project with the following:

```env
PORT=3000
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Insert your own credentials inside the blank spaces :)


## API Endpoints

All endpoints require Basic Authentication and have been tested using Postman.

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/participants/add` | Add a new participant |
| GET | `/participants` | Get all participants |
| GET | `/participants/details` | Get all participants' names and email |
| GET | `/participants/details/:email` | Get one participant's personal details |
| GET | `/participants/work/:email` | Get one participant's work details |
| GET | `/participants/home/:email` | Get one participant's home details |
| PUT | `/participants/:email` | Update a participant |
| DELETE | `/participants/:email` | Delete a participant |

## Authentication

This app uses Basic Authentication. To access the endpoints use these credentials:

- **Username:** admin
- **Password:** P4ssword

In Postman, go to the Authorization tab, select Basic Auth and enter the credentials above, then test out the endpoints using the API Endpoints methods and routes.


## Setup and Installation

1. Clone the repository
2. Run `npm install`
3. Set up your `.env` file with your database credentials
4. Run the schema with `schema.sql` to set up the database
5. Start the server with `npm start`



Juat making sure the .env is not showing secrets tihi