const has_ktp = (string) => {
  var find = /(\d{3}-\d{2}-\d{4})/g;
  return find.test(string);
}

console.log('has_ktp if it has what looks like a nomor KTP')
console.log(has_ktp("please don't share this: 234-60-1422") === true) // true

console.log("has_ktp if it doesn't have a nomor KTP")
console.log(has_ktp('please confirm your identity: XXX-XX-1422') === false) // true


const grab_ktp = (string) => {
  var find = /(\d{3}-\d{2}-\d{4})/g;
  var match = string.match(find);

  if(match != null){
    return match[0];
  }else {
    return match;
  }

}

console.log('grab_ktp returns nomor KTP if the string has an nomor KTP')
console.log(grab_ktp("please don't share this: 234-60-1422") === '234-60-1422') // true

console.log("grab_ktp if it doesn't have a nomor KTP")
console.log(grab_ktp('please confirm your identity: XXX-XX-1422') === null) // true
