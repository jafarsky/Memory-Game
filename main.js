const allCards = document.querySelectorAll('.memory-card');

function clickCard()
{
    this.querySelector('.front-face').classList.remove('hidden');
    this.querySelector('.back-face').classList.add('hidden');
}

for (let i = 0 ; i < allCards.length ; i++)
    allCards[i].querySelector('.front-face').classList.add('hidden');

allCards.forEach (card => card.addEventListener('click', clickCard));

