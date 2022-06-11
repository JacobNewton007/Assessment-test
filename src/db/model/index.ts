import sequelize, { Sequelize } from 'sequelize';
import  DbInterface  from '../../types/DbInterface';
import sequelizeConfig from '../config.json';
import { log } from '../../helpers/index.helpers';
import { UserFactory } from './user.model'
import { LessonFactory } from './lesson.model';
import { NODE_ENV } from '../../constants/index.constants';


const createModels = (sequelizeConfig: any): DbInterface => {
  let sequelize: any;
  if (NODE_ENV == 'development') {
    const { database, username, password } = sequelizeConfig;
    sequelize = new Sequelize(database, username, password, {
      dialect: "postgres",
      logging: false,
      operatorsAliases: false,
      dialectOptions: {
        multipleStatements: true
      },
    });
  } else if (NODE_ENV == "production") {
    const connection_uri = String(process.env.DATABASE_URL)
    sequelize = new Sequelize(connection_uri, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        },
        multipleStatements: true
      },
    });
  } else if (NODE_ENV == 'test') {
    const { database, username, password } = sequelizeConfig;
    sequelize = new Sequelize(database, username, password, {
      dialect: "postgres",
      logging: false,
      operatorsAliases: false,
      dialectOptions: {
        multipleStatements: true
      },
    });
  }
  log('Successfully connected to database');
  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Lesson: LessonFactory(sequelize, Sequelize),

  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // migrations


  return db;
};

/**
 * Open connction to the DB
 */
const env = NODE_ENV || 'development';
const db = createModels(sequelizeConfig[env]);
db.sequelize.sync();

export default db;