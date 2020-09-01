


// mapped() returns an object where the keys are the field names, and the values are the validation errors

// Gets the first validation error of each failed field in the form of an object.
module.exports = {
    getErrors(errors, prop) {
      try {
        return errors.mapped()[prop].msg;
      } catch (err) {
        return '';
      }
    }
  };
  