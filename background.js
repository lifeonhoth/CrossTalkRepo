//var test = "test"

var textJumbled;
var text;
var throughPut;
var toSearch;

// text corpus
var text = "As armas e os barões assinalados, Que da ocidental praia Lusitana, Por mares nunca de antes navegados, Passaram ainda além da Taprobana";



//Called when user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('It\'s all Greek to ' + tab.url);
  chrome.tabs.update({
     url: toSearch
	});
});

randomSelection();
replaceWhiteSpace();
	


// function for breaking down strings into smaller, parameter-determined chunks
function chunkString(str, len) {
  var _size = Math.ceil(str.length/len),
      _ret  = new Array(_size),
      _offset
  ;

  for (var _i=0; _i<_size; _i++) {
    _offset = _i * len;
    _ret[_i] = str.substring(_offset, _offset + len);
  }

  return _ret;

}


// selecting array index at random
function randomSelection(){
	var items = chunkString(text, 20);
	throughPut = items[Math.floor(Math.random()*items.length)];
}

// replacing white space with '+' character
function replaceWhiteSpace(){
	throughPut = throughPut.split(' ').join('+');
	textJumbled = throughPut; 
	
}

// sotrying url 
toSearch = "http://www.google.com/#q=" + textJumbled; 


console.log(throughPut);
console.log(textJumbled);
console.log(toSearch);


// TO DO:
// -- DONE --HOW TO CUT UP RESULTING STRING SO AS TO SEARCH ONLY ONE 20str PIECE AT A TIME? ARRAY INDEXING?
// -- DONE -- INSERT "+" IN PLACE OF EACH WHITE SPACE
// HANDLE CRAZY CHARS: CUT OUT , ' @ * etc.
// LOOP SO TASK IS PERFROMED CONTINUALLY (WITH SOME DELAY)
// HOW TO OPEN IN A NEW TAB INSTEAD OF USING ACTIVE TAB








