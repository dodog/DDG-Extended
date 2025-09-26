// ==UserScript==
// @name            DuckDuckGO - Extended
// @description     DuckDuckGo with customizable search engines, inline SVG icons, and dark mode support.
// @homepage        https://github.com/dodog/DDG-Extended
// @icon            https://raw.githubusercontent.com/dodog/DDG-Extended/main/resources/large.png
// @include         *://duckduckgo.com/?q=*
// @match           *://duckduckgo.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @license         MIT
// @version         2.0.1
// @updateURL       https://github.com/dodog/DDG-Extended/raw/main/src/DuckDuckGo-Extended.user.js
// @downloadURL     https://github.com/dodog/DDG-Extended/raw/main/src/DuckDuckGo-Extended.user.js
// @author          Jozef Gaal
// ==/UserScript==
// [Based on DuckduckMenu script from Shubham Singh](https://github.com/ishubhamsingh2e/Advance_DDG)


function addGlobalStyle(css){
  const head = document.getElementsByTagName('head')[0];
  if(!head) return;
  const style = document.createElement('style');
  style.type='text/css';
  style.innerHTML=css;
  head.appendChild(style);
}

// Light mode
addGlobalStyle(`
.ddgm { background-color:#FAFAFA;height:30px;float:left;position:relative;top:0px;left:158px;z-index:999; }
.ddgmbtn { float:left;position:relative;top:0px;z-index:999;background-color:#FAFAFA;width:auto;text-align:center; padding: 4px 8px;font-size:1em;font-weight:300;color:black;text-decoration:none; align-items: center; gap: 6px;}
.ddgmbtn:hover {
  background-color: #EEE;
  color: black;
  text-decoration: none;
}
.ddgmbtn svg {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
.ddgmbtn img{ width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px; }
#ddg_engine_manager{ font-family:sans-serif; }
`);

// Dark mode
addGlobalStyle(`
@media (prefers-color-scheme: dark){
.ddgm { background-color:#1e1e1e !important; }
 .ddgmbtn {
      background-color: #1e1e1e !important;
      color: #f0f0f0 !important;
    }
    .ddgmbtn:hover {
      background-color: #333 !important;
      color: #fff !important;
      text-decoration: none;
    }

#ddg_engine_manager{ background:#2b2b2b !important;border:1px solid #444 !important;color:#ddd !important; }
#ddg_engine_manager input{ background:#1e1e1e !important;color:#f0f0f0 !important;border:1px solid #555 !important; }
#ddg_engine_manager button{ background:#333 !important;color:#fff !important;border:1px solid #555 !important; }
}
`);

// SVG Icons
const SVG_ICONS = {
  "MapyCZ": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 249.45 249.45" width="16" height="16"><defs><linearGradient id="grad" x1="124.72" y1="0" x2="124.72" y2="249.45" gradientTransform="translate(124.72 -51.66) rotate(45)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#34d313"/><stop offset="1" stop-color="#1eae00"/></linearGradient></defs><circle fill="url(#grad)" cx="124.72" cy="124.72" r="124.72" transform="translate(-51.66 124.72) rotate(-45)"/><path fill="#fff" d="M181.96,84.4c3.65,10.6.95,22.33-1.08,70.33-.38,8.85.64,22.66-10.07,21.63-1.16-.11-3.41-1.25-4.63-2.99-1.85-2.62-2.72-5.83-3.69-13.21-1.46-11.06-.11-42.9-.24-45.63-.05-.98.1-2.04-.37-2.73-.14-.21-.6-.91-1.74.23-5.95,6.47-22.65,21.62-28.42,25.72-9.45,6.71-11.9-2.79-14.61-8-3.44-6.63-10.69-22.62-12.31-23.87-1.23-.95-1.33.4-1.57,1.21-.59,1.99-3.69,23.19-7.04,34.76-3.6,12.42-9.87,29.55-16.1,37.72-3.79,4.97-19.6,8.86-22.91,9.01-.27.06-1.28.15-.97-.97,1.43-5.12,12.12-27.87,14.98-38.21,4.64-12.14,11.72-40.15,12.62-58.92.76-12.36-.34-23.9-.49-27.25,0-4.48,4.6-6.93,7.19-7.46,2.97-.6,9.47-1.79,16.11,5.55,3.92,4.33,9.96,18.7,11.62,22.27,2.08,4.46,10.39,23.27,13.07,29.83,4.91-4.39,11.37-11.13,17.96-18.23,7.07-7.63,16.18-20.05,19.82-23.98,1.51-2.17,9.67,3.9,12.87,13.21"/></svg>`,
  "GoogleMaps": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>`,
  "Wikipedia": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16"><circle fill="#000" cx="16" cy="16" r="16"/><text x="16" y="21" font-size="18" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif">W</text></svg>`,
  "Google": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.72 1.22 9.23 3.6l6.85-6.85C36.38 2.69 30.64 0 24 0 14.65 0 6.51 5.3 2.56 13l7.98 6.19C12.43 13.35 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.14 24.5c0-1.57-.14-3.07-.39-4.5H24v9h12.5c-.54 2.89-2.17 5.35-4.63 7.02l7.23 5.62c4.23-3.91 6.64-9.69 6.64-17.14z"/><path fill="#FBBC05" d="M10.54 28.81c-1.1-3.26-1.1-6.77 0-10.03l-7.98-6.19C-1.3 17.91-1.3 30.09 2.56 37.41l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.64 0 12.38-2.19 16.5-5.95l-7.23-5.62c-2.01 1.35-4.58 2.15-7.38 2.15-6.26 0-11.57-3.85-13.46-9.31l-7.98 6.19C6.51 42.7 14.65 48 24 48z"/></svg>`,
  "IMDB": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0H544c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V32zM176 120H128V392h48V120zM240 120H192V392h48V120zM320 120h-48V392h48V120zM400 120h-48V392h48V120zM480 120h-48V392h48V120z"/></svg>`,
  "YouTube": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor"  d="M23.498 6.186a2.974 2.974 0 00-2.09-2.103C19.438 3.5 12 3.5 12 3.5s-7.438 0-9.408.583a2.974 2.974 0 00-2.09 2.103C0 8.166 0 12 0 12s0 3.834.502 5.814a2.974 2.974 0 002.09 2.103C4.562 20.5 12 20.5 12 20.5s7.438 0 9.408-.583a2.974 2.974 0 002.09-2.103C24 15.834 24 12 24 12s0-3.834-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>`
};

// Helper: get current search input
function getSearchInput() {
  return $('input[name="q"], #search_form_input, #search_form_input_homepage').first();
}

// Create button with inline SVG
function createButton(name, urlTemplate) {
  if(!name || !urlTemplate) return;
  const link = $('<a>').addClass('ddgmbtn engine').attr('href','#').appendTo('.ddgm');
  if(SVG_ICONS[name]) link.append(SVG_ICONS[name]);
  link.append(document.createTextNode(name));
  link.click(e=>{
    e.preventDefault();
    const q = getSearchInput().val() || '';
    const fullUrl = urlTemplate.includes('{searchTerms}') ? urlTemplate.replace('{searchTerms}', encodeURIComponent(q)) : urlTemplate + encodeURIComponent(q);
    window.open(fullUrl,'_blank');
  });
}

// Load default engines
function loadDefaults(){
  const disabled = GM_getValue('ddgmDisEngines','empty');
  const engines = [
    ['MapyCZ','https://mapy.com/sk/turisticka?q='],
    ['GoogleMaps','https://maps.google.com/maps?q='],
    ['Wikipedia','https://en.wikipedia.org/w/index.php?search='],
    ['Google','https://www.google.com/search?q='],
    ['IMDB','https://www.imdb.com/find/?q='],
    ['YouTube','https://www.youtube.com/results?search_query=']
  ];
  engines.forEach(([name,url])=>{
    if(disabled.indexOf(name)<0) createButton(name,url);
  });
}

// Load custom engines
function loadCustom(){
  for(let i=0;i<15;i++){
    const name = GM_getValue('CEngineName'+i,'empty');
    const url = GM_getValue('CEngineUrl'+i,'empty');
    if(name!=='empty' && url!=='empty') createButton(name,url);
  }
}

// Engine manager
function showEngineManager(){
  if($('#ddg_engine_manager').length){ $('#ddg_engine_manager').toggle(); return; }
  const panel = $('<div id="ddg_engine_manager">').insertAfter('.ddgm');
  panel.css({
    'margin-top': '40px',
    'padding': '10px',
    'background': '#FAFAFA',
    'border': '1px solid #CCC',
    'border-radius': '4px',
    'position': 'relative',
    'z-index': '1000'
  });
  panel.append('<h4 style="margin:0 0 8px 0;">Manage Engines</h4>');
  const form = $(`<div style="margin-bottom:8px;">
    <input type="text" id="ddg_new_name" placeholder="Engine name" style="margin-right:5px;padding:2px;">
    <input type="text" id="ddg_new_url" placeholder="Engine URL ({searchTerms})" style="margin-right:5px;padding:2px;width:300px;">
    <button id="ddg_save_engine">Add</button>
  </div>`);
  panel.append(form);
  const list = $('<ul id="ddg_engine_list" style="list-style:none;padding-left:0;"></ul>');
  panel.append(list);
  function refreshList(){
    list.empty();
    for(let i=0;i<15;i++){
      const name = GM_getValue('CEngineName'+i,'empty');
      const url = GM_getValue('CEngineUrl'+i,'empty');
      if(name!=='empty' && url!=='empty'){
        $('<li style="margin-bottom:4px;">')
          .text(name+' → '+url+' ')
          .append($('<button>').text('❌').css({marginLeft:'5px'}).click(()=>{
            GM_setValue('CEngineName'+i,'empty'); GM_setValue('CEngineUrl'+i,'empty');
            refreshList(); location.reload();
          })).appendTo(list);
      }
    }
  }
  refreshList();
  $('#ddg_save_engine').click(()=>{
    const name = $('#ddg_new_name').val().trim();
    const url = $('#ddg_new_url').val().trim();
    if(!name || !url){ alert('Fill both fields'); return; }
    for(let i=0;i<15;i++){
      if(GM_getValue('CEngineName'+i,'empty')==='empty'){
        GM_setValue('CEngineName'+i,name); GM_setValue('CEngineUrl'+i,url); break;
      }
    }
    refreshList(); location.reload();
  });
  $('<button style="margin-top:8px;">Restore defaults</button>').appendTo(panel).click(()=>{
    GM_setValue('ddgmDisEngines','empty');
    for(let i=0;i<15;i++){ GM_setValue('CEngineName'+i,'empty'); GM_setValue('CEngineUrl'+i,'empty'); }
    location.reload();
  });
}

// --- Initialize ---
$('<div>').addClass('ddgm').appendTo('.header');
loadDefaults();
loadCustom();
$('<a>').addClass('ddgembtn').attr('id','addmengine').text('Manage').attr('href','#').appendTo('.ddgm');
$(document).on('click','#addmengine',e=>{ e.preventDefault(); showEngineManager(); });
