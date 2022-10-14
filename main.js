let memoryGameContainer = document.getElementById('memory-game');
let allCards = document.querySelectorAll('.memory-card');
let allFrontFaces = document.querySelectorAll('.front-face');
let allBackFaces = document.querySelectorAll('.back-face');
let nextLevelBtn = document.getElementById('nextLevelBtn');
let allCurrentLevel = document.querySelectorAll('.currentLevel');
let scoreInDocument = document.getElementById('score');
let scoreContent = document.getElementById('scoreContent');
let levelContent = document.getElementById('levelContent');
let whenSheWin = document.getElementById('whenSheWin');

let lockCards = false;
let hasShowcard = true;
let firstCard = 0;
let secondCard = 0;
let score = 0;
let levelsCount = 1;

// here below const array to store names of back-face img to send it later to the newcard() fun. 
const backFaceImgName1 = ['sameroom', 'nuxt-icon', 'github-octocat', 'waffle-icon'];
const backFaceImgName2 = ['nightwatch', 'mailchimp-freddie', 'phalcon', 'testmunk'];


/********************* default mode of game */
function defaultMode()
{
    shuffle();
    score = 0;
    scoreInDocument.innerText = score;

    // remove class 'hidden' for all img.front-face , to make mode default 👇🏻
    allFrontFaces.forEach (frontFace => frontFace.classList.remove('hidden'));

    // Add class 'hidden' for all img.back-face , to be able remove class 'hidden : 👇🏻
    allBackFaces.forEach (backface => backface.classList.add('hidden'));

    // Add Click Event for All Cards Didv : 👇🏻
    allCards.forEach (card => card.addEventListener('click', clickCard));
}
defaultMode();


/****************** shuffling cards places */
function shuffle()
{
    allCards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
} //_____________ shuffle()


/****************** when we click on card */
function clickCard()
{
    /***  lock all cards  ***/
    if (lockCards)    return;

    /****  fixdouble click bugs   ****/
    if (this === firstCard)     return;


    this.querySelector('.front-face').classList.add('hidden');
    this.querySelector('.back-face').classList.remove('hidden');

    if (hasShowcard) {
        // First click
        firstCard = this;
        hasShowcard = false;
    }
    else
    {
        // Second Click
        secondCard = this;
        hasShowcard = true;
        
        isMatch();
    }
} //_____________________ clickCard()


/**************** is fist & second cards are matching */
function isMatch()
{
    const is_match = (firstCard.dataset.framework === secondCard.dataset.framework);

    is_match  ?   removeClickEvent()  :  hideBack_showFront();
} //_____________ isMatch()


/************************* remove click() events from first & second cards */
function removeClickEvent()
{
    firstCard.removeEventListener('click', clickCard);
    secondCard.removeEventListener('click', clickCard);

    //  If We Open All CARDS
    if (++score === (levelsCount * 2))
    {
        levelsCount++;  // add 1 to level counter

        allCurrentLevel[1].innerText = levelsCount;

        if (levelsCount <= 5) {
            nextLevelBtn.classList.remove('hidden');
        }
        else {
            levelContent.classList.add('hidden');
            scoreContent.classList.add('hidden');
            memoryGameContainer.classList.add('hidden');
            whenSheWin.classList.remove('hidden');
        }
    }
    scoreInDocument.innerText = score;
} //_____________ removeClickEvent()


/********************************* hide back-face ,and show front face  */
function hideBack_showFront()
{
    lockCards = true; // we are now locked all cards from click

    setTimeout( _ => {
        firstCard.querySelector('.back-face').classList.add('hidden');
        firstCard.querySelector('.front-face').classList.remove('hidden');
        secondCard.querySelector('.back-face').classList.add('hidden');
        secondCard.querySelector('.front-face').classList.remove('hidden');

        lockCards = false; // and now oppen all cards to click

        firstCard = 0;
        secondCard = 0;
    }, 1111);
} //____________________________________________________________________ hideBack_showFront()


/********************** to add cards in document */
function newCards(name)
{
    let a = `
                <!--------------------------------- ${name} -->
                <div class="memory-card" data-framework="${name}">
                <img class="front-face" src="https://api.iconify.design/logos:sinatra.svg" alt="sinatra" />
                <img class="back-face" src="https://api.iconify.design/logos:${name}.svg" alt="${name}" />
                </div>
                <div class="memory-card" data-framework="${name}">
                <img class="front-face" src="https://api.iconify.design/logos:sinatra.svg" alt="sinatra" />
                <img class="back-face" src="https://api.iconify.design/logos:${name}.svg" alt="${name}" />
                </div>
            `;
    return a;
} //___________________ newCards(name)


/**************************** on click in next level button */
nextLevelBtn.onclick = _ => {

    setTimeout( _ => {

        // get name of back-face img from our arrays.
        let card1 = backFaceImgName1[levelsCount - 2];
        let card2 = backFaceImgName2[levelsCount - 2];

        // add block code of cards in document.
        memoryGameContainer.innerHTML += newCards(card1) + newCards(card2);

        allCurrentLevel.forEach (currentLevel => currentLevel.innerText = levelsCount);

        if (levelsCount == 2) {
            memoryGameContainer.classList.add('grid-cols-3');
        }
        else if (levelsCount <= 4) {
            memoryGameContainer.classList.add('grid-cols-4');
        }
        else {
            memoryGameContainer.classList.add('grid-cols-5');
        }
        // hide next level btn again.
        nextLevelBtn.classList.add('hidden');
        
        updateVariable();
        defaultMode();
    }, 1111);
} //_____________________________ nextLevelBtn.onclick()


/************************ update allCards, allBackFaces and allFrontFaces */
function updateVariable()
{
    allCards = document.querySelectorAll('.memory-card');
    allBackFaces = document.querySelectorAll('.back-face');
    allFrontFaces = document.querySelectorAll('.front-face');
} //_____________________________ updateVariable()