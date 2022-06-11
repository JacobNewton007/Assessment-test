import Joi from 'joi';

/**
 * Validator for user details during registration
 * @validator
 */

 export const registerUserValidation: any = Joi.object({
  childName: Joi.string().required(), 
  email: Joi.string().required(),
  phoneNumber: Joi.number().required(), 
  countryCode: Joi.number().required(), 
  password: Joi.string().required(), 
  confirmPassword: Joi.string().required(), 
  grade: Joi.string().required(), 
});

export const createLessonVerification: any = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.string().required(),
  duration: Joi.number().required()
})

/**
 * validator for user login
 * @validator
 */
 export const loginVerification: any = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(), 
})
