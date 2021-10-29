import daysInOrder from './Utilitaire/gestionTemps.js';
//console.log('depuis main.js ' + daysInOrder);

const APIKEY = 'a89fee2489ffcb6afe914f3c3897981a';
let apiResults;

// selectionner les classes temps, etc... pour affichage dynamique
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature'); 
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision'); 
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const icone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {

    //console.log(position);
    let longitude = position.coords.longitude; //coords = objet, cf console
    let latitude = position.coords.latitude;
    AppelAPI(longitude, latitude);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner. Veuillez l'activer.`)
    })
}
// Web Server for Chrome pour pb localisation



/* Extraire latitude et longitude et faire appel à L'API */

// Appel à l'API. fetch() retourne une promesse (then) (va se résoudre quand la requête est bien effectuée)
// On récupère la latitude et la longitude

function AppelAPI(longitude, latitude) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)
    .then((response) => { // en param la réponse du fetch
        return response.json();
    }) // 1ère réponse, pas lisible -> autre promesse pour transformer au format json
    .then((data) => {
        console.log(data);

        apiResults = data;

        temps.innerText = apiResults.current.weather[0].description;
        temperature.innerText = `${Math.trunc(apiResults.current.temp)}°`;
        localisation.innerText = apiResults.timezone;


        // On veut afficher les heures par tranches de 3, avec leurs températures :

        let heureActuelle = new Date().getHours();

        for (let i=0; i < heure.length; i++){ // heure.length = 7 car on a 7 blocs heure et heure correspond à 1 bloc heure
            
            let heureIncr = heureActuelle + (i * 3); 
            // ex : 14h + ( i(position) * 3 ) -> décale de 3 à chaque tour de boucle : 14h + 3 = 17h pour prochaine case
      
    
            // Pour ne pas avoir 14h....26h, 29h...Condition if :

            if (heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24} h`; // si 26h, on passe à 2h du matin
            } else if(heureIncr === 24){
                heure[i].innerText = "00 h";
            } else {
                heure[i].innerText = `${heureIncr} h`; 
            }
        }


        // Afficher les températures associées aux heures :

        for(let j=0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(apiResults.hourly[j * 3].temp)}°`;
        }


        // 3 1ers jours

        //Pour chacun de ces blocs, on itère sur le tableau des jours en ordre importé
        //on prend le jour qui correspond au carré et on prend les 3 1eres lettres de la chaîne de caractère 
        
        for(let k = 0; k < daysInOrder.length; k++){
            joursDiv[k].innerText = daysInOrder[k].slice(0,3);
        }

        // température par jour

        for(let l = 0; l < 7; l++){
            tempJoursDiv[l].innerText =`${Math.trunc(apiResults.daily[l + 1].temp.day)}°`;
        }

        //Icône dynamique

        if (heureActuelle >= 6 && heureActuelle < 21) {
            icone.src = `ressources/jour/${apiResults.current.weather[0].icon}.svg`;
        } else {
            icone.src = `ressources/nuit/${apiResults.current.weather[0].icon}.svg`;
        }
        //apiResults.current.weather[0].icon = on récupère le code icons de l'API
        //on a renommé des icones trouvées sur le net avec ces codes pour que cela corresponde
        //selon l'heure du jour et la météo, on affiche des îcones différentes


        /* Animation chargement */
        //Dès qu'on reçoit les données de l'API, l'icône chargement ne reste pas (si pb, on voit juste le logo chargement)
        chargementContainer.classList.add('disparition'); //On ajoute la classe disparition (opacity 0)
    })
}


