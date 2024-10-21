# node-nodes-CRUD-API

## Getting Started

### How to setup

- Ensure you have Node.js version 22.x.x (22.9.0 or higher) installed.
- Clone this repo

```
git clone https://github.com/annaAzh/node-nodes-CRUD-API.git .
```

- go to develop branch
- install required packages
  `npm install`

- Rename the `.env.example` file to `.env` and set the port:

```bash
mv .env.example .env
```

## Available Scripts

In the project directory, you can run the following commands:

### Development Mode

Start the project with live reloading using nodemon and ts-node:

```
npm run start:dev
```

This command watches for file changes and automatically restarts the server.

### Production Mode

Build the project and run the bundled code for production:

```
npm run start:prod
```

This will first run the build process using TypeScript and ESBuild, and then start the server from the bundled output.

### Linting

Run ESLint to check for code style and errors:

```
npm run lint
```

This will check all .ts files in the src/ directory.

### Formatting

Format your code using Prettier:

```
npm run format
```

This will format all .ts files in the src/ directory according to Prettier rules.

### Building the Project

Build the project with TypeScript and ESBuild:

```
npm run build
```

This compiles the TypeScript files to the dist/ folder and then bundles and minifies the output using ESBuild.

### Environment Variables

Make sure to configure the port by renaming the .env.example file to .env and setting your desired PORT value. Example:

```
PORT=4000
```

Once the environment variables are set, you can start the project in either development or production mode.

## API Endpoints

### Users

**Get all users**

```
GET /api/users
```

**Get user by ID**

```
GET /api/users/:id
```

**Create user**

```
POST /api/users
@body
{
username: string, required
age: number, required
hobbies: string[], required
}
```

**Update user by ID**

```PUT /api/users/:id
@params :id - UUID
@body
{
username: string, optional
age: number, optional
hobbies: string[], optional
}
```

**Delete user by ID**

```DELETE /api/users/:id
@params :id - UUID
```
