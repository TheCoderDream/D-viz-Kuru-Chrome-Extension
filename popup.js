const customHttp = new CustomHTTP();

// dom elements

const cSwitch =document.getElementById('currencySwitch');

const toggleCheckMap = {};

const tur = document.getElementById('try');
const usd = document.getElementById('usd');
const eur = document.getElementById('eur');
const gbp = document.getElementById('gbp');
const aud = document.getElementById('aud');

const countries = {
    usd: usd,
    eur: eur,
    gbp: gbp,
    aud: aud
};


cSwitch.addEventListener('change', (e) => {
   if(cSwitch.checked) {
       tur.innerText = 'TRY';

       for(let countryKey in countries) {
           removeChildNodes(countries[countryKey]);
           countries[countryKey].innerText = toggleCheckMap[`checked${countryKey.toUpperCase()}`];
           countries[countryKey].previousElementSibling.innerText = `1 ${countryKey.toUpperCase()}`;
       }

   } else {
       tur.innerText = '1 TRY';
       for(let countryKey in countries) {
           removeChildNodes(countries[countryKey]);
           countries[countryKey].innerText = toggleCheckMap[`unchecked${countryKey.toUpperCase()}`];
           countries[countryKey].previousElementSibling.innerText = `${countryKey.toUpperCase()}`;
       }
   }
   e.preventDefault();
});


customHttp.get('https://api.exchangeratesapi.io/latest?base=TRY')
    .then((data) => {
        const rates = data.rates;




        toggleCheckMap.checkedUSD = rates.USD.toFixed(2);
        toggleCheckMap.checkedEUR = rates.EUR.toFixed(2);
        toggleCheckMap.checkedGBP = rates.GBP.toFixed(2);
        toggleCheckMap.checkedAUD = rates.AUD.toFixed(2);

    /*    for(let countryKey in countries) {
            removeChildNodes(countries[countryKey]);
            countries[countryKey].innerText = toggleCheckMap[`checked${countryKey.toUpperCase()}`];
        } */

    })
    .catch((err) => {
        console.error(err);
    });

customHttp.get('https://api.exchangeratesapi.io/latest?base=USD')
    .then((data) => {
        const rates = data.rates;
        toggleCheckMap.uncheckedUSD = rates.TRY.toFixed(2);
        console.log(`usd ${toggleCheckMap.uncheckedUSD}`);
        removeChildNodes(usd);
        usd.innerText = toggleCheckMap.uncheckedUSD;
    })
    .catch((err) => {
        console.error(err);
    });

customHttp.get('https://api.exchangeratesapi.io/latest?base=EUR')
    .then((data) => {
        const rates = data.rates;
        toggleCheckMap.uncheckedEUR = rates.TRY.toFixed(2);
        console.log(`eur ${toggleCheckMap.uncheckedEUR}`);
        removeChildNodes(eur);
        eur.innerText = toggleCheckMap.uncheckedEUR;
    })
    .catch((err) => {
        console.error(err);
    });

customHttp.get('https://api.exchangeratesapi.io/latest?base=GBP')
    .then((data) => {
        const rates = data.rates;
        toggleCheckMap.uncheckedGBP = rates.TRY.toFixed(2);
        console.log(`GBP ${toggleCheckMap.uncheckedGBP}`);
        removeChildNodes(gbp);
        gbp.innerText = toggleCheckMap.uncheckedGBP;
    })
    .catch((err) => {
        console.error(err);
    });

customHttp.get('https://api.exchangeratesapi.io/latest?base=AUD')
    .then((data) => {
        const rates = data.rates;
        toggleCheckMap.uncheckedAUD = rates.TRY.toFixed(2);
        console.log(`AUD ${toggleCheckMap.uncheckedAUD}`);
        removeChildNodes(aud);
        aud.innerText = toggleCheckMap.uncheckedAUD;
    })
    .catch((err) => {
        console.error(err);
    });

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
