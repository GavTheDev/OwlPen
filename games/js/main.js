// Get the settings div element
var settingsDiv = document.getElementById('settings');

// Execute when the window loads
window.onload = function() {
  
  // Register a service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js");
    });
  }
  
  // Redirect mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    window.location.href = "https://owlpentest.com/mobile-error";
  }
};

// Function to handle outside clicks
function handleOutsideClick(event) {
  if (event.target === settingsDiv) return;
  settingsDiv.classList.remove("open");
  document.removeEventListener('click', handleOutsideClick);
}

// Game exit drag tab
function makeDraggable(dragHandle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  dragHandle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    document.getElementById('drag-box').style.cursor = 'grabbing'
    document.getElementById('drag-box').style.backgroundColor = 'rgba(35, 156, 255, 0.897)'
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let elem = dragHandle.parentElement;
    let newTop = elem.offsetTop - pos2;
    let newLeft = elem.offsetLeft - pos1;

    let boundingRect = elem.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    let boundary = 0;

    if(newTop < boundary) newTop = boundary;
    if(newLeft < boundary) newLeft = boundary;
    if(newTop + boundingRect.height > windowHeight - boundary) {newTop = windowHeight - boundary - boundingRect.height; closeDragElement()};
    if(newLeft + boundingRect.width > windowWidth - boundary) {newLeft = windowWidth - boundary - boundingRect.width; closeDragElement()};

    elem.style.top = newTop + "px";
    elem.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.getElementById('drag-box').style.cursor = 'grab';
    document.getElementById('drag-box').style.backgroundColor = 'rgba(29, 29, 29, 0.897)'
  }
  
  document.getElementById('game-frame').onclick = closeDragElement;
  
  dragHandle.parentElement.onmouseleave = closeDragElement;
}

let controls = document.querySelector('.drag-box');
makeDraggable(controls);

function closeControls(e) {
    e.stopPropagation();
    document.getElementById('game-ad').style.display = 'none';
    document.getElementById('game-frame').style.display = 'none';
    document.getElementById('iframe').src = '';
    document.body.style.overflowY = 'visible';
}

// Attach click event to option elements
document.querySelectorAll('.option').forEach(function(option) {
  option.addEventListener('click', function() {
    // Hide all pages and deactivate options
    document.querySelectorAll('.page').forEach(function(page) {
      page.style.display = 'none';
    });
    document.querySelectorAll('.option').forEach(function(opt) {
      opt.classList.remove('active');
    });

    // Activate the clicked option and show its associated page
    option.classList.add('active');
    const pageId = option.getAttribute('data-page');
    document.getElementById(pageId).style.display = 'block';
  });
});

// Function to handle scrolling
function handleScroll() {
  settings();
  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('scroll', handleScroll);
}

// Get elements by ID
var record = document.getElementById('record');
var saveButton = document.getElementById('save');
var displayKey = document.querySelector('.key h2');

// Execute when the window loads
window.onload = function() {
  var preferredKey = localStorage.getItem('preferredKey');
  if (preferredKey) {
    displayKey.innerHTML = preferredKey;
  }
};

// Function to log key codes
var logKeyCode = function(event) {
  var key = event.key;
  var unwantedKeys = ['Shift', 'Control', /* ... */]; // List of unwanted keys
  if (!unwantedKeys.includes(key)) {
    localStorage.setItem('key', key);
    localStorage.setItem('preferredKey', key);
    displayKey.innerHTML = key;
  }
};

// Attach click event to record button
record.onclick = function() {
  if (record.innerHTML === '<i class="fa-solid fa-circle-microphone-lines"></i>Record Keystroke') {
    record.classList.add("flicker");
    record.innerHTML = 'Stop.';
    document.getElementById("save").style.display = "none";
    document.addEventListener('keydown', logKeyCode);
  } else {
    record.innerHTML = '<i class="fa-solid fa-circle-microphone-lines"></i>Record Keystroke';
    record.classList.remove("flicker");
    document.getElementById("save").style.display = "block";
    document.removeEventListener('keydown', logKeyCode);
  }
};

// Set initial value for safetyKey
var safetyKey = "https://classroom.google.com/";

// Check and set the preferred location
if (localStorage.getItem('location')) {
  if (localStorage.getItem('location') === 'c') {
    safetyKey = "https://canvas.com/";
    removeActiveClass();
    document.getElementById("c").classList.add("active");
  } else {
    safetyKey = "https://classroom.google.com/";
    removeActiveClass();
    document.getElementById("gc").classList.add("active");
  }
}

// Attach click event to elements for changing the location
document.getElementById("c").onclick = function() {
  safetyKey = "https://canvas.com/";
  removeActiveClass();
  localStorage.setItem('location', 'c');
  document.getElementById("c").classList.add("active");
};
document.getElementById("gc").onclick = function() {
  safetyKey = "https://classroom.google.com/";
  removeActiveClass();
  localStorage.setItem('location', 'gc');
  document.getElementById("gc").classList.add("active");
};

// Function to remove the active class from site options
function removeActiveClass() {
  var btns = document.getElementsByClassName("site-option");
  for (var i = 0; i < btns.length; i += 1) {
    btns[i].classList.remove("active");
  }
}

// Function to handle alert for preferred key
var alertPreferredKey = function(event) {
  var preferredKey = localStorage.getItem('preferredKey');
  if (preferredKey) {
    if (event.key === preferredKey) {
      window.location.href = safetyKey;
    }
  } else {
    if (event.key === ']') {
      window.location.href = safetyKey;
    }
  }
};

// Attach keydown event to alertPreferredKey
document.addEventListener('keydown', alertPreferredKey);

// Attach keydown event for location and preferred key check
document.addEventListener('keydown', function(event) {
  if (event.key === "]" && !localStorage.getItem('preferredKey')) {
    if (record.innerHTML === "Stop.") {
      // Do nothing
    } else {
      window.location.href = safetyKey;
    }
  } else if (event.key === localStorage.getItem('preferredKey')) {
    if (record.innerHTML === "Stop.") {
      // Do nothing
    } else {
      window.location.href = safetyKey;
    }
  }
});

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fetch and process game data from JSON
fetch('./games.json')
  .then(response => response.json())
  .then(games => {
    shuffleArray(games); // Shuffle the games array
    games.forEach(game => {
      // Create game elements
      const gameElement = document.createElement("div");
      gameElement.classList.add("game");
      gameElement.innerHTML = `
        <div class="img" loading="lazy" data-src="${game[2]}" onclick="play('${game[0]}', '${game[3]}')">
          <div class="cover"></div>
        </div>
        <div id="game-content" class="game-content">
          <h1>${game[0]}</h1>
          <p>${game[1]}</p>
          <button class="install" onclick="play('${game[0]}','${game[3]}')">Play</button>
          <span>(Credit: ${game[4]})</span>
        </div>
      `;
      document.getElementById("games").appendChild(gameElement);
      observeImage(gameElement.querySelector(".img")); // Observe images for lazy loading
    });
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 100);
    document.getElementById('games').style.display = 'grid';
  });

// Function to observe images for lazy loading
function observeImage(imgElement) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0]
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imgElement.style = `
          background-image: url(${imgElement.dataset.src });
          background-size: cover;
          background-position: center;
        `;
        observer.unobserve(imgElement);
      }
    });
  }, options);
  observer.observe(imgElement);
}

// Function to play a game
function play(game, url) {
  localStorage.setItem('game', game);
  const gameFrame = document.getElementById('game-frame');
  if (gameFrame.style.display === 'block') {
    gameFrame.style.display = 'none';
    document.getElementById('iframe').src = '';
    document.body.style.overflowY = 'visible';
  } else {
    gameFrame.style.display = 'block';
    document.getElementById('iframe').src = url;
    document.body.style.overflowY = 'hidden';
  }
}

// Function to switch game perspective
function gamesPerspective() {
  const gameContent = Array.from(document.getElementsByClassName('game-content'));
  const games = Array.from(document.getElementsByClassName('game'));
  const images = Array.from(document.getElementsByClassName('img'));
  if (document.getElementById('games').style.gridTemplateColumns === 'repeat(9, 9.5vw)') {
    gameContent.forEach(game => {
      games.forEach(gameTab => {
        gameTab.style.backgroundColor = '#222222';
        gameTab.style.padding = '1.2vw';
        gameTab.style.display = 'flex';
      });
      game.style.display = 'block';
      document.getElementById('games').style.gridTemplateColumns = '.1fr .1fr';
      document.getElementById('games').style.marginLeft = '.6vw';
    });
  } else {
    gameContent.forEach(game => {
      games.forEach(gameTab => {
        gameTab.style.backgroundColor = 'transparent';
        gameTab.style.padding = '0px';
        gameTab.style.display = 'block';
      });
      game.style.display = 'none';
      document.getElementById('games').style.gridTemplateColumns = 'repeat(9, 9.5vw)';
      document.getElementById('games').style.marginLeft = '1vw';
    });
    images.forEach(image => {
      image.style.width = '10vw';
      image.style.height = '10vw';
    });
  }
}

// Toggle game perspective icon
function toggleIcon() {
  var icon = document.getElementById('gamePerspectiveIcon');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.remove('fa-down-left-and-up-right-to-center');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-up-right-and-down-left-from-center');
    gamesPerspective();
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.remove('fa-up-right-and-down-left-from-center');
    icon.classList.add('fa-regular');
    icon.classList.add('fa-down-left-and-up-right-to-center');
    gamesPerspective();
  }
}

// Attach scroll event to window
window.addEventListener("scroll", function() {
  var main = document.getElementById("main");
  if (window.scrollY > main.offsetTop + main.offsetHeight - 110) {
    // Perform some action when scrolled
  }
});

// Function to perform search
function search() {
  var games = document.getElementsByClassName('game');
  var scrollDiv = document.getElementById("games").offsetTop - 140;
  var scrollDiv2 = document.getElementById("main").offsetTop;
  var gamesLeft = 0;
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("games");
  li = ul.getElementsByClassName('game');

  // Iterate through games and filter
  for (i = 0; i < li.length; i += 1) {
    a = li[i].getElementsByTagName("h1")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }

  // Check games left
  for (i = 0; i < games.length; i += 1) {
    if (games[i].style.display === 'none') {
      gamesLeft += 1;
    }
  }

  // Handle cases when no games match the filter
  if (gamesLeft === games.length) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('footer').style.display = 'none';
    window.scrollTo({ top: scrollDiv2, behavior: 'instant' });
    document.getElementById('games').style.display = 'none';
  } else {
    window.scrollTo({ top: scrollDiv, behavior: 'instant' });
    document.getElementById('error').style.display = 'none';
    document.getElementById('games').style.display = 'grid';
  }
  window.scrollTo({ top: scrollDiv, behavior: 'instant' });
}

// Attach focus and focusout events to search input
document.getElementById('search').addEventListener('focus', () => {
  document.getElementById('games').style.marginBottom = '28.8vw';
  document.getElementById('footer').style.display = 'none';
});
document.getElementById('search').addEventListener('focusout', () => {
  document.getElementById('games').style.marginBottom = '1.5vw';
  if (document.getElementById('error').style.display === 'none') {
    // Do nothing
  }
});

// Function to check screen width
function checkScreenWidth() {
  // Perform actions based on screen width
}

// Partner popup data
const partnerPopup = {
  'weblfg': {
    title: 'WebLFG',
    image: 'assets/WebLFG.png',
    description: 'From internet classics to present-day favorites, it\'s online entertainment right at your fingertips.',
    discordLink: 'https://discord.gg/nZ8GAV9kNA',
    bgColor: '#1b1c24',
    closeColor: '#ffffff',
    discordClass: '',
    titleStyle: ''
  },
  'kazwire': {
    title: 'Kazwire',
    image: 'assets/kazwire.png',
    description: 'From the gaming classics to the internet, access YouTube, TikTok, and even your favorite games freely and securely.',
    discordLink: 'https://discord.gg/kazchat-785577600219086881',
    bgColor: '#f49625',
    closeColor: '#0875bb',
    discordClass: 'kazwire',
    titleStyle: ''
  },
  'totally science': {
    title: 'Totally Science',
    image: 'assets/totally-science.png',
    description: 'Totally Science - your one-stop destination for free online games and unblocked content! Youtube, multiplayer games, Minecraft, and more.',
    discordLink: 'https://discord.gg/StA8kCGTwd',
    bgColor: '#1f0336',
    closeColor: '#f75dfc',
    discordClass: 'totally-science',
    titleStyle: 'font-size:4vw;'
  }
};

// Partner data
var partners = [
  { name: 'WebLFG', url: 'https://weblfg.com/', img: 'assets/WebLFG.png', desc: 'From internet classics to present-day favorites, it\'s online entertainment right at your fingertips.', class: 'weblfg' },
  { name: 'Kazwire', url: 'https://kazwire.com/', img: 'assets/kazwire.png', desc: 'From the gaming classics to the internet, access YouTube, TikTok, and even your favorite games freely and securely.', class: 'kazwire' },
  { name: 'Totally Science', url: 'https://totallyscience.co/', img: 'assets/totally-science.png', desc: 'Totally Science, your one-stop destination for free online games and unblocked content! Youtube, multiplayer games, Minecraft, and more.', class: 'totally', pStyle: 'font-size:1.2vw;' }
];

// Function to generate partner slides
function generateSlide(partner1, partner2) {
  return `
    <a href="${partner1.url}" target="_blank" rel="noreferrer">
      <div class="partner ${partner1.class}" onclick="partner('${partner1.name.toLowerCase()}')" id="${partner1.name.toLowerCase()}">
        <img src="${partner1.img}" alt="${partner1.name}">
        <h3 style="color:#fff;">${partner1.name}</h3>
        <p style="${partner1.pStyle || ''}">${partner1.desc}</p>
      </div>
    </a>
    <a href="${partner2.url}" target="_blank" rel="noreferrer">
      <div class="partner ${partner2.class}" onclick="partner('${partner2.name.toLowerCase()}')" id="${partner2.name.toLowerCase()}">
        <img src="${partner2.img}" alt="${partner2.name}">
        <h3 style="color:#fff;">${partner2.name}</h3>
        <p style="${partner2.pStyle || ''}">${partner2.desc}</p>
      </div>
    </a>
  `;
}

// Open and close settings panel
function settings() {
  var settings = document.getElementById('settings');
  if (settings.style.right === '-35%') {
    settings.classList.toggle('open');
  } else {
    settings.classList.toggle('open');
  }
}

// Close settings panel when outside action occurs.
setInterval(() => {
  if (settingsDiv.classList.contains("open")) {
      document.addEventListener('click', handleOutsideClick);
      window.addEventListener('scroll', handleScroll);
  }
  const searchInput = document.getElementById('search');
}, 100);


// Attach click events to options to switch pages
document.querySelectorAll('.option').forEach(function(option) {
  option.addEventListener('click', function() {
    document.querySelectorAll('.page').forEach(function(page) {
      page.style.display = 'none';
    });
    document.querySelectorAll('.option').forEach(function(opt) {
      opt.classList.remove('active');
    });
    option.classList.add('active');
    const pageId = option.getAttribute('data-page');
    document.getElementById(pageId).style.display = 'block';
  });
});

// Function to get random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 3)) + min;
}

// Function to add or remove hacks
function addHack(target, button) {
  let hacks = JSON.parse(localStorage.getItem('hacks')) || [];
  if (hacks.includes(target)) {
    hacks = hacks.filter(hack => hack !== target);
    button.innerHTML = 'Install<i class="fa-solid fa-circle-down"></i>';
    button.classList.remove('remove');
  } else {
    hacks.push(target);
    button.innerHTML = 'Remove<i class="fa-solid fa-trash"></i>';
    button.classList.add('remove');
  }
  localStorage.setItem('hacks', JSON.stringify(hacks));
  console.log(hacks);
}

//Cloak browser tab
function cloak(icon, title, id) {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = icon;
  document.title= title;
  document.getElementsByTagName('head')[0].appendChild(link);
  
  localStorage.setItem('icon', icon);
  localStorage.setItem('title', title);
  localStorage.setItem('activeTab', id);

  document.querySelectorAll('#settings #pages #general .icons div').forEach(div => div.classList.remove('active'));

  document.querySelector(`#${id}`).classList.add('active');
}

var savedIcon = localStorage.getItem('icon');
var savedTitle = localStorage.getItem('title');
var savedTab = localStorage.getItem('activeTab');

if (savedIcon && savedTitle && savedTab) {
  cloak(savedIcon, savedTitle, savedTab);
} else {
  cloak('/images/favicon.png', 'OwlGames', 'owlgames');
}

// Function to display partner popup
function partner(partnerName) {
  const popup = partnerPopup[partnerName];
  const partnerPopupElement = document.getElementById('partner-popup');
  partnerPopupElement.style.backgroundColor = popup.bgColor;
  partnerPopupElement.querySelector('.close').style.color = popup.closeColor;
  partnerPopupElement.querySelector('.partner-title').style = popup.titleStyle || '';
  partnerPopupElement.querySelector('.partner-title').textContent = popup.title;
  partnerPopupElement.querySelector('.partner-image').src = popup.image;
  partnerPopupElement.querySelector('.partner-description').textContent = popup.description;
  partnerPopupElement.querySelector('.discord-link').href = popup.discordLink;
  partnerPopupElement.querySelector('.discord-link').classList = popup.discordClass;
  partnerPopupElement.classList.add('active');
}

// Function to close partner popup
function closePartnerPopup() {
  const partnerPopupElement = document.getElementById('partner-popup');
  partnerPopupElement.classList.remove('active');
}
