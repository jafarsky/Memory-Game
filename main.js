const allCards = document.querySelectorAll('.memory-card');
const allBackFaces = document.querySelectorAll('.back-face');

let hasShowcard = true;
let firstCard, secondCard;

async function hideCards()
{
    await new Promise((resolve, reject) => {
        setTimeout( _ => {
            firstCard.querySelector('.back-face').classList.add('hidden');
            firstCard.querySelector('.front-face').classList.remove('hidden');
            secondCard.querySelector('.back-face').classList.add('hidden');
            secondCard.querySelector('.front-face').classList.remove('hidden');
        }, 333);
    });
}

function clickCard()
{
    this.querySelector('.front-face').classList.add('hidden');
    this.querySelector('.back-face').classList.remove('hidden');

    if (hasShowcard) {
        // First click
        firstCard = this;
        hasShowcard = false;

    }
    else {
        // Second Click
        secondCard = this;
        hasShowcard = true;
        
        console.log(firstCard.dataset.framework)
        console.log(secondCard.dataset.framework)

        //--------------------------------------------- if cards match :)
        if (firstCard.dataset.framework === secondCard.dataset.framework)
        {
            firstCard.removeEventListener('click', clickCard);
            secondCard.removeEventListener('click', clickCard);
        }
        // if Not :/
        else
        {
            hideCards();
        }
    }
}

/****************************************** Add class 'hidden' for all img.back-face , to be able remove class 'hidden
for (let i = 0 ; i < allCards.length ; i++)
    allCards[i].querySelector('.back-face').classList.add('hidden'); */

allBackFaces.forEach (backface => backface.classList.add('hidden'));

allCards.forEach (card => card.addEventListener('click', clickCard));

