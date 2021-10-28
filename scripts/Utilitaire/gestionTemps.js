/* Sert à avoir un tableau avec les jours de la semaine dans l'ordre
à partir du jour actuel --> pour afficher la seconde rangée de prévisions */

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let today = new Date();
let options = {weekday: 'long'};
let currentDay = today.toLocaleDateString('fr-FR', options); // renvoie une chaine de caractères corres 
console.log(currentDay); // jeudi
//console.log(today); // Thu Oct 28 2021 18:54:14 

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1); 
//1ère lettre en MAJ + le reste


let daysInOrder = daysOfWeek.slice(daysOfWeek.indexOf(currentDay)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(currentDay)));
console.log(daysInOrder);


// daysOfWeek.slice -> on découpe un morceau de ce tableau à partir du jour actuel
//  --> ca donne, si on est jeudi : jeudi à dimanche.
// On concatène en re recoupant puor avoir dimanche à mercredi inclus


export default daysInOrder;
