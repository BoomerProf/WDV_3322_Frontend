const validateSignup = (req) => {
  let errors = {};
  let FAILURE = 'Registration Failed';
  // validate first name not blank
  if (
    req.body.fname.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(req.body.fname.trim())
  ) {
    errors.firstNameMsg =
      'First name must be more than 1 character and must contain letters only';
    errors.status = FAILURE;
  }

  // validate last name is not blank
  if (
    req.body.lname.trim().length < 2 ||
    !/^[A-Za-z]+$/.test(req.body.lname.trim())
  ) {
    errors.lastNameMsg =
      'Last name must be more than 1 character and must contain letters only';
    errors.status = FAILURE;
  }

  if (
    req.body.address.trim().length < 3 ||
    !/^[\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.']+$/.test(req.body.address.trim())
  ) {
    errors.addressMsg =
      'Address must be more than 2 character and must contain numbers and letters only';
    errors.status = FAILURE;
  }

  if (req.body.city.length < 2 || !/^[A-Za-z]+$/.test(req.body.city.trim())) {
    errors.cityMsg =
      'City must be more than 1 character and must contain letters only';
    errors.status = FAILURE;
  }

  if (
    req.body.state.length < 2 ||
    !/(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/.test(
      req.body.state
    )
  ) {
    errors.stateMsg = 'State must be 2 characters and a valid state initial';
    errors.status = FAILURE;
  }

  if (!/^\d{5}(?:[-\s]\d{4})?$/.test(req.body.zip)) {
    errors.zipMsg =
      'Zip code must be at least 5 characters and of the proper format (12345, 12345 1223, or 12345-1234)';
    errors.status = FAILURE;
  }
  // validate email not blank
  if (req.body.email.trim() == '') {
    errors.emailMsg = 'Email cannot be blank';
    errors.status = FAILURE;
  }
  // validate password is not blank
  if (req.body.password.trim() == '') {
    errors.passwordMsg = 'Password cannot be blank';
    errors.status = FAILURE;
  }
  // invalid email address format
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    errors.emailMsg = 'Invalid Email Address';
    errors.status = FAILURE;
  }
  // invaild password format
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password)) {
    errors.passwordMsg = 'Invalid Password format';
    errors.status = FAILURE;
  }

  // invaild password format
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.cpassword)) {
    errors.cpasswordMsg = 'Invalid Confirm Password format';
    errors.status = FAILURE;
  }
  // validate password is not blank
  if (req.body.password.trim() !== req.body.cpassword) {
    errors.cpasswordMsg = 'Passwords do not match';
    errors.status = FAILURE;
  }

  return errors;
};

const validateLogin = (req) => {
  let errors = {};
  let FAILURE = 'Login Failed';
  // validate email not blank
  if (req.body.email.trim() == '') {
    errors.emailMsg = 'Email cannot be blank';
    errors.status = FAILURE;
  }
  // validate password is not blank
  if (req.body.password.trim() == '') {
    errors.passwordMsg = 'Password cannot be blank';
    errors.status = FAILURE;
  }
  // invalid email address format
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    errors.emailMsg = 'Invalid Email Address';
    errors.status = FAILURE;
  }
  // invaild password format
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password)) {
    errors.passwordMsg = 'Invalid Password format';
    errors.status = FAILURE;
  }
  return errors;
};

module.exports = { validateLogin, validateSignup };
