import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', '', {
    host: '0.0.0.0',
    dialect: 'mysql'
});

export default db;