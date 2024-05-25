// ==UserScript==
// @name            DuckDuckGO - Extended 5
// @description     Extends DuckDuckGo by adding a customizable list of additional search engines for making fast searches from other engines.
// @homepage        https://github.com/dodog/DDG-Extended
// @icon            https://raw.githubusercontent.com/dodog/DDG-Extended/main/resources/large.png
// @include         *://duckduckgo.com/?q=*
// @match           *://duckduckgo.com/*
// @require         *://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @license         MIT
// @version         1.0.2
// @updateURL       https://github.com/dodog/DDG-Extended/raw/main/src/DuckduckGo_MExtended.user.js
// @author          Shubham Singh
// ==/UserScript==
//[Based on DuckduckMenu script from Shubham Singh](https://github.com/ishubhamsingh2e/Advance_DDG)
//Styles

function addGlobalStyle(css) {
  var head,
  style;
  head = document.getElementsByTagName('head') [0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
//Main Menu Style
//addGlobalStyle('.ddg_extented { background-color: #FAFAFA; height: auto; float:left; position:relative; top:40px; left:10%;z-index:999 }');
addGlobalStyle('.ddgm { background-color: #FAFAFA; height: 30px; float:left; position:relative; top:0px; left:158px; z-index:999 }');
//Button Style


//addGlobalStyle('.body #header_wrapper #header #header_content_wrapper #header_content #header_button_wrapper #header_button #header_button_menu_wrapper #header_button_menu li.disabled {display: none!important;}');

addGlobalStyle('.ddgmbtn { float:left; width:100%; position:relative; top:0px; z-index:999; background-color: #FAFAFA;  width: auto; text-align: center; padding: 2px 6px 6px 6px; font-size:1.0em; font-weight:300; color: black;}');
addGlobalStyle('.ddgmbtn:hover { background-color: #FAFAFA; color: black; text-decoration:none;}');
addGlobalStyle('.ddgmbtn:visited {color: black;}');
//Custom Engine Style
addGlobalStyle('.cddgmbtn { background-color: #FAFAFA;}');
//Engine Add Style
addGlobalStyle('.addengine { float: right;}');
addGlobalStyle('.addengine:hover { background-color: #FAFAFA; color: black; text-decoration:none;}');
addGlobalStyle('.addengine:visited {background-color: #FAFAFA; color: black;}');
//Edit Menu Style
addGlobalStyle('.enginedit { float: right;}');
addGlobalStyle('.enginedit:hover { background-color: #FAFAFA; color: black; text-decoration:none;}');
addGlobalStyle('.enginedit:visited {background-color: #FAFAFA; color: black;}');
addGlobalStyle('.removex { background-color: #FAFAFA; color: black; font-weight: bold; position:relative;}');
addGlobalStyle('.removex:visited {background-color: #FAFAFA; color: black;}')
addGlobalStyle('.removex:hover { background-color: #FAFAFA; color: black; text-decoration:none;}');
addGlobalStyle('.ddgembtn { float: right; background-color: #FAFAFA;  width: auto;  position:relative; top:0px; z-index:999; padding: 2px 6px 6px 6px; font-size:1.0em; font-weight:300; color: black; text-decoration: none;}');
addGlobalStyle('.ddgembtn:hover { background-color: #FAFAFA; color: black; text-decoration:none;}');


//-DDG-//
function ddm() {
  //Create Menu
  var searchVal = $('#search_form_input').val();
  $('<div>').addClass('ddgm').attr('id', 'ddg_extented').appendTo('.header');
  //Load default Engines
  function LoadDefault() {
    var gname = GM_getValue('ddgmDisEngines', 'empty');
    var dname;
    var durl;
    for (var i = 0; i < 6; i++) {
      switch (i) {
        case 0:
          dname = 'MapyCZ';
          durl = 'https://sk.mapy.cz/turisticka?q=';
          break;
        case 1:
          dname = 'GoogleMaps';
          durl = 'http://maps.google.com/maps?q=';
          break;
        case 2:
          dname = 'Wikipedia';
          durl = 'https://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search=';
          break;
        case 3:
          dname = 'Google';
          durl = 'https://www.google.com/search?q=';
          break;
        case 4:
          dname = 'IMDB';
          durl = 'https://www.imdb.com/find/?q=';
          break;
        case 5:
          dname = 'Youtube';
          durl = 'https://www.youtube.com/results?search_query=';
          break;

        default:
          alert('Error');
      }
      if (gname.indexOf(dname) < 0)
      {
        btncreate(dname, durl, searchVal);
    }
  }
}

//Load Custom Engines
function LoadCustom() {
  var _CEngineName = [undefined];
  var _CEngineURL = [undefined];
  var arrayLength;
  for (var i = 0; i < 15; i++) {
    _CEngineName[i] = GM_getValue('CEngineName' + i, 'empty');
    _CEngineURL[i] = GM_getValue('CEngineUrl' + i, 'empty');
    if (_CEngineName[i] != 'empty') {
      cbtncreate(_CEngineName[i], _CEngineURL[i], searchVal);
    }
  }
}

LoadDefault();
LoadCustom();

//Create Settings Menu
$('<a>').addClass('ddgembtn').attr('id', 'addmengine').text('Add').attr('href', '#').appendTo('.ddgm');
$('<a>').addClass('enginedit').addClass('ddgmbtn').text('Remove').attr('href', '#').appendTo('.ddgm');



/*


Logic


*/

//Default Engine Creator
function btncreate(name, searchEngine, _searchVal) {
  if (name != undefined & searchEngine != undefined) {
    $('<a>').addClass('ddgmbtn').addClass('engine').attr('target','_blank').hide().text(name).attr('href', searchEngine + _searchVal).appendTo('.ddgm').fadeIn(100);
  }
};
//Custom Engine Creator
function cbtncreate(name, searchEngine, _searchVal) {
  if (name != undefined & searchEngine != undefined) {
    searchEngine = searchEngine.replace('{searchTerms}', _searchVal);
    $('<a>').addClass('ddgmbtn').addClass('engine').addClass('cddgmbtn').hide().text(name).attr('href', searchEngine).prependTo('.ddgm').fadeIn(100);
  }
};
//Edit Engines
$('.enginedit').click(function () {
  if ($('#restoredengines').length) {
    //if removex exists remove edit menu
    $('.removex').fadeOut(200, function () {
      $(this).remove();
    });
    $('.ddgem').slideUp(300, function () {
      $(this).remove();
    });
  }
  else {
    //if removex doesn't exist add menu
    $('<a>').text('x').addClass('removex').hide().attr('href', '#').appendTo('.engine').fadeIn(300);
    $('<div>').addClass('ddgem').slideDown(300).insertAfter('.ddgm');
    $('<a>').addClass('ddgembtn').attr('id', 'addmengine').text('Add new Engine (Manual)').attr('href', '#').appendTo('.ddgem');
    $('<a>').addClass('ddgembtn').attr('id', 'restoredengines').text('Restore default Engines').attr('href', '#').appendTo('.ddgem');
  }
});
//Add Engines Manually
$(document).on('click', '#addmengine', function () {
  var cName = prompt('Engine Name', 'Display Name');
  if (name.length < 25) {
    var cSearchEngine = prompt('Engine URL (Example:http://www.google.com/search?q={searchTerms})', 'URL');
    cbtncreate(cName, cSearchEngine, searchVal);
    //Save Custom engine
    var cEnginesave = [undefined];
    for (var i = 0; i < 15; i++) {
      cEnginesave[i] = GM_getValue('CEngineName' + i, 'empty');
      if (cEnginesave[i] == 'empty') {
        GM_setValue('CEngineName' + i, cName);
        GM_setValue('CEngineUrl' + i, cSearchEngine);
        break;
      }
    }
  }
  else
  {
    alert('Your title is too long');
  }
});
//Restore Default Engines
$(document).on('click', '#restoredengines', function () {
  GM_setValue('ddgmDisEngines', 'empty');
  location.reload();
});
//Remove Engine
$(document).on('click', '.removex', function () {
  var comparedel = $(this).parent('.engine').clone().children().remove().end().text();
  $(this).closest('.engine').remove();
  var cEnginedel = [undefined];
  for (var i = 0; i < 15; i++) {
    cEnginedel[i] = GM_getValue('CEngineName' + i, 'empty');
    if (cEnginedel[i] == comparedel) {
      GM_setValue('CEngineName' + i, 'empty');
      GM_setValue('CEngineUrl' + i, 'empty');
      break;
    }
  }
  var disabledengines = GM_getValue('ddgmDisEngines', 'empty');
  GM_setValue('ddgmDisEngines', disabledengines + ' ' + comparedel);
  disabledengines = GM_getValue('ddgmDisEngines', 'empty');
});
}
//-MyCroft-//

var mycroft = {
plugins: null,
addLinks: function (p) {
  if (p) {
    this.plugins = document.evaluate('//a[@href="/jsreq.html"]', p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var reviews = document.evaluate('//a[.="[Review]"]', p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var addLink = document.createElement('a');
    addLink.setAttribute('href', 'javascript:void(0)');
    addLink.setAttribute('style', 'margin-left:5px; color:#000099');
    addLink.innerHTML = '[Add to DDM]';
    for (var i = 0, tmp; i < reviews.snapshotLength; i++) {
      tmp = addLink.cloneNode(true);
      tmp.setAttribute('data-ind', i);
      tmp.addEventListener('click', this.addNewEngine, false);
      reviews.snapshotItem(i).parentNode.insertBefore(tmp, reviews.snapshotItem(i).nextSibling);
    }
  }
},
addNewEngine: function () {
  var i = this.getAttribute('data-ind');
  var name = mycroft.plugins.snapshotItem(i).innerHTML.split(' (') [0].split(' -') [0];
  var newEngine = mycroft.plugins.snapshotItem(i).getAttribute('onClick').split('\'') [1];
  var newName = prompt('This engine will be added to DDG Extended.\nGive a name or cancel.', name);
  if (newName && newName.length > 0) {
    this.innerHTML = '[Added]';
    this.removeEventListener('click', this.addNewEngine, false);
    this.style.color = '#009900';
    this.removeAttribute('href');
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://mycroftproject.com/externalos.php/' + newEngine + '.xml',
      onload: function (response) {
        var responseXML = null;
        // Inject responseXML into existing Object (only appropriate for XML content).
        if (!response.responseXML) {
          responseXML = new DOMParser().parseFromString(response.responseText, 'text/xml');
        }
        var engine = responseXML.getElementsByTagName('Url');
        if (engine.length > 0 && engine[0].getAttribute('template')) {
          var cEnginesave = [undefined];
          for (var f = 0; f < 15; f++) {
            cEnginesave[f] = GM_getValue('CEngineName' + f, 'empty');
            if (cEnginesave[f] == 'empty') {
              GM_setValue('CEngineName' + f, newName);
              GM_setValue('CEngineUrl' + f, engine[0].getAttribute('template'));
              break;
            }
          }
        }
      }
    });
  }
}
};


//Function Calling
if (window.location.href.indexOf('http://mycroftproject.com/') !== - 1) {
mycroft.addLinks(document.getElementById('plugins'));
} else {
ddm();
}
