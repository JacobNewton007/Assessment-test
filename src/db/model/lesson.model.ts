
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../types/SequelizeAttributes';





export interface LessonAttributes {
  id?: string;
  name: string;
  startDate: string;
  duration: number
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonInstance
  extends Sequelize.Instance<LessonAttributes>,
  LessonAttributes {} 

  export const LessonFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
  ): Sequelize.Model<LessonInstance, LessonAttributes> => {
    const attributes: SequelizeAttributes<LessonAttributes> = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    };

    const Lesson = sequelize.define<LessonInstance, LessonAttributes>(
      'Lesson',
      attributes
    )

    return Lesson;
  }


