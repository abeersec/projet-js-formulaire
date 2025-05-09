const Joi = require('joi');

exports.signupSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: ['com','net'] } }).min(6).max(60).required().messages({
        'string.email': "L'email doit être valide.",
        'string.empty': "L'email est requis.",
        'any.required': "L'email est requis."
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required().messages({
        'string.pattern.base': "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
        'string.empty': "Le mot de passe est requis.",
        'any.required': "Le mot de passe est requis."
    }),
}); 

exports.signinSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: ['com','net'] } }).min(6).max(60).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
}); 

exports.acceptCodeSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: ['com','net'] } }).min(6).max(60).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
}); 

exports.changePasswordSchema = Joi.object({
    newPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
    oldPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
});

exports.acceptFPCodeSchema = Joi.object({
    email: Joi.string().email().required(),
    providedCode: Joi.number().required(),
    newPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
    oldPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')).required(),
});

exports.createPostSchema = Joi.object({
    title: Joi.string().min(6).max(60).required(),
    description: Joi.string().min(6).max(60).required(),
    userId: Joi.string().required(),
});

exports.updatePostSchema = Joi.object({
    title: Joi.string().min(6).max(60).required(),
    description: Joi.string().min(6).max(60).required()
  });