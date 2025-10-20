# Brand Data Transformation and Seeding

A Node.js TypeScript project for transforming and seeding brand data using MongoDB and Mongoose.

## Overview

This project provides utilities to:

- Transform existing brand data to match a standardized schema
- Seed the database with fake brand data using Faker.js
- Export seeded data to Excel format for documentation

## Features

- **Data Transformation**: Cleans and standardizes brand data fields
- **Data Seeding**: Generates realistic fake brand data
- **Excel Export**: Documents seeded data in Excel format
- **MongoDB Integration**: Uses Mongoose for database operations
- **TypeScript**: Full type safety and modern ES modules

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your MongoDB connection in `src/db.ts`

## Usage

### Transform Existing Data

Transform existing brand data to match the standardized schema:

```bash
npm run brands:transform
```

This script will:

- Connect to your MongoDB database
- Find all existing brand documents
- Transform field names and data types to match the schema
- Clean up old/unused fields
- Provide transformation progress feedback

### Seed New Data

Generate and insert fake brand data:

```bash
npm run brands:seed
```

This script will:

- Generate 10 fake brand records using Faker.js
- Insert the data into your MongoDB database
- Export the seeded data to `seeded-brands.xlsx`
- Provide confirmation of successful seeding

## Data Schema

The Brand model includes the following fields:

- `brandName` (String, required): The name of the brand
- `yearFounded` (Number, required): Year the brand was founded (1600-present)
- `headquarters` (String, required): Location of brand headquarters
- `numberOfLocations` (Number, required): Total number of brand locations (min: 1)
- `createdAt` (Date): Auto-generated timestamp
- `updatedAt` (Date): Auto-generated timestamp

## Project Structure

```
src/
├── db.ts                 # Database connection configuration
├── models/
│   └── brands-schema.ts  # Mongoose brand schema definition
├── transform-brands.ts          # Data transformation script
└── seed-brands.ts       # Data seeding script
```

## Dependencies

- **mongoose**: MongoDB object modeling
- **@faker-js/faker**: Generate fake data
- **xlsx**: Excel file generation
- **typescript**: TypeScript support
- **ts-node**: TypeScript execution

## Author

ESlam Amin

## License

ISC
