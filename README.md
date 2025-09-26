# DDG-Extended (DuckDuckGo Extended)

Extends DuckDuckGo by adding a customizable list of additional search engines for making fast searches from other engines. Suitable for those, who does not like Apple Maps in DuckDuckGo search engine.
---

## Features

- **Custom Search Engines**  
  Quickly search using popular services like Mapy.com, Google Maps, Google, YouTube, Wikipedia, IMDB
- **Inline SVG Icons**  
  All buttons include vector icons for a clean, modern look.  
- **Dark Mode Support**  
  Detects your system's dark mode and adapts the menu colors automatically.  
- **Custom Engine Management**  
  Add, edit, and remove your own search engines from an easy-to-use panel.  
- **Restore Defaults**  
  Reset the menu to its original default engines at any time.

---

## Installation

1. Install a userscript manager:  
   - [ViolentMonkey](https://violentmonkey.github.io/) (recommended)  
   - [Tampermonkey](https://www.tampermonkey.net/)  
   - [Greasemonkey](https://www.greasespot.net/)  

2. Click **Install** on the userscript raw URL:  

> Ensure you are using the raw `.user.js` file URL, not the GitHub HTML page.

3. After installation, reload DuckDuckGo and you will see the extended search menu under the search bar.

---

## Usage

- **Click on a search engine button** to open a new tab with the search results.  
- **Click "Manage"** to add, edit, or remove custom search engines.  
- **Restore defaults** clears all custom engines and disabled engines.  

> The search query is automatically detected from the main DuckDuckGo search input.

---

## Configuration

- Custom engines are saved using your userscript manager's storage (`GM_setValue` / `GM_getValue`).  
- Maximum of 15 custom engines supported.  
- URLs can include `{searchTerms}` to specify where the query should be inserted.

Example:
https://www.example.com/search?q={searchTerms}

---

## Dark Mode

The script automatically adapts to your system’s dark mode.  

---

## Updating

- The script checks for updates automatically if your userscript manager supports it.  

Manual update:
1. Open ViolentMonkey → find the DuckDuckGo Extended script → click **Check for Updates**.  
2. Ensure the `@updateURL` and `@downloadURL` point to the raw `.user.js` file.

---

## License

MIT License – see [LICENSE](https://github.com/dodog/DDG-Extended?tab=readme-ov-file#) for details.


## Contributions

Feel free to submit pull requests for bug fixes or optimizations



