
# Database Setup Guide

This document describes how to set up and configure the database for the newsletter subscription system.

## PostgreSQL Database Setup

### Connection Information
- **Host:** neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com
- **Port:** 5432
- **Database:** neuralnextgen
- **Username:** neuralnextgen

### Setting Up Environment Variables
Create a `.env` file in the project root (do not commit this file) with the following variables:

```
VITE_DB_HOST=neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com
VITE_DB_PORT=5432
VITE_DB_NAME=neuralnextgen
VITE_DB_USER=neuralnextgen
VITE_DB_PASSWORD=your_secure_password
VITE_DB_USE_SSL=true
```

### Creating Required Tables
Connect to the database and run the SQL commands from the `database-setup.sql` file:

```bash
psql -h neuralnextgen.c3goisis4quk.eu-north-1.rds.amazonaws.com -p 5432 -U neuralnextgen -d neuralnextgen -f database-setup.sql
```

Or copy the commands from the file and execute them directly in a PostgreSQL client.

### Table Structure

#### newsletter_subscribers
- `id`: SERIAL PRIMARY KEY
- `email`: VARCHAR(255) UNIQUE NOT NULL
- `subscribed_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

## Security Considerations
- Use a strong, unique password for database access
- Consider using a dedicated database user with limited permissions
- Ensure SSL is enabled for database connections
- Never store database credentials in your version control system

## Production Deployment
For production deployment, consider:
- Using environment variables or a secrets manager for credentials
- Setting up connection pooling for better performance
- Implementing proper backup procedures
