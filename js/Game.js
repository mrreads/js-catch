class Game
{
    startGame()
    {
        let field = new GameArena('field', 800, 800, './img/background1.jpg');
        let player = new GamePlayer('player', 100, 100, field, './img/player1.jpg');
        
        let i = 0;
        setInterval(function()
        {
            window['object' + i] = new GameObject('object', 75, 25, field, player);
            i++;
        }.bind(this), 1000);
    }
}

let game = new Game();
game.startGame();

