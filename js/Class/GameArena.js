class GameArena
{
    constructor(id, height, width, img) 
    {
        this.height = height;
        this.width = width;
        document.body.innerHTML = `<div class="tutorial">Играть нужно стрелками лево/право или A/D</div>`;
        if (!document.querySelector(`#${id}`)) { document.body.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "relative";
        this.element.style.backgroundImage = 'url("'+img+'")';
    }
}