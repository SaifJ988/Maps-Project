NYS 988 ALL MAPS — INTERACTIVE COUNTY VERSION

Features:
- Primary 988 call-center popup: click any county on the first map to see its assigned primary 988 call center.
- Floating Map Assistant chatbot with quick questions and map-aware responses.
- Dropdown switches among all 7 maps.
- Every county has an invisible interactive hit area.
- Hover: county gets a purple outline and a tooltip shows the county name.
- Click: county remains highlighted.
- Clear button removes the selected county.
- Keyboard: Tab to counties; Enter/Space selects.

Files:
- index.html
- style.css
- script.js
- assets/988-logo-white.png

The SVG maps are embedded directly inside index.html so county interactions work
without loading the SVGs as regular <img> files.

You can open index.html directly, or use VS Code Live Server.

Chatbot note:
- The chatbot is a local front-end assistant and works without an API key.
- It answers map-navigation questions and uses the currently selected map/county.
- A true generative-AI chatbot would require a secure backend/API connection; do not put secret API keys directly in browser JavaScript.


Opened CSCs — Agency clickable locations
----------------------------------------
The orange city markers on the Opened CSCs — Agency map are clickable. Clicking Plattsburgh, Utica, Syracuse, Buffalo, Kingston, Poughkeepsie, Hicksville, or Brooklyn opens a popup showing the CSC agency for that city.

CSC AGENCY LOCATION LINKS
-------------------------
On “Opened CSCs — Agency,” click a city location to open its popup.
The popup now includes a clickable “Open [City] location in Google Maps” link that opens a Google Maps search for that CSC agency and city in a new tab.

Layout update: Each program now displays its legend in a dedicated framed panel on the left and the map centered in a separate panel on the right. On smaller screens, the legend stacks above the map. Existing Primary 988 county popups, Opened CSC agency city popups/Google Maps links, and the chatbot remain enabled.
