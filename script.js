var STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
  CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
  FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho",
  IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia",
  WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia"
};

function parseCSV(text) {
  var results = [];
  var headers = [];
  var current = "";
  var inQuotes = false;
  var fields = [];
  var row = 0;

  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(current.trim());
        current = "";
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < text.length && text[i + 1] === '\n') {
          i++;
        }
        if (inQuotes) {
          current += '\n';
        } else {
          fields.push(current.trim());
          if (row === 0) {
            headers = fields;
          } else if (fields.some(function(f) { return f !== ""; })) {
            var obj = {};
            headers.forEach(function(h, idx) {
              obj[h] = fields[idx] || "";
            });
            results.push(obj);
          }
          fields = [];
          current = "";
          row++;
        }
      } else {
        current += ch;
      }
    }
  }

  if (current !== "" || fields.length > 0) {
    fields.push(current.trim());
    if (row === 0) {
      headers = fields;
    } else if (fields.some(function(f) { return f !== ""; })) {
      var obj = {};
      headers.forEach(function(h, idx) {
        obj[h] = fields[idx] || "";
      });
      results.push(obj);
    }
  }

  return results;
}

function csvToLetters(records) {
  return records.map(function(row, index) {
    var images = [row.Image1].filter(Boolean);
    if (row.Image2) images.push(row.Image2);
    if (row.Image3) images.push(row.Image3);
    if (row.Image4) images.push(row.Image4);

    var stateRaw = (row.State || "").trim();
    var stateAbbr = stateRaw.toUpperCase();
    var stateName = STATE_NAMES[stateAbbr] || stateRaw;

    var descriptions = [];
    if (row.Desc1) descriptions.push(row.Desc1);
    if (row.Desc2) descriptions.push(row.Desc2);

    return {
      id: index + 1,
      firstName: row.FirstName || "",
      descriptions: descriptions,
      images: images.map(function(u) { return u.trim(); }),
      state: stateName,
      stateAbbr: stateAbbr,
      translation: row.EngTranslation || row.Translation || ""
    };
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTranslation(text) {
  return text
    .split(/\n/)
    .map((line) => {
      let result = "";
      let lastIndex = 0;
      const pattern = /\[([^\]]+)\]/g;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        result += escapeHtml(line.slice(lastIndex, match.index));
        const content = match[1];
        if (/\bredacted\b/i.test(content)) {
          result += '<span class="redacted">' + escapeHtml(content) + "</span>";
        } else {
          result += escapeHtml(content);
        }
        lastIndex = match.index + match[0].length;
      }
      result += escapeHtml(line.slice(lastIndex));
      return `<p>${result}</p>`;
    })
    .join("");
}
(function () {
  var modal = document.getElementById("letterModal");
  var modalImagesContainer = document.getElementById("modalImagesContainer");
  var modalName = document.getElementById("modalName");
  var modalTranslation = document.getElementById("modalTranslation");
  var modalClose = document.getElementById("modalClose");
  var container = document.getElementById("lettersContainer");
  var lastFocusedCard = null;
  var lettersData = [];

  function openModal(letterIndex) {
    var letter = lettersData[letterIndex];
    if (!letter) return;

    lastFocusedCard = document.querySelector(
      '[data-letter-index="' + letterIndex + '"]',
    );

    modalImagesContainer.innerHTML = "";
    letter.images.forEach(function (src, imgIdx) {
      var wrapper = document.createElement("div");
      wrapper.className = "modal-image-wrapper";
      var img = document.createElement("img");
      img.className = "modal-image";
      img.alt = "Letter image " + (imgIdx + 1);
      img.src = src;
      img.setAttribute("data-testid", "img-modal-letter-" + imgIdx);
      wrapper.appendChild(img);
      modalImagesContainer.appendChild(wrapper);
    });

    modalName.textContent = letter.firstName;
    modalTranslation.innerHTML = formatTranslation(letter.translation);

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (lastFocusedCard) {
      lastFocusedCard.focus();
      lastFocusedCard = null;
    }
  }

  function createCard(letter, index) {
    var card = document.createElement("div");
    card.className = "letter-card";
    card.setAttribute(
      "data-testid",
      "card-letter-" + letter.stateAbbr.toLowerCase() + "-" + (index + 1),
    );
    card.setAttribute("data-letter-index", index);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.style.cursor = "pointer";

    var imgWrapper = document.createElement("div");
    imgWrapper.className = "card-image-wrapper";
    var img = document.createElement("img");
    img.className = "card-image";
    img.alt = "Person photo";
    img.src = letter.images[0] || "";
    imgWrapper.appendChild(img);

    var content = document.createElement("div");
    content.className = "card-content";

    var name = document.createElement("div");
    name.className = "card-name";
    name.textContent = letter.firstName;

    content.appendChild(name);
    card.appendChild(imgWrapper);
    card.appendChild(content);

    card.addEventListener("click", function () {
      openModal(index);
    });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(index);
      }
    });

    return card;
  }

  function renderLetters(letters) {
    letters.sort(function (a, b) {
      return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    });
    lettersData = letters;
    container.innerHTML = "";

    var grid = document.createElement("div");
    grid.className = "cards-grid";

    letters.forEach(function (letter, idx) {
      var card = createCard(letter, idx);
      var hasTriggerWarning =
        letter.firstName === "Erick" ||
        (letter.descriptions.length > 0 &&
          letter.descriptions[0].toUpperCase().indexOf("TRIGGER WARNING") !== -1);

      if (hasTriggerWarning) {
        var warning = document.createElement("div");
        warning.className = "trigger-warning";
        warning.setAttribute("data-testid", "trigger-warning-erick");
        warning.textContent =
          "The contents of this letter include mentions of suicide";
        card.querySelector(".card-content").appendChild(warning);
      }
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  var searchIcon = document.querySelector(".search-icon");
  var searchBarContainer = document.getElementById("searchBarContainer");
  var searchInput = document.getElementById("searchInput");

  searchIcon.addEventListener("click", function () {
    searchBarContainer.classList.toggle("active");
    if (searchBarContainer.classList.contains("active")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      filterCards("");
    }
  });

  searchInput.addEventListener("input", function () {
    filterCards(searchInput.value);
  });

  function filterCards(query) {
    var q = query.toLowerCase().trim();
    var cards = container.querySelectorAll(".letter-card");
    cards.forEach(function (card) {
      var idx = parseInt(card.getAttribute("data-letter-index"), 10);
      var letter = lettersData[idx];
      if (!letter) return;
      var match =
        !q ||
        letter.firstName.toLowerCase().indexOf(q) !== -1 ||
        letter.state.toLowerCase().indexOf(q) !== -1 ||
        letter.stateAbbr.toLowerCase().indexOf(q) !== -1 ||
        letter.translation.toLowerCase().indexOf(q) !== -1 ||
        letter.descriptions.join(" ").toLowerCase().indexOf(q) !== -1;
      card.style.display = match ? "" : "none";
    });
  }

  var heroSection = document.querySelector('.hero');
  var heroImage = document.querySelector('.hero-image');
  var ticking = false;

  function updateHeroScroll() {
    var sectionHeight = heroSection.offsetHeight;
    var imageHeight = heroImage.offsetHeight;
    var maxShift = imageHeight - sectionHeight;
    var scrollEnd = heroSection.offsetTop + sectionHeight;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    var progress = 0;
    if (scrollY >= scrollEnd) {
      progress = 1;
    } else if (scrollY > 0) {
      progress = scrollY / scrollEnd;
    }

    heroImage.style.transform = 'translateY(' + (-progress * maxShift) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeroScroll);
      ticking = true;
    }
  });

  updateHeroScroll();

  fetch("lfd.csv")
    .then(function (res) {
      return res.text();
    })
    .then(function (csvText) {
      var records = parseCSV(csvText);
      var letters = csvToLetters(records);
      renderLetters(letters);
    })
    .catch(function (err) {
      console.error("Failed to load letters:", err);
      container.innerHTML =
        '<p style="padding: 50px; text-align: center;">Failed to load letters. Please try again later.</p>';
    });

  modalClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
