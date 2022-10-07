class Game
{
    constructor(height, width, img) 
    {
        this.height = height;
        this.width = width;
        document.body.innerHTML = `<div class="tutorial">Играть нужно стрелками лево/право или A/D</div>`;
        if (!document.querySelector(`#menu`)) { document.body.innerHTML += `<div id="menu"></div>`; }
        this.element = document.querySelector(`#menu`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("'+img+'")';

        this.logo = document.createElement("p");
        this.element.appendChild(this.logo);
        this.start = document.createElement("p");
        this.element.appendChild(this.start);
        this.logo.textContent = `osu!catch`;
        this.start.textContent = `Начать игру`;
        this.start.addEventListener('click', function()
        {
            let audio = new Audio('./audio/start.mp3');
            audio.play();
            this.startGame();
        }.bind(this));
    }

    startGame()
    {
        let field = new GameArena('field', this.height, this.width, './img/background1.jpg');
        let player = new GamePlayer('player', 100, 100, field, './img/player.png');
        
        let i = 0;
        setInterval(function()
        {
            window['object' + i] = new GameObject('object', 75, 75, field, player);
            i++;
        }.bind(this), 1000);
    }
}

let game = new Game(800, 800, './img/menu1.jpg');

