const validatorMiddlewares = {
  isUsername: (value) => {
    return /^[a-z][a-z0-9_]{0,24}$/i.test(value);
  },
};

export default validatorMiddlewares;
