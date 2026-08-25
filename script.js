const MAP_TITLES = {
  "primary": "Primary Coverage 988",
  "backup": "Backup Coverage 988",
  "opened-csc": "Opened CSCs",
  "opened-csc-agency": "Opened CSCs — Agency",
  "mobile-provider": "Mobile Crisis — Provider Type",
  "mobile-population": "Mobile Crisis — Population Served",
  "licensed-residence": "Licensed Crisis Adult Residence"
};

const PRIMARY_988_CENTERS = {
  Albany: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Allegany: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Bronx: { center: "NYC 988", color: "#3596B5" },
  Broome: { center: "Suicide Prevention & Crisis Service of Tompkins County", color: "#3AB922" },
  Cattaraugus: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Cayuga: { center: "211/ Life Line", color: "#241444" },
  Chautauqua: { center: "Crisis Services", color: "#0837C0" },
  Chemung: { center: "Suicide Prevention & Crisis Service of Tompkins County", color: "#3AB922" },
  Chenango: { center: "The Neighborhood Center", color: "#FFF920" },
  Clinton: { center: "MHA Essex", color: "#F3DEF4" },
  Columbia: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Cortland: { center: "Contact Community Services", color: "#680476" },
  Delaware: { center: "The Neighborhood Center", color: "#FFF920" },
  Dutchess: { center: "Dutchess County Department of Behavioral and Community Health", color: "#40FE30" },
  Erie: { center: "Crisis Services", color: "#0837C0" },
  Essex: { center: "MHA Essex", color: "#F3DEF4" },
  Franklin: { center: "MHA Essex", color: "#F3DEF4" },
  Fulton: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Genesee: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Greene: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Hamilton: { center: "MHA Essex", color: "#F3DEF4" },
  Herkimer: { center: "The Neighborhood Center", color: "#FFF920" },
  Jefferson: { center: "Contact Community Services", color: "#680476" },
  Kings: { center: "NYC 988", color: "#3596B5" },
  Lewis: { center: "Contact Community Services", color: "#680476" },
  Livingston: { center: "211/ Life Line", color: "#241444" },
  Madison: { center: "The Neighborhood Center", color: "#FFF920" },
  Monroe: { center: "211/ Life Line", color: "#241444" },
  Montgomery: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Nassau: { center: "Long Island Crisis Center", color: "#AFA8B9" },
  New_York: { center: "NYC 988", color: "#3596B5" },
  Niagara: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Oneida: { center: "The Neighborhood Center", color: "#FFF920" },
  Onondaga: { center: "Contact Community Services", color: "#680476" },
  Ontario: { center: "211/ Life Line", color: "#241444" },
  Orange: { center: "Mental Health Association in Orange County", color: "#FDA200" },
  Orleans: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Oswego: { center: "Contact Community Services", color: "#680476" },
  Otsego: { center: "The Neighborhood Center", color: "#FFF920" },
  Putnam: { center: "Response of Suffolk County", color: "#C186E7" },
  Queens: { center: "NYC 988", color: "#3596B5" },
  Rensselaer: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Richmond: { center: "NYC 988", color: "#3596B5" },
  Rockland: { center: "Response of Suffolk County", color: "#C186E7" },
  Saint_Lawrence: { center: "Contact Community Services", color: "#680476" },
  Saratoga: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Schenectady: { center: "Vibrant Capital Region", color: "#49F9DC" },
  Schoharie: { center: "The Neighborhood Center", color: "#FFF920" },
  Schuyler: { center: "211/ Life Line", color: "#241444" },
  Seneca: { center: "211/ Life Line", color: "#241444" },
  Steuben: { center: "211/ Life Line", color: "#241444" },
  Suffolk: { center: "Response of Suffolk County", color: "#C186E7" },
  Sullivan: { center: "Dutchess County Department of Behavioral and Community Health", color: "#40FE30" },
  Tioga: { center: "Suicide Prevention & Crisis Service of Tompkins County", color: "#3AB922" },
  Tompkins: { center: "Suicide Prevention & Crisis Service of Tompkins County", color: "#3AB922" },
  Ulster: { center: "Dutchess County Department of Behavioral and Community Health", color: "#40FE30" },
  Warren: { center: "Contact Community Services", color: "#680476" },
  Washington: { center: "Contact Community Services", color: "#680476" },
  Wayne: { center: "211/ Life Line", color: "#241444" },
  Westchester: { center: "St. Vincent’s Hospital Westchester", color: "#FB0004" },
  Wyoming: { center: "Niagara County Department of Mental & Substance Abuse Services", color: "#FE3564" },
  Yates: { center: "211/ Life Line", color: "#241444" }
};


const mapSelect = document.getElementById("mapSelect");
const mapTitle = document.getElementById("mapTitle");
const tooltip = document.getElementById("tooltip");
const selectedCountyText = document.getElementById("selectedCounty");
const clearSelection = document.getElementById("clearSelection");
const countyModal = document.getElementById("countyModal");
const countyModalClose = document.getElementById("countyModalClose");
const countyModalDone = document.getElementById("countyModalDone");
const countyModalTitle = document.getElementById("countyModalTitle");
const countyCenterName = document.getElementById("countyCenterName");
const countyCenterDot = document.getElementById("countyCenterDot");
const countyModalDescription = document.getElementById("countyModalDescription");
const countyModalKicker = document.getElementById("countyModalKicker");
const countyCenterLabel = document.getElementById("countyCenterLabel");
const countyLocationLink = document.getElementById("countyLocationLink");

let selectedHit = null;
let selectedCityHit = null;

function prettyCounty(name) {
  return name
    .replaceAll("_", " ")
    .replace("Saint Lawrence", "St. Lawrence");
}

function activeMapTitle() {
  return MAP_TITLES[mapSelect.value] || "Map";
}

function moveTooltip(event) {
  const gap = 14;
  tooltip.style.left = `${event.clientX + gap}px`;
  tooltip.style.top = `${event.clientY + gap}px`;
}

function showTooltip(event, hit) {
  const county = prettyCounty(hit.dataset.county);

  tooltip.innerHTML = `
    <strong>${county} County</strong>
    ${activeMapTitle()}
  `;

  tooltip.classList.add("visible");
  moveTooltip(event);
}

function clearSelectedCounty() {
  if (selectedHit) {
    selectedHit.classList.remove("is-selected");
  }
  if (selectedCityHit) {
    selectedCityHit.classList.remove("is-selected");
  }

  selectedHit = null;
  selectedCityHit = null;
  selectedCountyText.textContent = mapSelect.value === "opened-csc-agency"
    ? "No CSC location selected"
    : "No county selected";
}

function openPrimaryCountyModal(hit) {
  if (mapSelect.value !== "primary") return;

  const countyKey = hit.dataset.county;
  const county = prettyCounty(countyKey);
  const info = PRIMARY_988_CENTERS[countyKey];
  if (!info) return;

  countyModalKicker.textContent = "PRIMARY 988 COVERAGE";
  countyModalTitle.textContent = `${county} County`;
  countyCenterLabel.textContent = "Primary 988 Call Center";
  countyCenterName.textContent = info.center;
  countyCenterDot.style.background = info.color;
  countyModalDescription.textContent = `${county} County follows ${info.center} for primary 988 call-center coverage.`;
  countyLocationLink.hidden = true;
  countyLocationLink.removeAttribute("href");
  countyModal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => countyModalClose.focus(), 20);
}

function closePrimaryCountyModal() {
  if (countyModal.hidden) return;
  countyModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function setupCountyHits() {
  document.querySelectorAll(".county-hit").forEach(hit => {

    hit.addEventListener("mouseenter", event => {
      showTooltip(event, hit);
    });

    hit.addEventListener("mousemove", moveTooltip);

    hit.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });

    hit.addEventListener("focus", event => {
      const rect = hit.getBoundingClientRect();

      tooltip.innerHTML = `
        <strong>${prettyCounty(hit.dataset.county)} County</strong>
        ${activeMapTitle()}
      `;

      tooltip.style.left = `${rect.left + rect.width / 2 + 12}px`;
      tooltip.style.top = `${rect.top + rect.height / 2 + 12}px`;
      tooltip.classList.add("visible");
    });

    hit.addEventListener("blur", () => {
      tooltip.classList.remove("visible");
    });

    hit.addEventListener("click", event => {
      event.stopPropagation();

      if (selectedHit && selectedHit !== hit) {
        selectedHit.classList.remove("is-selected");
      }

      const wasSelected = hit.classList.contains("is-selected");

      hit.classList.toggle("is-selected");
      selectedHit = wasSelected ? null : hit;

      selectedCountyText.textContent = wasSelected
        ? "No county selected"
        : `${prettyCounty(hit.dataset.county)} County`;

      if (!wasSelected) {
        openPrimaryCountyModal(hit);
      }
    });

    hit.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        hit.click();
      }
    });

  });
}

function openCscAgencyModal(hit) {
  if (mapSelect.value !== "opened-csc-agency") return;

  const city = hit.dataset.city;
  const agency = hit.dataset.agency;
  if (!city || !agency) return;

  countyModalKicker.textContent = "OPENED CSC — AGENCY";
  countyModalTitle.textContent = city;
  countyCenterLabel.textContent = "CSC Agency";
  countyCenterName.textContent = agency;
  countyCenterDot.style.background = "#FDA200";
  countyModalDescription.textContent = `${city} is an opened Crisis Stabilization Center location operated by ${agency}.`;

  const mapsQuery = `${agency} Crisis Stabilization Center ${city}, NY`;
  countyLocationLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  countyLocationLink.textContent = `Open ${city} location in Google Maps ↗`;
  countyLocationLink.hidden = false;

  countyModal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => countyModalClose.focus(), 20);
}

function setupCscCityHits() {
  document.querySelectorAll(".csc-city-hit").forEach(hit => {
    const showCityTooltip = event => {
      tooltip.innerHTML = `
        <strong>${hit.dataset.city}</strong>
        ${hit.dataset.agency}
      `;
      tooltip.classList.add("visible");
      if (event && Number.isFinite(event.clientX)) {
        moveTooltip(event);
      } else {
        const rect = hit.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 + 12}px`;
        tooltip.style.top = `${rect.top + rect.height / 2 + 12}px`;
      }
    };

    hit.addEventListener("mouseenter", showCityTooltip);
    hit.addEventListener("mousemove", moveTooltip);
    hit.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
    hit.addEventListener("focus", showCityTooltip);
    hit.addEventListener("blur", () => tooltip.classList.remove("visible"));

    hit.addEventListener("click", event => {
      event.stopPropagation();

      if (selectedCityHit && selectedCityHit !== hit) {
        selectedCityHit.classList.remove("is-selected");
      }
      if (selectedHit) {
        selectedHit.classList.remove("is-selected");
        selectedHit = null;
      }

      const wasSelected = hit.classList.contains("is-selected");
      hit.classList.toggle("is-selected");
      selectedCityHit = wasSelected ? null : hit;

      selectedCountyText.textContent = wasSelected
        ? "No CSC location selected"
        : `${hit.dataset.city} — ${hit.dataset.agency}`;

      if (!wasSelected) {
        openCscAgencyModal(hit);
      }
    });

    hit.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        hit.click();
      }
    });
  });
}

function switchMap(mapId) {
  clearSelectedCounty();
  closePrimaryCountyModal();
  tooltip.classList.remove("visible");

  document.querySelectorAll(".map-view").forEach(view => {
    const active = view.dataset.map === mapId;
    view.classList.toggle("active", active);
    view.hidden = !active;
  });

  mapTitle.textContent = MAP_TITLES[mapId] || "Map";
}

mapSelect.addEventListener("change", () => {
  switchMap(mapSelect.value);
});

clearSelection.addEventListener("click", clearSelectedCounty);

document.addEventListener("click", event => {
  if (!event.target.closest(".county-hit") && !event.target.closest(".csc-city-hit")) {
    clearSelectedCounty();
  }
});

countyModalClose.addEventListener("click", closePrimaryCountyModal);
countyModalDone.addEventListener("click", closePrimaryCountyModal);
countyModal.querySelectorAll("[data-close-county-modal]").forEach(element => {
  element.addEventListener("click", closePrimaryCountyModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !countyModal.hidden) {
    closePrimaryCountyModal();
  }
});

setupCountyHits();
setupCscCityHits();
switchMap(mapSelect.value);


// ------------------------------
// Built-in map assistant chatbot
// ------------------------------
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotPanel = document.getElementById("chatbotPanel");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotQuickActions = document.querySelectorAll("[data-chat-question]");

function setChatbotOpen(open) {
  chatbotPanel.hidden = !open;
  chatbotToggle.setAttribute("aria-expanded", String(open));
  chatbotToggle.setAttribute("aria-label", open ? "Close map assistant" : "Open map assistant");

  if (open) {
    window.setTimeout(() => chatbotInput.focus(), 40);
  }
}

function addChatMessage(text, sender = "bot") {
  const row = document.createElement("div");
  row.className = `chat-message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  chatbotMessages.appendChild(row);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getSelectedCountyName() {
  if (!selectedHit) return null;
  return `${prettyCounty(selectedHit.dataset.county)} County`;
}

function chatbotReply(message) {
  const q = message.toLowerCase().trim();
  const currentMap = activeMapTitle();
  const county = getSelectedCountyName();

  if (!q) {
    return "Type a question and I’ll help you use the map.";
  }

  if (/(hello|hi|hey|good morning|good afternoon)/.test(q)) {
    return `Hi! You are viewing ${currentMap}. I can explain the map controls or tell you which county is selected.`;
  }

  if (/(what map|which map|current map|viewing)/.test(q)) {
    return `You are currently viewing: ${currentMap}. Use the “Choose a map” menu at the top to switch programs.`;
  }

  if (/(selected county|which county|what county|county selected)/.test(q)) {
    return county
      ? `${county} is currently selected.`
      : "No county is selected. Click a county on the map to highlight it, then ask me again.";
  }

  if (/(call center|which center|what center|follows|follow|routed|route)/.test(q)) {
    if (!selectedHit) {
      return "Select a county on the Primary Coverage 988 map first, and I’ll tell you its primary 988 call center.";
    }
    const info = PRIMARY_988_CENTERS[selectedHit.dataset.county];
    if (info) {
      return `${county} follows ${info.center} for primary 988 call-center coverage.`;
    }
  }

  if (/(how.*use|instructions|navigate|click|hover)/.test(q)) {
    return "Choose a map from the dropdown, hover over a county to see its name, and click a county to keep it highlighted. Use Clear to remove the selection.";
  }

  if (/(primary)/.test(q) && /(988|coverage|map)/.test(q)) {
    return "Primary Coverage 988 displays the primary 988 coverage arrangement by county. Select it from the map dropdown to explore counties.";
  }

  if (/(backup)/.test(q) && /(988|coverage|map)/.test(q)) {
    return "Backup Coverage 988 displays backup 988 coverage by county. Select it from the map dropdown and click a county to highlight it.";
  }

  if (/(csc|crisis stabilization|agency|location)/.test(q)) {
    if (selectedCityHit) {
      return `${selectedCityHit.dataset.city} is an opened CSC location operated by ${selectedCityHit.dataset.agency}.`;
    }
    return "The CSC options show opened Crisis Stabilization Centers. On Opened CSCs — Agency, click an orange city marker such as Buffalo, Syracuse, Utica, Kingston, Poughkeepsie, Plattsburgh, Hicksville, or Brooklyn to see the agency in a popup.";
  }

  if (/(mobile crisis|provider type|population served)/.test(q)) {
    return "The Mobile Crisis maps let you view programs by provider type or population served. Use the dropdown at the top to switch between those two views.";
  }

  if (/(residence|licensed crisis)/.test(q)) {
    return "The Licensed Crisis Adult Residence map is available from the dropdown. Select it, then hover or click counties to explore the map.";
  }

  if (/(988|crisis|suicide|emergency)/.test(q)) {
    return "For immediate crisis support in the U.S., call or text 988. This website assistant is only for map navigation and information.";
  }

  if (/(help|what can you do|questions)/.test(q)) {
    return "I can tell you the current map, identify the selected county, explain how to use the page, and describe the available 988, CSC, Mobile Crisis, and residence map options.";
  }

  return `I can help with this website’s maps. Try asking “What map am I viewing?”, “Which county is selected?”, or “How do I use this map?”`;
}

function submitChatQuestion(question) {
  const clean = question.trim();
  if (!clean) return;

  addChatMessage(clean, "user");
  chatbotInput.value = "";

  window.setTimeout(() => {
    addChatMessage(chatbotReply(clean), "bot");
  }, 180);
}

chatbotToggle.addEventListener("click", () => {
  setChatbotOpen(chatbotPanel.hidden);
});

chatbotClose.addEventListener("click", () => {
  setChatbotOpen(false);
  chatbotToggle.focus();
});

chatbotForm.addEventListener("submit", event => {
  event.preventDefault();
  submitChatQuestion(chatbotInput.value);
});

chatbotQuickActions.forEach(button => {
  button.addEventListener("click", () => {
    submitChatQuestion(button.dataset.chatQuestion || "");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !chatbotPanel.hidden) {
    setChatbotOpen(false);
    chatbotToggle.focus();
  }
});
