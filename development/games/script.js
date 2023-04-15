fetch('games.json')
  .then(response => response.json())
  .then(games => {
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
        </div>
      `;
      document.getElementById("games").appendChild(gameElement);
      observeImage(gameElement.querySelector(".img"));
    });
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 100);
    document.getElementById('games').style.display = 'grid';
  });

function observeImage(imgElement) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [0]
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imgElement.style = `background-image: url(${imgElement.dataset.src}); background-size: cover; background-position: center;`;
        console.log(imgElement)
        observer.unobserve(imgElement);
      }
    });
  }, options);

  observer.observe(imgElement);
}

function play(game, url) {
    localStorage.setItem('game', game);
    if (document.getElementById('game-frame').style.display === 'block') {
        document.getElementById('game-frame').style.display = 'none';
        document.getElementById('iframe').src = '';
        document.body.style.overflowY = 'visible';
    } else {
        document.getElementById('game-frame').style.display = 'block';
        document.getElementById('iframe').src = url;
        document.body.style.overflowY = 'hidden';
    }
}

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
            })
            game.style.display = 'block';
            document.getElementById('games').style.gridTemplateColumns = '.1fr .1fr';
            document.getElementById('games').style.marginLeft = '.6vw';
        })
    } else {    
        gameContent.forEach(game => {
            games.forEach(gameTab => {
                gameTab.style.backgroundColor = 'transparent';
                gameTab.style.padding = '0px';
                gameTab.style.display = 'block';
            })
            game.style.display = 'none';
            document.getElementById('games').style.gridTemplateColumns = 'repeat(9, 9.5vw)';
            document.getElementById('games').style.marginLeft = '1vw';
        })
        images.forEach(image => {
            image.style.width = '10vw';
            image.style.height = '10vw';
        })
    }
}

// document.getElementById('changePerspective').addEventListener('click', function(e) {
        // gamesPerspective()
// });

document.getElementById('start-button').addEventListener('click', function(e) {
    var scrollDiv = document.getElementById("games").offsetTop - 110;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
});

window.addEventListener("scroll", function(){
    var main = document.getElementById("main");
    if (window.scrollY > main.offsetTop + main.offsetHeight - 110) {
        // something after first content passed
    }
})

function search() {
  var games = document.getElementsByClassName('game');
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("games");
  li = ul.getElementsByClassName('game');

  var gamesFound = 0;

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h1")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      gamesFound++;
    } else {
      li[i].style.display = "none";
    }
  }

  if (gamesFound === 0) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('footer').style.display = 'none';
    window.scrollTo({ top: document.getElementById("main").offsetTop, behavior: 'instant'});
    document.getElementById('games').style.display = 'none';
  } else {
    window.scrollTo({ top: document.getElementById("games").offsetTop - 140, behavior: 'instant'});
    document.getElementById('error').style.display = 'none';
    document.getElementById('games').style.display = 'grid';
  }
}


document.getElementById('search').addEventListener('focus', () => {
    document.getElementById('games').style.marginBottom = '28.8vw';
    document.getElementById('footer').style.display = 'none';
});

document.getElementById('search').addEventListener('focusout', () => {
    document.getElementById('games').style.marginBottom = '1.5vw';
    if (document.getElementById('error').style.display === 'none') {
        document.getElementById('footer').style.display = 'block';
    }
});

// var slideIndex = 0;
//showSlides();

//function showSlides() {
    //var i;
    //var slides = document.getElementsByClassName("item");
    //for (i = 0; i < slides.length; i++) {
        //slides[i].style.display = "none"; 
    //}
    //slideIndex++;
    //if (slideIndex > slides.length) {slideIndex = 1} 
    //slides[slideIndex-1].style.display = "block"; 
    //setTimeout(showSlides, 5000); // Change image every 5 seconds
//}

var popup = document.getElementById('popup');

function partner(name) {
    if (name === 'weblfg') {
        popup.style.display = 'block';
        document.getElementById('popupContent').innerHTML = `
            <div class="flex">
                <h1 id="popup-text">WebLFG</h1>
                <img src="assets/WebLFG.png" alt="weblfg">
            </div>
            <p>From internet classics to present-day favorites, it's online entertainment right at your fingertips.</p>
            <div class="discord">
            <a href="https://discord.gg/nZ8GAV9kNA" target="_blank">
                <i class="fa-brands fa-discord"></i>
                <span>Join their Discord</span>
            </a>
            </div>
            <div class="close" onclick="closePopup()">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
        `;
        document.getElementById('popupContent').style.backgroundColor = '#1b1c24';
        console.log(name);
    } else if (name === 'kazwire') {
        popup.style.display = 'block';
        document.getElementById('popupContent').innerHTML = `
            <div class="flex">
                <h1 id="popup-text">Kazwire</h1>
                <img src="assets/kazwire.png" alt="kazwire">
            </div>
            <p>From the gaming classics to the internet, access YouTube, TikTok, and even your favorite games freely and securely.</p>
            <div class="discord">
            <a href="https://discord.gg/kazwire" target="_blank" class="kazwire">
                <i class="fa-brands fa-discord"></i>
                <span>Join their Discord</span>
            </a>
            </div>
            <div class="close" onclick="closePopup()">
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
        `;
        document.getElementById('popupContent').style.backgroundColor = '#f49625';
        document.querySelector('.close i').style.color = '#0875bb';
        console.log(name);
    }
}

document.getElementById('clickBox').addEventListener('click', () => {
    popup.style.display = 'none';
});

document.querySelector('.discord').addEventListener('click', () => {
    popup.style.display = 'none';
});

function closePopup() {
    popup.style.display = 'none';
}