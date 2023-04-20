export const picurlMatch = str => {
  let picReg = /https?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+(\.((png!thumbnail)|(png)|(jpg)|(webp)))/
  let picurl = str.match(picReg) ? str.match(picReg)[0] : null
  return picurl
}
