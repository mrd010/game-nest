const getUserLanguage = () => {
  const language = navigator.language;
  //   get only first part of language . ex: en-US => en
  return language.split('-')[0];
};

export default getUserLanguage;
