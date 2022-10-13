const allCards = document.querySelectorAll('.memory-card');
const allBackFaces = document.querySelectorAll('.back-face');

let lockCards = false;
let hasShowcard = true;
let firstCard = 0;
let secondCard = 0;
let score = 0;



function showData()
{
    console.log(score);
}
showData();


/****************** shuffling cards places */
(function shuffle()
 {
    allCards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
 })();
//______ shuffle()


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

    score++;
    showData();
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


// Add class 'hidden' for all img.back-face , to be able remove class 'hidden : 👇🏻
allBackFaces.forEach (backface => backface.classList.add('hidden'));

// Add Click Event for All Cards Didv : 👇🏻
allCards.forEach (card => card.addEventListener('click', clickCard));
