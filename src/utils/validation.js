const LoginValidation = (email, password) => {
  return (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
    password.length >= 4
  );
};

const LoginEmailValidation = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);
};

const LoginPasswordValidation = (password) => {
  return password.length < 4;
};

const SignUpValidation = (email, password, name) => {
  return (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
    password.length >= 4 &&
    name.length > 0
  );
};

const SignUpEmailValidation = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);
};

const SignUpPasswordValidation = (password) => {
  return password.length >= 4;
};

const SignUpNameValidation = (name) => {
  return name.length > 0;
};

const NewItemValidation = (itemName, itemLink, weatherType) => {
  return (
    itemName.length > 0 &&
    itemLink.length > 0 &&
    ["Hot", "warm", "cold"].includes(weatherType)
  );
};

const NewItemNameValidation = (itemName) => {
  return itemName.length > 0;
};

const NewItemLinkValidation = (itemLink) => {
  return itemLink.length > 0;
};

export {
  LoginValidation,
  LoginEmailValidation,
  LoginPasswordValidation,
  SignUpValidation,
  SignUpEmailValidation,
  SignUpPasswordValidation,
  SignUpNameValidation,
  NewItemValidation,
  NewItemNameValidation,
  NewItemLinkValidation,
};
