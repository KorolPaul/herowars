
function createWinner(name, id) {
    const el = document.createElement('span');
    el.classList.add('winners_table-item');
    el.innerHTML = `${name} ${id}`;

    return el;
}

function loadData() {
    const infoAPiUrl = `https://api.herowarsportal.com/api/site-info?time=${Date.now()}`;

    fetch(infoAPiUrl).then(responce => responce.json()).then(data => {
        setData(data.data);
    });
}

function setData(data) {
    const { phase, winners } = data;
    const {
        card_50,
        card_100,
        card_500,
        card_all,
        portal,
        landing
    } = phase;

    portalLevel = landing;

    portalCount = phase?.install;
    portalCountOld = localStorage.getItem('portalCount');
    localStorage.setItem('portalCount', portalCount);


    document.getElementById('card_50').innerHTML = card_100;
    document.getElementById('card_100').innerHTML = card_50;
    document.getElementById('card_10').innerHTML = card_500;
    document.getElementById('card_all').innerHTML = card_all;
    document.getElementById('card_all_mobile').innerHTML = card_all;

    document.body.classList.add(`landing-phase-${landing}`);

    if (landing === 2 || landing === 3) {
        document.body.classList.add('results-page');
    }

    if (landing === 3) {
        const { card_50, card_100, card_500 } = winners;

        const winnersTable50 = document.getElementById('winners-50');
        const winnersTable100 = document.getElementById('winners-100');
        const winnersTable500 = document.getElementById('winners-500');

        card_50.map(card => {
            winnersTable50.appendChild(createWinner(card.name, card.game_id));
        });
        card_100.map(card => {
            winnersTable100.appendChild(createWinner(card.name, card.game_id));
        });
        card_500.map(card => {
            winnersTable500.appendChild(createWinner(card.name, card.game_id));
        });
    }
}

setInterval(loadData, 180000);

if (typeof cachedInfo !== 'undefined') {
    setData(cachedInfo.data)
} else {
    loadData();
}
