
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../types/SequelizeAttributes';





export interface UserAttributes {
  id?: string;
  childName: string; 
  email: string; 
  phoneNumber: number; 
  countryCode: number; 
  password: string; 
  confirmPassword: string; 
  grade: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance
  extends Sequelize.Instance<UserAttributes>,
  UserAttributes {} 

  export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
  ): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
      childName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.INTEGER,
      },
      grade: {
        type: DataTypes.STRING,
      },
    };

    const User = sequelize.define<UserInstance, UserAttributes>(
      'User',
      attributes
    )

    return User;
  }


