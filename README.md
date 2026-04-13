# react-typescript-postgresql

## Setting up the Database:
# Prerequisites:
- Install nvm
- Update Node
- Install stable version of Postgresql 
- 

# Initialize the db
- `initdb /usr/local/var/postgresql@16` = format the hard drive
- - Creates file system + OS-level structure
- `brew services start postgresql@16` = boot the operation system
- - Runs the actual database engine
- test connection: `psql -h localhost postgres` => Successfully started `postgresql@16`
- `psql postgres` => "postgres=#". = terminal into the operating system
- - Client tool that connects to the database engine

### Create the backend:
- install NestJS CLI: `npm install -g @nestjs/cli`
- `nest new backend`
`cd backend`
`npm install`
- install dependencies: `npm install @nestjs/typeorm typeorm pg class-validator class-transformer`
- creat modules: `nest g module users`
`nest g controller users`
`nest g service users`
- enable cors in main.ts: `app.enableCors();`

### Postgresql setup for searching users (index name column)
- `psql postgres`
- `CREATE DATABASE search_demo;`
- `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  search_vector tsvector
);`
- Function to update tsvector column for indexing: `CREATE FUNCTION users_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', coalesce(NEW.name, ''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;`
- Make sure top update index when adding to the db: `CREATE TRIGGER tsvectorupdate
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION users_search_vector_update();`
- Create index: `CREATE INDEX idx_users_search ON users USING GIN(search_vector);`
- Seed sample data: `INSERT INTO users (name, phone) VALUES
('John Smith', '1234567890'),
('Johnny Doe', '1239999999'),
('Jane Doe', '5551234567');`
- Test a search: `SELECT id, name FROM users
WHERE search_vector @@ plainto_tsquery('english', 'john');`

- Test it: `GET http://localhost:3000/users?search=john`

### Frontend
- cd into root of search-practice
- `npm create vite@latest frontend -- --template react-ts`
- cd into frontend directory
- `npm install`
- `npm install tailwindcss`
- `npx shadcn-ui@latest init`
- - add shadcn components: `npx shadcn-ui@latest add input table button card skeleton`
- Add CSS in CSS file: @tailwind base;
@tailwind components;
@tailwind utilities;

### Run it all together:
- In one terminal, cd into backend and `npm run start:dev`
- In another terminal, cd into frontend and `npm run dev`
- http://localhost:5173 in browser