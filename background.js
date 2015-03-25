/*    
   ______                    ______      ____  
  / ____/________  _________/_  __/___ _/ / /__
 / /   / ___/ __ \/ ___/ ___// / / __ `/ / //_/
/ /___/ /  / /_/ (__  |__  )/ / / /_/ / / ,<   
\____/_/   \____/____/____//_/  \__,_/_/_/|_|  

*/

// CrossTalk 2015
// v. 0.2
// fletcherbach.com


var text;
var throughput;
var toSearch;
var intervalID;
var isRunning = false;

// attaching text corpus to "text" variable
var text = "As armas e os barões assinalados, Que da ocidental praia Lusitana, Por mares nunca de antes navegados, Passaram ainda além da Taprobana";


// setting interval, calling all functions every 3 seconds
// ALSO CALL STOPTIMER
function startTimer(){
  intervalID = setInterval(callingAllFunctions, 5000);
  console.log("Here is a search query: " + toSearch)
}

function stopTimer(){
  clearInterval(intervalID);
}

// setting up functions to call
function callingAllFunctions() {
  stripChars();
  randomSelection();
  replaceWhiteSpace();
  constructURL();

  chrome.tabs.update({
    url: toSearch
  });

  //return throughput;
}

// breaking down strings into smaller, parameter-determined chunks
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

//stripping unwanted characters from text to prevent query choke later on
function stripChars(){
  text = text.replace(/õ/gi, "o");
  text = text.replace(/é/gi, "e");
  //add more / figure out a better way to handle
}


// selecting array index at random
function randomSelection(){
  var items = chunkString(text, 20);  // to adjust length of desired search terms, adjust parameters
  throughput = items[Math.floor(Math.random()*items.length)];
  return throughput;
}

// replacing white space with '+' character
function replaceWhiteSpace(){
  throughput = throughput.split(' ').join('+');
  return throughput;

}

// finalizing url to search
function constructURL() {
  toSearch = "http://www.google.com/#q=" + throughput;
  return toSearch;
}

// Called when user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  if (isRunning == true) { // if on, and user clicks off, stop timer
    stopTimer()
    isRunning = false;
  } else {                 // if off, and user clicks on, start timer again
    startTimer();
    isRunning = true;
  }
  console.log('It\'s all Greek to ' + tab.url);
  // chrome.tabs.update({
  //   url: toSearch
  // });
});


// TO DO:
// -- DONE -- HOW TO CUT UP RESULTING STRING SO AS TO SEARCH ONLY ONE 20str PIECE AT A TIME? ARRAY INDEXING?
// -- DONE -- INSERT "+" IN PLACE OF EACH WHITE SPACE
// -- DONE -- HANDLE UNWANTED CHARACTERS THAT CHOKE QUERY URL
// -- DONE -- LOOP SO TASK IS PERFROMED CONTINUALLY (WITH SOME DELAY) (use setInterval?)
// ATTACH TO OTHER TEXT CORPERA, LIVE OR STORED?
// HOW TO OPEN IN A NEW TAB INSTEAD OF USING ACTIVE TAB?
// ANIMATE ICON TO OFFER FEEDBACK TO USER WHEN EXTENSION IS TOGGELD ON OR OFF
