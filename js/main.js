class gameArena
{
    constructor(id, height, width, img) 
    {
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { document.body.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("'+img+'")';
    }
}

class gamePlayer
{
    constructor(id, height, width, field, img)
    {
        this.field =  field.element;
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { this.field.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = (field.height - this.height) + 'px';
        this.element.style.left = (field.width / 2 - this.width) + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';

        this.miss = 0;
        this.catch = 0;

        this.keyboardControl();
    }

    move(value)
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(this.field.style.width) - parseInt(this.element.style.width)))) 
        {
            let counter = 0;
            let move = setInterval(function () 
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(move);
                } 
                else 
                {
                    let temp;
                    counter++;
                    if (value >= 0) 
                    {
                        temp = parseInt(this.element.style.left) + 1;
                    } 
                    else 
                    {
                        temp = parseInt(this.element.style.left) - 1;
                    }
                    if (temp > 0) 
                    {
                        this.element.style.left = temp + "px";
                    }
                }

                if ((parseInt(this.element.style.left) + parseInt(this.width)) > parseInt(this.field.style.width))
                {
                    let temp = (parseInt(this.field.style.width) - parseInt(this.element.style.width));
                    this.element.style.left = temp + 'px';
                }
            }.bind(this), 1);
        }
    }

    keyboardControl()
    {
        document.addEventListener('keypress', function (event) 
        {
            if (event.code == 'KeyA') 
            {
                this.move(-10);
            }
            if (event.code == 'KeyD') 
            {
                this.move(10);
            }
        }.bind(this));
    }
}

class gameObject
{
    constructor()
    {
        this.create('object', 75, 25, field, player);
    }

    create(name, height, width, field, player)
    {
        this.player = player;
        this.field =  field.element;
        this.height = height;
        this.width = width;
        this.element = document.createElement("div");
        this.field.appendChild(this.element);
        this.element.classList.add(name);
        this.random = Math.round(Math.random() * (parseInt(this.field.style.width) - parseInt(this.width)));
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = 0 + 'px';
        this.element.style.left = this.random + 'px';
        this.randomImage();
        this.isRemoved = false;
        this.isPicked = false;

        setInterval(function () 
        {
            let temp = parseInt(this.element.style.top) + 5;
            this.element.style.top = temp + "px";

            if ((((parseInt(this.player.element.style.left) + parseInt(this.player.element.style.width)) > parseInt(this.element.style.left)) && (parseInt(this.player.element.style.left) < (parseInt(this.element.style.left) + parseInt(this.element.style.width)))) && (((parseInt(this.player.element.style.top) + parseInt(this.player.element.style.height)) > parseInt(this.element.style.top)) && (parseInt(this.player.element.style.top) < (parseInt(this.element.style.top) + parseInt(this.element.style.height)))))
            {
                if (this.isRemoved == false)
                {
                    this.isRemoved = true;
                    this.player.catch = this.player.catch + 1;
                    this.element.remove();
                }
            }
            
            if ((parseInt(this.element.style.top) + parseInt(this.element.style.height)/2) >= parseInt(this.field.style.height))
            {
                if (this.isRemoved == false)
                {
                    this.isRemoved = true;
                    this.player.miss = this.player.miss + 1;
                    this.element.remove();
                }
            }
        }.bind(this), 1000/60);
    }

    randomImage()
    {
        let randomNumber = Math.round(Math.random() * 3);
        if (randomNumber == 1) { this.element.style.backgroundImage = 'url("./img/baltika3.png")'; }
        if (randomNumber == 2) { this.element.style.backgroundImage = 'url("./img/baltika7.png")'; }
        if (randomNumber == 3) { this.element.style.backgroundImage = 'url("./img/baltika9.png")'; }
    }
}

let field = new gameArena('field', 800, 800, './img/background1.jpg');
let player = new gamePlayer('player', 100, 100, field, './img/player1.jpg');


let i = 0;
setInterval(function()
{
    window['object' + i] = new gameObject();
    i++;
}.bind(this), 1000);

setInterval(function()
{
    document.querySelector("#debug p:nth-child(1)").textContent = `Miss: ${player.miss}`;
    document.querySelector("#debug p:nth-child(2)").textContent = `Catch: ${player.catch}`;
}.bind(this), 100);