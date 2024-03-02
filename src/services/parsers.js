// gets a string of game system requirements in html format and converts it to object
// format:<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong> Windows® 7 (32/64-bit)/Vista/XP<br>
export const htmlToSysReqArray = (sysReqHtml) => {
  // extract text from html code. output => os:   windows   graphics:  some card   ram:  how much
  const sysReqText = sysReqHtml.replace(/<[^>]*(>|$)| |‌|»|«|>/g, ' ');
  //   convert text to an array of sys req part string. output => [os:  windows, graphics:  some card]
  const sysReqParts = sysReqText.split('    ').slice(1);
  //   split part into two section. title and req. output => [[os,windows],[graphics,some card],...]
  const sysReqArray = sysReqParts.map((part) => part.split(':').map((p) => p.trim()));
  return sysReqArray;
};
