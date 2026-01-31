<h1 align="center">Toyota (Car Rental System)</h1> 

## Live Links:
## Repository Links:
## ER-Diagram:
## Features:
## Limitations & Future Improvements:
## Tech Stack:
TypeScript, Node.js, Express, MongoDB, Zod, Mongoose, Firebase Authentication, dotenv, cors
## Authentication & Security:
## Validation & Error Handling:
## Project Architecture:

```
src/
│
├── app.ts
├── server.ts
│
├── config/
│   ├── db.ts
│   └── env.ts
│
├── modules/
│   └── notes/
│       ├── notes.route.ts
│       ├── notes.controller.ts
│       ├── notes.service.ts
│       ├── notes.validation.ts
│       └── notes.types.ts
│
├── middlewares/
│   └── validate.ts
│
└── utils/
    └── 
```
## What I Learn:
- How to make authorize email middleware that checks all kind of request email:

```ts
import { Response, NextFunction } from 'express'
import { AuthRequest } from './verifyToken.js'

export const authorizeEmail = (req: AuthRequest, res: Response, next: NextFunction) => {
    const emailFromToken = req.decoded?.email

    const emailFromRequest = req.params.email || req.query.email || req.body.email

    if (!emailFromToken || emailFromToken !== emailFromRequest) {
        return res.status(403).json({ message: 'Forbidden access' })
    }

    next()
}
```

it works for:

GET /cars/email/:email → req.params.email

GET /cars?email=... → req.query.email

POST /cars → req.body.email

Key takeaway: Using a single consistent field (em

## Challenges I Faced:
## API Documentation:
## Environment Variables
## Installation & Setup:

1. Clone the Repository: 

```bash
git clone ........
```

2. Install Dependencies:

```bash
npm install
```

3. Create a .env File with: 

```
MONGODB_URI=Your MongoDB URI
PORT= Your Port
```

4. Start the Development Server(For locally testing):

```bash
npm run dev
```

## Contact: 

Email: contact2tamim@gmail.com | LinkedIn: https://www.linkedin.com/in/tamim-muhammad

--- 

If you like this project, feel free to give it a star ⭐!