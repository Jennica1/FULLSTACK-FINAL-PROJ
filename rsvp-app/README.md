## How to run code:
- npm install in frontend folder
- npm install in server folder

## How to run database:

### Step 1: Install PostgreSQL
- Download and install PostgreSQL: https://www.postgresql.org/download/

### Step 2: Ensure psql is set up correctly
- Windows: System -> Advance system settings -> Environmental Variables -> PATH -> Choose where PostgressQL is installed -> version -> bin -> Save -> Restart Computer
- Mac  
### Step 3: Run PostgresSQL
- Windows -> bash: pg_isready
- Mac -> bash: brew services start postgresql
### Step 4: Run database
- Ensure you're within server folder of rsvp-app
- run: pg_restore -U postgres -d rsvp_db -v rsvp_db_backup.dump

