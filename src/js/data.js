const infoAPiUrl = 'https://api.herowarsportal.com/api/site-info';

setInterval(() => {
    fetch(infoAPiUrl).then(responce => responce.json()).then(data => {
        const { phase } = data.data;
        const { card_50, card_100, card_500, card_all } = phase;
    
        portalCount = phase?.install;
        portalCountOld = localStorage.getItem('portalCount')
        localStorage.setItem('portalCount', portalCount);
        
    
        document.getElementById('card_50').innerHTML = card_100;
        document.getElementById('card_100').innerHTML = card_50;
        document.getElementById('card_10').innerHTML = card_500;
        document.getElementById('card_all').innerHTML = card_all;
        document.getElementById('card_all_mobile').innerHTML = card_all;
    })
}, 1000 * 60 * 3)
