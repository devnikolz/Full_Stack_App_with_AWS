const { check } = require('express-validator');

exports.linkCreateValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description should be at least 10 characters long'),
    check('url')
        .not()
        .isEmpty()
        .withMessage('URL is required'),
    check('categories')
        .not()
        .isEmpty()
        .withMessage('Pick a category'),
    check('type')
        .not()
        .isEmpty()
        .withMessage('Pick a type free/paid'),
    check('medium')
        .not()
        .isEmpty()
        .withMessage('Pick a medium video/book')
];


exports.linkUpdateValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('description')
        .not()
        .isEmpty()
        .withMessage('Description is required'),
    check('url')
        .not()
        .isEmpty()
        .withMessage('URL is required'),
    check('categories')
        .not()
        .isEmpty()
        .withMessage('Pick a category'),
    check('type')
        .not()
        .isEmpty()
        .withMessage('Pick a type free/paid'),
    check('medium')
        .not()
        .isEmpty()
        .withMessage('Pick a medium video/book')
];
