import langCodes from '../data/languageCode.json';

const getUserLanguage = () => {
  // get language alpha 2 from system
  const languageCode = navigator.language.split('-')[0].toLowerCase();
  // get language full name from data
  langCodes.find((lang) => lang.alpha2 === languageCode).English;
};

export default getUserLanguage;
