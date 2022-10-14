let memoryGame = document.getElementById('memory-game');
let allCards = document.querySelectorAll('.memory-card');
let allFrontFaces = document.querySelectorAll('.front-face');
let allBackFaces = document.querySelectorAll('.back-face');
let nextLevelBtn = document.getElementById('nextLevelBtn');
let numLevel = document.getElementById('numLevel');

let lockCards = false;
let hasShowcard = true;
let firstCard = 0;
let secondCard = 0;
let score = 0;
let levelsCount = 1;


function showData()
{
    console.log(`score => ${score}    ---    levelsCount => ${levelsCount}`);
}
showData();


const backFaceImgName1 = ['sameroom', 'nuxt-icon', 'github-octocat', 'waffle-icon', 'nightwatch', 'mailchimp-freddie', 'phalcon', 'testmunk']
const backFaceImgName2 = ['nightwatch', 'mailchimp-freddie', 'phalcon', 'testmunk']


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
}



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

    if (++score === (levelsCount * 2))
    {
        levelsCount++;

        let card1 = backFaceImgName1[levelsCount - 2];
        let card2 = backFaceImgName2[levelsCount - 2];

        memoryGame.innerHTML += newCards(card1) + newCards(card2);

        updateVariable();
        defaultMode();
    }
    showData();
} //_____________ removeClickEvent()


function defaultMode()
{
    score = 0;
    shuffle();

    // remove class 'hidden' for all img.front-face , to make mode default 👇🏻
    allFrontFaces.forEach (frontFace => frontFace.classList.remove('hidden'));

    // Add class 'hidden' for all img.back-face , to be able remove class 'hidden : 👇🏻
    allBackFaces.forEach (backface => backface.classList.add('hidden'));

    // Add Click Event for All Cards Didv : 👇🏻
    allCards.forEach (card => card.addEventListener('click', clickCard));
}
defaultMode();


function updateVariable()
{
    allCards = document.querySelectorAll('.memory-card');
    allBackFaces = document.querySelectorAll('.back-face');
    allFrontFaces = document.querySelectorAll('.front-face');
}


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

