

const serviceLocator = require('../lib/service_locator');
const config = require('./configs')();

serviceLocator.register('logger', () => require('../lib/logger').create(config.application_logging));

serviceLocator.register('httpStatus', () => require('http-status'));

serviceLocator.register('mongoose', () => require('mongoose'));

serviceLocator.register('errs', () => require('restify-errors'));

serviceLocator.register('birthdateService', () => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const BirthdateService = require('../services/birthdates');

  return new BirthdateService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('userService', () => {
  const log = serviceLocator.get('logger');
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const UserService = require('../services/user');

  return new UserService(log, mongoose, httpStatus, errs);
});

serviceLocator.register('birthdateController', () => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const birthdateService = serviceLocator.get('birthdateService');
  const BirthdateController = require('../controllers/birthdates');

  return new BirthdateController(log, birthdateService, httpStatus);
});

serviceLocator.register('userController', () => {
  const log = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const userService = serviceLocator.get('userService');
  const UserController = require('../controllers/user');

  return new UserController(log, userService, httpStatus);
});

module.exports = serviceLocator;
