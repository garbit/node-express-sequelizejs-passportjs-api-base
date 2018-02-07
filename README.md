# Configure
Add your database and session key in the configuration files:
```
config/db.js
.env
```

# Db Setup
To set up the database for this project use the [SequelizeJs CLI](https://github.com/sequelize/cli) and ensure you have entered your db credentials in the config/db.js (see db.example.js)

```
sequelize db:create
```

# Running
To run, use the docker-compose command to spin up the container and run the proejct

```
docker-compose up -d
```
