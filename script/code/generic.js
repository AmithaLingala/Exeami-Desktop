import jsFormater from "/script/code/js-rule.js";

function init(){
  const codes = document.getElementsByTagName('code');
  console.log(codes);
  for (let code of codes) {
    generateTags(code);
  }
}

function generateTags (code) {
  let data = code.innerHTML;
  // keywordsCSharp.forEach((word) => {
  //   data = data.replace(new RegExp("[^a-zA-Z0-9\\(\\)](\\s*)("+word+")\\s", "g"),'$1<span class="kwrd"> $2 </span>');
  // });



  data = data.replace(/(\"[^\"]+\")/g,'<span class="str">$1 </span>');
  data = data.replace(/(^\s*[a-zA-Z_0-9]* [^<a-zA-Z0-9\(=]*)/g,'<span class="kwrd">$1</span>')
  // data = data.replace(/\.([a-zA-Z_0-9]*[^<=\(]*)/g,'.<span class="clazz">$1</span>')
  code.innerHTML = data;
}
init();
