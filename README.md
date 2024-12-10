
# College Appointment System

This is a Node.js and Express-based backend application that allows students to book appointments with professors. Professors can set their availability, and students can authenticate, view available slots, and book appointments.

## Features
- Professors can sign up and specify their availability.
- Students can sign up and authenticate to book appointments with professors.
- Appointment bookings are validated and stored in MongoDB.

## Prerequisites
Before you begin, ensure that you have met the following requirements:

- **Node.js** 
- **MongoDB and  MongoDb Compass(for local System)** 
- **Postman** - I have used this specifically for testing various test cases to make API calls

## Getting Started

### 1. Clone the Repository
First, clone the repository to your local machine. Either download the codebase as zip or use the git clone command

### 3. Install Dependencies
The first command you should run is 
```bash
npm install
```

### 4. Environment Variables
In the dotenv file enter your mongodb connection String (dont use "" for the string, write it directly. I messed with this:) ), JWT SECRET KEY and PORT 

### 5. Start the server

Than you can start the server 

```
npm start
```

###6. Use postman to test the server






