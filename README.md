<h1 align="center">RENTAX - Backend</h1> 

A full-stack **car rental management platform**  that enables customers to rent vehicles online, sellers to manage their vehicles, and admin to control the entire marketplace.

- [Explanation:](#explanation)
- [Live Links:](#live-links)
- [Repository Links:](#repository-links)
- [Features:](#features)
- [Tech Stack:](#tech-stack)
- [Project Architecture:](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Zod Validation Schema:](#zod-validation-schema)
- [What I Learn:](#what-i-learn)
- [Challenges I Faced:](#challenges-i-faced)
- [Limitations:](#limitations)
- [Environment Variables](#environment-variables)
- [Installation \& Setup:](#installation--setup)
- [Contact:](#contact)


## Explanation: 

## Live Links:
- Client: https://web-project-28-client.vercel.app/ 
- Server: https://web-project-28-server.vercel.app/

## Repository Links:
- Client: https://github.com/muhammad-tamim/web-project-28-client
- Server: https://github.com/muhammad-tamim/web-project-28-server

## Features:
- Authorization using firebase
- Car, User, Bookings, categories, brands Management
- Payment Integration (Stripe and SSLCommerz)

## Tech Stack:
**Core Technologies:** 
- Node, Express, TypeScript, MongoDB, Zod
**Libraries & Packages:** 
- cors, dotenv, exceljs, nodemailer, date-fns, firebase-admin
**Payments:** 
- Stripe (For International Payment)
- SSLCommerz (For Bangladesh Payment)

## Project Architecture:
This project follows modular architecture where each independent feature have their routes, controllers and services.

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
│   └── feature1/
│       ├── feature1.route.ts
│       ├── feature1.controller.ts
│       ├── feature1.service.ts
│       ├── feature1.validation.ts
│       └── feature1.types.ts
│
├── middlewares/
│
└── utils/
    └── 
```

## API Endpoints

**Cars:**
```
GET    /cars                     -> Get all cars
GET    /cars/count               -> Get total number of cars
GET    /cars/recent              -> Get recently added cars
GET    /cars/premium             -> Get premium cars
GET    /cars/search              -> Search cars
GET    /cars/brands/:brand       -> Get cars by brand
GET    /cars/categories/:category-> Get cars by category
GET    /cars/owner/:email        -> Get cars by seller email (Protected)

GET    /cars/:id                 -> Get single car

POST   /cars                     -> Create new car (Seller only)
PATCH  /cars/:id                 -> Update car (Seller only)
DELETE /cars/:id                 -> Delete car (Seller only)
```

**Users:**
```
POST   /users                    -> Create user

GET    /users                    -> Get all users (Admin only)

GET    /users/count              -> Get total user count
GET    /users/count/customer     -> Get total customers
GET    /users/count/seller       -> Get total sellers
GET    /users/count/admin        -> Get total admins

GET    /users/recent-customers   -> Get recently registered customers
GET    /users/recent-sellers     -> Get recently registered sellers

GET    /users/:email             -> Get user by email (Protected)

PATCH  /users/update/:id         -> Update user role (Admin only)
```

**Brands:**
```
GET    /brands           -> Get all brands
GET    /brands/count     -> Get total brands

POST   /brands           -> Create brand (Admin only)
PATCH  /brands/:id       -> Update brand (Admin only)
DELETE /brands/:id       -> Delete brand (Admin only)
```

**Categories:**
```
GET    /categories       -> Get all categories
GET    /categories/count -> Get total categories

POST   /categories       -> Create category (Admin only)
PATCH  /categories/:id   -> Update category (Admin only)
DELETE /categories/:id   -> Delete category (Admin only)
```

**Stripe Payment:**
```
POST   /stripe/init      -> Initialize Stripe checkout session
POST   /stripe/success   -> Handle successful payment
POST   /stripe/cancel    -> Handle cancelled payment
POST   /stripe/validate  -> Validate Stripe payment
```
**SSLCommerz Payment:**
```
POST   /sslcommerz/init      -> Initialize payment
POST   /sslcommerz/success   -> Handle successful payment
POST   /sslcommerz/failure   -> Handle failed payment
POST   /sslcommerz/validate  -> Validate SSLCommerz payment
```

## Zod Validation Schema:

**Car:**
```
import { z } from 'zod'

export const createCarSchema = z.object({
  name: z.string().min(2),
  model: z.string().min(2),
  year: z.number().int(),
  brand: z.string(),
  category: z.string(),
  description: z.string().min(5),
  dailyRentalPrice: z.coerce.number().positive(),
  registrationNumber: z.string().min(3),
  features: z.string().min(1),
  photoUrl: z.url(),
  email: z.email()
})

export const updateCarSchema =
  createCarSchema
    .omit({ email: true })
    .partial()
```

**Brand:**
```
import { z } from 'zod'

export const createBrandSchema = z.object({
  name: z.string().min(2),
  photoUrl: z.url(),
  isActive: z.boolean().optional().default(true)
})

export const updateBrandSchema =
  createBrandSchema
    .omit({ name: true })
    .partial()
```

**Category:**
```
import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(2),
  photoUrl: z.url(),
  isActive: z.boolean().optional().default(true)
})

export const updateCategorySchema =
  createCategorySchema
    .omit({ name: true })
    .partial()
```

**User:**
```
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  photoUrl: z.url(),
  role: z.string().optional().default('customer'),
  wantToSellerRequest: z.boolean().optional().default(false)
})

export const updateUserSchema =
  createUserSchema
    .omit({
      name: true,
      email: true,
      photoUrl: true
    })
    .partial()
```

**SSLCommerz Payment:**
```
import { z } from 'zod'

export const initPaymentSchema = z.object({
  carId: z.string().min(1),

  product_name: z.string().min(2),

  cus_name: z.string().min(2),
  cus_email: z.email(),
  cus_add1: z.string().min(3),
  cus_city: z.string().min(2),
  cus_postcode: z.string().min(3),
  cus_country: z.string().min(2),
  cus_phone: z.string().min(6),

  startDate: z.string(),
  endDate: z.string()
})

export const validatePaymentSchema = z.object({
  tran_id: z.string().min(1),
  val_id: z.string().min(1)
})
```

**Stripe Payment:**
```
import { z } from 'zod'

export const initPaymentSchema = z.object({
  carId: z.string().min(1),

  product_name: z.string().min(2),

  cus_name: z.string().min(2),
  cus_email: z.email(),
  cus_add1: z.string().min(3),
  cus_city: z.string().min(2),
  cus_postcode: z.string().min(3),
  cus_country: z.string().min(2),
  cus_phone: z.string().min(6),

  startDate: z.string(),
  endDate: z.string()
})

export const validatePaymentSchema = z.object({
  tran_id: z.string().min(1),
  val_id: z.string().min(1)
})
```

**Booking:** 
```
import { z } from 'zod'

export const createBookingSchema = z.object({
  tran_id: z.string().min(1)
})
```

## What I Learn:
- Designing modular backend architecture
- Implementing schema validation with Zod
- Creating secure authorization middleware
- Integrating multiple payment gateways
- Structuring scalable TypeScript Express APIs

## Challenges I Faced:
- Handling multiple payment gateway integrations
- Managing booking state consistency
- Implementing secure authorization middleware
- Maintaining clean modular architecture

## Limitations:
- No Refund system
- Booking cancellation does not enforce time restrictions
- No Notification system

## Environment Variables

```
MONGODB_URI=....
CLIENT_URL=https://web-project-28-client.vercel.app
SERVER_URL=https://web-project-28-server.vercel.app
STORE_ID=....
STORE_PASSWORD=....
GOOGLE_APP_user=....
GOOGLE_APP_PASSWORD=.....
PORT=....
STRIPE_SECRET_KEY=....
FB_SERVICE_KEY=....
```

## Installation & Setup:

1. Clone the Repository: 

```bash
git clone https://github.com/muhammad-tamim/web-project-28-server.git 
```

2. Install Dependencies:

```bash
npm install
```

3. Create a .env File with: 

```
MONGODB_URI=....
CLIENT_URL=https://web-project-28-client.vercel.app
SERVER_URL=https://web-project-28-server.vercel.app
STORE_ID=....
STORE_PASSWORD=....
GOOGLE_APP_user=....
GOOGLE_APP_PASSWORD=.....
PORT=....
STRIPE_SECRET_KEY=....
FB_SERVICE_KEY=....
```

4. Start the Development Server(For locally testing):

```bash
npm run dev
```

## Contact: 

Email: contact2tamim@gmail.com | LinkedIn: https://www.linkedin.com/in/tamim-muhammad