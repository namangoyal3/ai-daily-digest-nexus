
# Database Setup Guide

This document describes how to set up and configure the database for the newsletter subscription system.

## PostgreSQL Database Setup

### Connection Information
- **Host:** neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com
- **Port:** 5432
- **Database:** neuralnextgen
- **Username:** neuralnextgen
- **Password:** neuralnextgen1997 (change this for production)

### Setting Up Environment Variables
Create a `.env` file in the project root (do not commit this file) with the following variables:

```
VITE_DB_HOST=neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com
VITE_DB_PORT=5432
VITE_DB_NAME=neuralnextgen
VITE_DB_USER=neuralnextgen
VITE_DB_PASSWORD=neuralnextgen1997
```

### Creating Required Tables
Connect to the database and run the SQL commands from the `database-setup.sql` file:

```bash
psql "sslmode=require host=neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com port=5432 dbname=neuralnextgen user=neuralnextgen password=neuralnextgen1997" -f database-setup.sql
```

Or copy the commands from the file and execute them directly in a PostgreSQL client.

To manually connect to the database:

```bash
psql "sslmode=require host=neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com port=5432 dbname=neuralnextgen user=neuralnextgen password=neuralnextgen1997"
```

### Table Structure

#### newsletter_subscribers
- `id`: SERIAL PRIMARY KEY
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `subscribed_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

## Security Considerations
- For production, use a strong, unique password
- Consider using a dedicated database user with limited permissions
- Store database credentials in environment variables or a secrets manager
- Never expose your database credentials in client-side code

## API Integration
The application uses a serverless API endpoint at `/api/subscribe` to handle database operations securely.
This endpoint handles adding new subscribers while keeping database credentials secure on the server.
