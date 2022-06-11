import * as Sequelize from 'sequelize';

import { CreatorAttributes, CreatorInstance } from '../../db/models/creator.model'
import { AdminAttributes, AdminInstance } from '../../db/models/admin.model'
import { PostAtrributes, PostInstance } from '../../db/models/post.model';
import { ReviewAttributes, ReviewInstance } from '../../db/models/review.model';
import { CommentAttributes, CommentInstace } from '../../db/models/comment.model';
import { TipAttributes, TipInstance } from '../../db/models/tips.model';
import { TipReviewAttributes, TipReviewInstance } from '../../db/models/tip_review.model';

export default interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Lesson: Sequelize.Model<LessonInstance, LessonAtrributes>;
}
