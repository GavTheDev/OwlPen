/*
   ,_     _,
     '._.'
'-,   (_)   ,-'
  '._ .:. _.'
   _ '|Y|' _
 ,` `>\ /<` `,
` ,-`  I  `-, `
  |   /=\   |
,-'   |=|   '-,
      )-(
      \_/
*/

// Check if the client is mobile.
window.onload = function() {
    var isMobileSafari = /iP(ad|od|hone)/i.test(navigator.platform) && /WebKit/i.test(navigator.userAgent) && !(/(CriOS|FxiOS)/i.test(navigator.userAgent));
    if (!CSS.supports('backdrop-filter', 'blur(18px)') || isMobileSafari) {
        var navigation = document.querySelector('#navigation');
        if (navigation) {
            navigation.style.backdropFilter = '';
            navigation.style.backgroundColor = '#2b2b2bf1';
        }
    }
}

// Adjust UI if mobile.
if (mobile) {
    function search() {
        let inputValue = document.getElementById('search').value.toLowerCase();
        let games = document.querySelectorAll('#games .game');
        let noResults = true; 
    
        games.forEach(function(game) {
            let gameTitle = game.querySelector('h1').textContent.toLowerCase();
    
            if (gameTitle.includes(inputValue)) {
                game.style.display = 'flex';
                noResults = false;
            } else {
                game.style.display = 'none';
            }
        });
    
        let existingMessage = document.getElementById('noResultsMessage');
        if (existingMessage) {
            existingMessage.remove();
        }
    
        if (noResults) {
            let message = document.createElement('div');
            message.id = 'noResultsMessage';
            message.textContent = 'Sorry, no results :(';
            message.style.fontSize = '6vw';
            message.style.textAlign = 'center';
            message.style.fontWeight = '700';
            message.style.width = '100vw';
            document.getElementById('games').appendChild(message);
        }
    }
} else {
    function search() {
        var games = document.getElementsByClassName('game');
        var input = document.getElementById('search');
        var filter = input.value.toUpperCase();
        var ul = document.getElementById("games");
        var li = ul.getElementsByClassName('game');
        
        var searchResults = document.getElementById("searchResults");
        
        if (input.value === '') {
            searchResults.innerHTML = '';
        }
    }


    function clearSearch() {
        const searchInput = document.getElementById("search");
        const searchResults = document.getElementById("searchResults");
        const searchButton = document.getElementById("settings-button-div");
        searchInput.style.borderBottomLeftRadius = '1vw';
        searchButton.style.borderBottomRightRadius = '1vw';
        searchResults.innerHTML = ''; 
        searchInput.value = ''; 
        searchResults.style.opacity = '0';
    }

    document.getElementById('search').addEventListener('input', search);
    let uniqueGames = new Set();

    document.addEventListener("DOMContentLoaded", function() {
        const searchInput = document.getElementById("search");
        const searchResults = document.getElementById("searchResults");
        const searchButton = document.getElementById("settings-button-div");
        const uniqueGames = new Set();  // Initialize the uniqueGames set if it's not already defined

        window.search = function() {
            uniqueGames.clear(); // Clear the set at the beginning of a new search
            const query = searchInput.value;
        
            let filteredGames = [];
            const allGames = document.querySelectorAll("#games .game");
        
            allGames.forEach(game => {
                const title = game.querySelector("h1").textContent;
                const imageSrc = game.querySelector("img").dataset.src;
                const description = game.querySelector(".description-search").textContent; // Fetch the description
                const gameUrl = game.querySelector(".game-url").textContent; // Fetch the game URL
                
                if (title.toLowerCase().includes(query.toLowerCase())) {
                    if (!uniqueGames.has(title)) { // Check if the game is unique
                        uniqueGames.add(title); // Add to unique set
                        filteredGames.push({ title, imageSrc, description, gameUrl }); // Add description and game URL here
                    }
                }
            });
        
            searchResults.innerHTML = '';
        
            if (filteredGames.length > 0) {
                searchInput.style.borderBottomLeftRadius = '0';
                searchInput.style.borderBottomRightRadius = '0';
                searchButton.style.borderBottomRightRadius = '0';
                searchResults.style.opacity = '1';
                searchResults.style.zIndex = '9999999';
                
                filteredGames.forEach(game => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result");
                    resultDiv.innerHTML = `
                        <img data-src="${game.imageSrc}" alt="${game.title}">
                        <h1>${game.title}</h1>
                    `;
                    observeImage(resultDiv.querySelector("img"));
                    resultDiv.addEventListener("click", function() {
                        play(game.title, game.gameUrl, game.title, game.description);
                        clearSearch();
                    });
        
                    searchResults.appendChild(resultDiv);
                });
            } else {
                const noResultsDiv = document.createElement("h2");
                noResultsDiv.classList.add("no-results");
                noResultsDiv.textContent = "Sorry, no results :(";
                noResultsDiv.style.fontSize = "19px";
                noResultsDiv.style.textAlign = "center";
                noResultsDiv.style.paddingBottom = ".8vw";
                searchResults.appendChild(noResultsDiv);
            }

            document.addEventListener('mousedown', function(event) {
                if (!searchInput.contains(event.target) && !searchResults.contains(event.target) && event.target !== searchInput && event.target !== searchResults) {
                    clearSearch();
                }
            });
        }; 
    });
}

// Custom developer console message.
window.onload = console.log (' _^_\n |@|         Be Careful Here\n<===>\n #::\n #::\n#███:^-.\n████████^ ~"(_.~"(_.~"(_.~"(_.~"(');

// Retrieve the '<div></div>' element of the settings panel.
var settingsDiv = document.getElementById('settings');

// Functions to execute on page load.
window.onload = function() {
  
  // Load PWA service worker.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js");
    });
  }
  
  // Redirect mobile devices to 'https://www.owlpentest.com/mobile-error'
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    window.location.href = "https://www.owlpentest.com/mobile-error";
  }
};

// Randomized messages on page load.
document.addEventListener("DOMContentLoaded", function () {
  fetch('./lib/messages.json')
      .then(response => response.json())
      .then(data => {
          const messages = data.messages;
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          document
              .getElementById('message')
              .textContent = randomMessage
      })
});

// Close the settings panel whenever there's an outside action.
function handleOutsideClick(event) {
  if (event.target === settingsDiv) return;
  settingsDiv.classList.remove("open");
  document.removeEventListener('click', handleOutsideClick);
}

// Allow the tab of the exit button to be draggable.
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

// Attach a click event to option elements.
document.querySelectorAll('.option').forEach(function(option) {
  option.addEventListener('click', function() {
    // Hide all pages and deactivate options.
    document.querySelectorAll('.page').forEach(function(page) {
      page.style.display = 'none';
    });
    document.querySelectorAll('.option').forEach(function(opt) {
      opt.classList.remove('active');
    });

    // Activate the clicked option and show its associated page.
    option.classList.add('active');
    const pageId = option.getAttribute('data-page');
    document.getElementById(pageId).style.display = 'block';
  });
});

// Function to handle scrolling after opening the settings panel.
function handleScroll() {
  settings();
  document.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('scroll', handleScroll);
}

// Get elements by ID in html for the safety key.
var record = document.getElementById('record');
var saveButton = document.getElementById('save');
var displayKey = document.querySelector('.key h2');

// Excute the ability to use safety key on page load.
window.onload = function() {
  var preferredKey = localStorage.getItem('preferredKey');
  if (preferredKey) {
    displayKey.innerHTML = preferredKey;
  }
};

// Function to save the safety key.
var logKeyCode = function(event) {
  var key = event.key;
  var unwantedKeys = ['Shift', 'Control']; // List of disallowed keys
  if (!unwantedKeys.includes(key)) {
    localStorage.setItem('key', key);
    localStorage.setItem('preferredKey', key);
    displayKey.innerHTML = key;
  }
};

// Attach a click event to safety key record button.
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

// Set the initial value for safety key.
var safetyKey = "https://classroom.google.com/";

// Allow the user to check and set the preffered safety key location.
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

// Attach a click event to the elements for changing the safety key location.
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

// Function to remove the 'class="active"' attribute from site options.
function removeActiveClass() {
  var btns = document.getElementsByClassName("site-option");
  for (var i = 0; i < btns.length; i += 1) {
    btns[i].classList.remove("active");
  }
}

// Function to handle the activation of safety key.
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

// Attach the 'keydown' event listener to 'alertPreferredKey'.
document.addEventListener('keydown', alertPreferredKey);

// Attach the 'keydown' event for the safety key location and preferred key.
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

// Function to shuffle the game order on page load.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fetch and process game list data from './lib/games.json'.
fetch('./lib/games.json')
    .then(response => response.json())
    .then(games => {
        shuffleArray(games);
        games.forEach(game => {
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
            observeImage(gameElement.querySelector(".img"));
        });
        
        return fetch('./lib/apps.json');
    })
    .then(response => response.json())
    .then(apps => {
        shuffleArray(apps);
        apps.forEach(app => {
            const appElement = document.createElement("div");
            appElement.classList.add("app");
            appElement.innerHTML = `
        <div class="img" loading="lazy" data-src="${app[2]}" onclick="play('${app[0]}', '${app[3]}')">
          <div class="cover"></div>
        </div>
        <div id="app-content" class="app-content">
          <h1>${app[0]}</h1>
          <p>${app[1]}</p>
          <button class="install" onclick="play('${app[0]}','${app[3]}')">Start</button>
          <span>(Credit: ${app[4]})</span>
        </div>
      `;
            document.getElementById("apps").appendChild(appElement);
            observeImage(appElement.querySelector(".img"));
        });
    })
    .finally(() => {
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 100);
        document.getElementById('games').style.display = 'grid';
        document.getElementById('apps').style.display = 'grid';
    });

// Function to observe images for lazy loading.
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

// Function to start a game.
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

// Function to switch game perspective.
function Perspective() {
// For games
const gameContent = Array.from(document.getElementsByClassName('game-content'));
const games = Array.from(document.getElementsByClassName('game'));
const gameImages = Array.from(document.getElementsByClassName('img'));  // Images for games

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
    gameImages.forEach(image => {
        image.style.width = '10vw';
        image.style.height = '10vw';
    });
}

// For apps
const appContent = Array.from(document.getElementsByClassName('app-content'));
const apps = Array.from(document.getElementsByClassName('app'));
const appImages = Array.from(document.getElementsByClassName('img'));  // Images for apps

if (document.getElementById('apps').style.gridTemplateColumns === 'repeat(9, 9.5vw)') {
    appContent.forEach(app => {
        apps.forEach(appTab => {
            appTab.style.backgroundColor = '#222222';
            appTab.style.padding = '1.2vw';
            appTab.style.display = 'flex';
        });
        app.style.display = 'block';
        document.getElementById('apps').style.gridTemplateColumns = '.1fr .1fr';
        document.getElementById('apps').style.marginLeft = '.6vw';
    });
} else {
    appContent.forEach(app => {
        apps.forEach(appTab => {
            appTab.style.backgroundColor = 'transparent';
            appTab.style.padding = '0px';
            appTab.style.display = 'block';
        });
        app.style.display = 'none';
        document.getElementById('apps').style.gridTemplateColumns = 'repeat(9, 9.5vw)';
        document.getElementById('apps').style.marginLeft = '1vw';
    });
    appImages.forEach(image => {
        image.style.width = '10vw';
        image.style.height = '10vw';
    });
}
}


// Toggle game perspective icon.
function toggleIcon() {
  var icon = document.getElementById('PerspectiveIcon');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.remove('fa-down-left-and-up-right-to-center');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-up-right-and-down-left-from-center');
    Perspective();
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.remove('fa-up-right-and-down-left-from-center');
    icon.classList.add('fa-regular');
    icon.classList.add('fa-down-left-and-up-right-to-center');
    Perspective();
  }
}

// Attach scroll event to window.
window.addEventListener("scroll", function() {
  var main = document.getElementById("main");
  if (window.scrollY > main.offsetTop + main.offsetHeight - 110) {
    // Perform some action when scrolled.
  }
});

// Function to perform a game search.
function search() {
    var games = document.getElementsByClassName('game');
    var apps = document.getElementsByClassName('app');
    var scrollDiv2 = document.getElementById("main").offsetTop;
    var gamesFound = false;
    var appsFound = false;
    var input, filter, ul, li, a, i, txtValue;

    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    
    // Function to filter items by their <h1> tag content and determine if items are found
    function filterItems(ul, className) {
        var found = false;
        li = ul.getElementsByClassName(className);
        for (i = 0; i < li.length; i += 1) {
            a = li[i].getElementsByTagName("h1")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                found = true;
            } else {
                li[i].style.display = "none";
            }
        }
        return found;
    }
    
    // Filter games
    gamesFound = filterItems(document.getElementById("games"), 'game');

    // Filter apps
    appsFound = filterItems(document.getElementById("apps"), 'app');

    // Show or hide titles based on whether items were found in each category
    document.getElementById('gamesTitle').style.display = gamesFound ? "block" : "none";
    document.getElementById('appsTitle').style.display = appsFound ? "block" : "none";

    // Handle cases when no games or apps match the filter.
    if (!gamesFound && !appsFound) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('footer').style.display = 'none';
        window.scrollTo({ top: scrollDiv2, behavior: 'instant' });
        document.getElementById('games').style.display = 'none';
        document.getElementById('apps').style.display = 'none';  
    } else {
        document.getElementById('error').style.display = 'none';
        if (gamesFound) {
            document.getElementById('games').style.display = 'grid';  
        } else {
            document.getElementById('games').style.display = 'none';
        }
        if (appsFound) {
            document.getElementById('apps').style.display = 'grid';   
        } else {
            document.getElementById('apps').style.display = 'none';
        }
    }
}

// Attach focus and focusout events to search input to handle the title visibility
document.getElementById('search').addEventListener('focusout', () => {
    if (document.getElementById('search').value === "") {
        document.getElementById('gamesTitle').style.display = 'none';
        document.getElementById('appsTitle').style.display = 'none';
    }
});

// Function to open and close settings panel.
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


// Attach click events to options to switch pages.
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
}

var savedIcon = localStorage.getItem('icon');
var savedTitle = localStorage.getItem('title');
var savedTab = localStorage.getItem('activeTab');

if (savedIcon && savedTitle && savedTab) {
  cloak(savedIcon, savedTitle, savedTab);
} else {
  cloak('https://www.owlpentest.com/games/images/favicon.png', 'OwlGames', 'owlgames');
}
