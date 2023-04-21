import { Sequelize } from 'sequelize';

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize('postgres', 'postgres', 'rocio_db', {
        host: 'rocio-db.cnmbxeqh2npc.us-east-1.rds.amazonaws.com',
        port: 5432,
        dialect: 'postgres',
      });
      Database.instance = this;
    }
    return Database.instance;
  }
}

const instance = new Database();

export default instance.sequelize;
