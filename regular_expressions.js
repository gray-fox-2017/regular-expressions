'use strict'

// Determine whether a string contains a nomor KTP
const has_ktp = (string) => {
  return /\d{3}-\d{2}-\d{4}/g.test(string);
}

console.log('has_ktp if it has what looks like a nomor KTP')
console.log(has_ktp("please don't share this: 234-60-1422") === true) // true

console.log("has_ktp if it doesn't have a nomor KTP")
console.log(has_ktp('please confirm your identity: XXX-XX-1422') === false) // true

// -----------------------------------------------------------------------------
// Return the Social Security number from a string.
const grab_ktp = (string) => {
  let ktp=string.match(/\d{3}-\d{2}-\d{4}/g);
  if(ktp!==null) {
    return ktp[0];
  } else {
    return null;
  }
}

console.log('grab_ktp returns nomor KTP if the string has an nomor KTP')
console.log(grab_ktp("please don't share this: 234-60-1422") === '234-60-1422') // true

console.log("grab_ktp if it doesn't have a nomor KTP")
console.log(grab_ktp('please confirm your identity: XXX-XX-1422') === null) // true

// -----------------------------------------------------------------------------

// Return all of the Social Security numbers from a string.
const grab_all_nomor_ktp = (string) => {
  let ktp=string.match(/\d{3}-\d{2}-\d{4}/g);
  if(ktp!==null) {
    return ktp;
  } else {
    return [];
  }
}

console.log('grab_all_nomor_ktp returns all nomor KTP if the string has any nomor KTP')
console.log(grab_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762')) // return ["234-60-1422", "350-80-0744", "013-60-8762"])

console.log("grab_all_nomor_ktp returns an empty Array if it doesn't have any nomor KTP")
console.log(grab_all_nomor_ktp('please confirm your identity: XXX-XX-1422')) // return []

// -----------------------------------------------------------------------------

// Obfuscate all of the nomor KTP in a string. Example: XXX-XX-4430.
const hide_all_nomor_ktp = (string) => {
  let ktp=string.match(/\d{3}-\d{2}-\d{4}/g);
  if(ktp!==null) {
    for(let i=0;i<ktp.length;i++) {
      ktp[i]='XXX-XX-'+ktp[i].match(/\d{4}/g)
    }
    return ktp.join(', ');
  } else {
    return string;
  }
}

console.log('hide_all_nomor_ktp obfuscates any nomor KTP in the string')
console.log(hide_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762')) // "XXX-XX-1422, XXX-XX-0744, XXX-XX-8762"

console.log('hide_all_nomor_ktp does not alter a string without nomor KTP in it')

let hideString = 'please confirm your identity: XXX-XX-1422'
console.log(hide_all_nomor_ktp(hideString) === hideString) // true

// -----------------------------------------------------------------------------

// Ensure all of the Social Security numbers use dashes for delimiters.
// Example: 480.01.4430 and 480014430 would both be 480-01-4430.
const format_nomor = (string) => {
  let arr=string.split(' ');
  let ktp=[];
  let hitungKtp=0;
  for(let i=0;i<arr.length;i++) {
    ktp[i]=arr[i].match(/\d{3}.?\d{2}.?\d{4}/g);
    if(ktp[i]!==null) {
      ktp[i]=ktp[i].toString();
      if(ktp[i].length<11) {
        let formatKtp=ktp[i].split('');
        formatKtp.splice(3,0,'-');
        formatKtp.splice(6,0,'-');
        ktp[i]=formatKtp.join('');
      } else if(ktp[i].length==11) {
        let formatKtp=ktp[i].split('');
        formatKtp[3]='-';
        formatKtp[6]='-';
        ktp[i]=formatKtp.join('');
      }
    }
    if(ktp[i]!==null) hitungKtp++;
  }
  if(hitungKtp>0) {
    let newArray=[];
    for(let i = 0; i < ktp.length; i++) {
      if (ktp[i]) {
        newArray.push(ktp[i]);
      }
    }
    return newArray.join(', ');
  }
  return arr.join(' ');
}

console.log(format_nomor('234601422, 350.80.0744, 013-60-8762'))
console.log('format_nomor finds and reformat any nomor KTP in the string')
console.log(format_nomor('234601422, 350.80.0744, 013-60-8762') === '234-60-1422, 350-80-0744, 013-60-8762') // true

console.log('format_nomor does not alter a string without nomor KTP in it')

let formatString = 'please confirm your identity: 44211422'
console.log(format_nomor(formatString) === formatString) // true

module.exports = {
  has_ktp,
  grab_ktp,
  grab_all_nomor_ktp,
  hide_all_nomor_ktp
}
