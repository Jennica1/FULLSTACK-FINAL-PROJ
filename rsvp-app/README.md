# Jennica - Backend
# Mia - Frontend/CSS
# Madeline - Frontend/CSS


## How to run code:
- npm install in frontend folder
- npm install in server folder

## How to run database:

### Step 1: Install PostgreSQL
- Download and install PostgreSQL: https://www.postgresql.org/download/

### Step 2: Ensure psql is set up correctly
- Windows: System -> Advance system settings -> Environmental Variables -> PATH -> Choose where PostgressQL is installed -> version -> bin -> Save -> Restart Computer
 
### Step 3: Run PostgresSQL
Check if it's running:

- Windows -> run: pg_isready
- Mac -> run: brew services start postgresql

### Step 4: Run database
Ensure you're within server folder of rsvp-app

- run: pg_restore -U postgres -d rsvp_db -v rsvp_db_backup.dump

### Step 5: Verify if its running
- Connect to database. Run: psql -U postgres -d rsvp_db
- Check if tables exist. Run: \dt

### Troubleshooting
If You Get "Database Does Not Exist" Error
Run:
- createdb -U postgres rsvp_db
- retry. Run: pg_restore.

If You Get "Permission Denied" Error
- Run: sudo -u postgres pg_restore -U postgres -d rsvp_db -v rsvp_db_backup.dump