/*
Auteur : Brieuc Meyer
Version : 3
Ceci est jeu de loto
Credits : Mr Roumanet pour la fonction de vérification des nombres aléatoires , 
et Allan Escollano pour fixer des valeures dans les intervalles requis
*/

let valJ0 = document.getElementById("valJ0")
let valJ1 = document.getElementById("valJ1")
let valJ2 = document.getElementById("valJ2")
let valJ3 = document.getElementById("valJ3")
let valJ4 = document.getElementById("valJ4")
let valJ5 = document.getElementById("valJ5")

let complementairejoueur = document.getElementById("complementairejoueur")
let labelcomplementaire = document.getElementById("labelcomplementaire")
let btnrejouer = document.getElementById("btnrejouer")
let btntiragecahe = document.getElementById("btntiragecahe")
let erreur = document.getElementById("erreur")
let TirageCache = document.getElementById('TirageCache')

//vérifie les veleures du tirage par rapport à la grille du joueur
function VerifLoto() {
    let texte = " sans le complémentaire."

    //recupération des valeures du tirage 
    let valT0 = document.getElementById("valT0").value
    let valT1 = document.getElementById("valT1").value
    let valT2 = document.getElementById("valT2").value
    let valT3 = document.getElementById("valT3").value
    let valT4 = document.getElementById("valT4").value
    let valT5 = document.getElementById("valT5").value
    let complementairetirage = document.getElementById("complementairetirage").value



    //mise en tableau des valeures du tirage
    let tirage = [valT0, valT1, valT2, valT3, valT4, valT5]

    //mise en tableau des valeures du joueur
    let joueur = [valJ0.value, valJ1.value, valJ2.value, valJ3.value, valJ4.value, valJ5.value]

    //double boucle qui compare les 2 tableaux de valeurs (celui du joueur et celui du tirage) et qui ajoute + 1 à cpt dès correspondance

    let cpt = 0

    for (let i = 0; i < joueur.length; i++) {

        for (let j = 0; j < tirage.length; j++) {

            if (joueur[i] == tirage[j]) {

                cpt = cpt + 1
            }
        }

    }

    if (complementairetirage == complementairejoueur.value) {
        texte = "<rouge> avec le complémentaire !</rouge>"
    }

    document.getElementById("reponseVerif").innerHTML = "Vous avez " + "<rouge>" + cpt + "</rouge>" + " nombres en commun avec la grille" + texte
    document.getElementById("Rejouer").innerHTML = '<input type="button" value="Rejouer" onClick="history.go(0)"></input>'
}



//cette fonction crée des tableaux de tirage tant que le jackpot n'est pas obtenu, et compte le nombre de tirages générés
function combienDeTirages() {

    let joueur = [valJ0.value, valJ1.value, valJ2.value, valJ3.value, valJ4.value, valJ5.value]

    let cpttirage = []
    let comptirage = 0
    let compteur = 0
    let nbdetirages = 0
        //car il y à 1 chances sur 138 000 000 de ganger le tirage de l'euro million cette boucle prend quelques dizaines de secondes avant 
        //de renvoyer un résultat

    while (compteur < 7) {
        cpttirage = Tirage()
        comptirage = NbComplementaire()
        for (let i = 0; i < joueur.length; i++) {
            for (let j = 0; j < cpttirage.length; j++) {
                if (joueur[i] == cpttirage[j]) {
                    compteur = compteur + 1
                }
            }
        }
        if (comptirage == complementairejoueur.value) {
            compteur = compteur + 1
        }
        nbdetirages = nbdetirages + 1


        //si le nombre d'équivalances est plus petit que 7 on rénitialise le compteur, car sinon le compteur est alimenté par plusieurs tirages différents
        if (compteur < 7) {
            compteur = 0
        }
    }
    document.getElementById("reponsecomptage").innerHTML = "Avec cette combinaison il vous aurait fallu " + "<rouge>" + nbdetirages + "</rouge>"  + " tirages pour obtenir un jackpot"
}



//fonction qui, dès quelle est appelé par "VerifAleatoire" génère des nombres aléatoires entre 1 et 49 inclus
function NbAleatoire() {
    resultat = Math.floor(Math.random() * Math.floor(49) + 1)
    return resultat
}
//fonction qui, dès quelle est appelé  par "Affichage" génère des nombres aléatoires entre 1 et 10 inculs
function NbComplementaire() {
    resultatcomplementaire = Math.floor(Math.random() * Math.floor(10) + 1)
    return resultatcomplementaire
}
//fonction appelle "NbAleatoire" tant qu'il y à au minimum deux nombres identiques dans le tableau newtirage
function VerifAleatoire() {
    do {

        nbA = NbAleatoire()

        doublons = 0

        for (let p = 0; p < 6; p++) {

            if (newtirage[p] == nbA) {

                doublons = doublons + 1
            }
        }
    }
    while (doublons > 0)
    return nbA

}
//fonction met en tableau les valeures vérifiées
function Tirage() {
    newtirage = []
    for (let i = 0; i < 6; i++) {
        newtirage.push(VerifAleatoire())
    }
    return newtirage

}
//fonction qui affiche le résultat du tirage  
function Affichage(nombre) {
    let Compaffichage = NbComplementaire()
    let texteAEcrire = ""
    let tirageaffichage = Tirage()

    for (let i = 0; i < nombre; i++) {
        texteAEcrire = texteAEcrire + `<input readonly="true" class="boules"  type="number" value="${tirageaffichage[i]}" id="valT${i}" placeholder="valT${i}">`
    }
    document.getElementById("iciRepetition").innerHTML = texteAEcrire + "<div>" + `<label>numéro complémentaire : </label> <input readonly="true"  class="comp"  type="number" value="${Compaffichage}" id="complementairetirage">` + "</div>"
}


//en dessous se situent les fonction de correction en direct des valeures du joueur

/* Cette fonction sert si un utilisateur décide de changer la premier numéro*/
function ValJ1() {
    btnrejouer.style.visibility = "visible"
    if (valJ0.value === valJ1.value || valJ0.value === valJ2.value || valJ0.value === valJ3.value || valJ0.value === valJ4.value || valJ0.value === valJ5.value || valJ1.value == "") {
        valJ2.style.visibility = 'hidden'
        valJ3.style.visibility = 'hidden'
        valJ4.style.visibility = 'hidden'
        valJ5.style.visibility = 'hidden'
        TirageCache.style.visibility = 'hidden'
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden";
        btntiragecahe.style.visibility = "hidden";
        complementairejoueur.value = "";
        valJ2.value = ""
        valJ3.value = ""
        valJ4.value = ""
        valJ5.value = ""
    } else {
        valJ2.style.visibility = 'visible'
        erreur.style.visibility = "hidden";

    }
    /*Tests pour éviter la saisie d'un numéro non compris dans l'intervalle 1 => 49*/
    if (valJ0.value > 49 || valJ0.value < 1) {
        valJ0.value = ""
    }



}

/* pour afficher la case de saisie du 3 eme numéro cette fonction vérifie si la valeure saisie est unique , ou nulle, si c'est le cas,
 elle cache le bouton pour lancer un tirage et les cases de saisie puis réninitialise leur valeur afin d'éviter d'eviter de se retrouver avec une case cachée alors qu'un numéro lui à été assigné */
function ValJ2() {
    btnrejouer.style.visibility = "visible"
    if (valJ0.value === valJ1.value || valJ0.value === valJ2.value || valJ0.value === valJ3.value || valJ0.value === valJ4.value || valJ0.value === valJ5.value || valJ1.value == "") {
        valJ2.style.visibility = 'hidden';
        valJ2.style.visibility = 'hidden';
        valJ3.style.visibility = 'hidden';
        valJ4.style.visibility = 'hidden';
        valJ5.style.visibility = 'hidden';
        TirageCache.style.visibility = 'hidden';
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden";
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        complementairejoueur.value = "";
        valJ2.value = "";
        valJ3.value = "";
        valJ4.value = "";
        valJ5.value = "";
    } else {
        valJ2.style.visibility = 'visible'
        erreur.style.visibility = "hidden";
    }
    /*Tests pour éviter la saisie d'un numéro non compris dans l'intervalle 1 => 49*/
    if (valJ1.value > 49 || valJ1.value < 1) {
        valJ1.value = ""
    }



}

/*Et ainsi de suite jusqu' à l'affichage du numéro complémentaire*/
function ValJ3() {
    if (valJ2.value === valJ0.value || valJ2.value === valJ1.value || valJ2.value === valJ3.value || valJ2.value === valJ4.value || valJ2.value === valJ5.value || valJ2.value == "") {
        valJ3.style.visibility = 'hidden';
        valJ3.style.visibility = 'hidden';
        valJ4.style.visibility = 'hidden';
        valJ5.style.visibility = 'hidden';
        TirageCache.style.visibility = 'hidden';
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden";
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        complementairejoueur.value = "";
        valJ3.value = "";
        valJ4.value = "";
        valJ5.value = "";
    } else {
        valJ3.style.visibility = 'visible';
        erreur.style.visibility = "hidden";
    }

    if (valJ2.value > 49 || valJ2.value < 1) {
        valJ2.value = "";
    }



}

function ValJ4() {
    if (valJ3.value === valJ0.value || valJ3.value === valJ1.value || valJ3.value === valJ2.value || valJ3.value === valJ4.value || valJ3.value === valJ5.value || valJ3.value == "") {
        valJ4.style.visibility = 'hidden';
        valJ5.style.visibility = 'hidden';
        TirageCache.style.visibility = 'hidden';
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden";
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        complementairejoueur.value = "";
        valJ4.value = "";
        valJ5.value = "";
    } else {
        valJ4.style.visibility = 'visible';
        erreur.style.visibility = "hidden";
    }

    if (valJ3.value > 49 || valJ3.value < 1) {
        valJ3.value = "";
    }



}

function ValJ5() {
    if (valJ4.value === valJ0.value || valJ4.value === valJ1.value || valJ4.value === valJ2.value || valJ4.value === valJ3.value || valJ4.value === valJ5.value || valJ4.value == "") {
        valJ5.style.visibility = 'hidden';
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden";
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        valJ5.value = "";
        complementairejoueur.value = "";
    } else {
        valJ5.style.visibility = 'visible';
        erreur.style.visibility = "hidden";
    }

    if (valJ4.value > 49 || valJ4.value < 1) {
        valJ4.value = "";
    }


}

function saisieCompJoueur() {
    if (valJ5.value === valJ0.value || valJ5.value === valJ1.value || valJ5.value === valJ2.value || valJ5.value === valJ3.value || valJ5.value === valJ4.value || valJ5.value == "") {
        complementairejoueur.style.visibility = 'hidden';
        labelcomplementaire.style.visibility = "hidden"
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        complementairejoueur.value = "";
    } else {
        complementairejoueur.style.visibility = 'visible';
        labelcomplementaire.style.visibility = "visible"
        erreur.style.visibility = "hidden";

    }
    if (valJ5.value > 49 || valJ5.value < 1) {
        valJ5.value = "";
    }

}

/*Fonction qui, si la saisie du numéro complémentaire est bonne vas afficher le bouton pour lancer un tirage*/
function Buttontirage() {
    if (complementairejoueur.value > 10 || complementairejoueur.value < 1 || complementairejoueur.value == "") {
        TirageCache.style.visibility = 'hidden';
        btntiragecahe.style.visibility = "hidden";
        erreur.style.visibility = "visible";
        complementairejoueur.value = "";
    } else {
        TirageCache.style.visibility = 'visible';
        btntiragecahe.style.visibility = "visible";
        erreur.style.visibility = "hidden";
    }

}

/*event listeners qui appellent les différentes fonction de vérification de saisie*/
valJ0.addEventListener("input", ValJ1)
valJ1.addEventListener("input", ValJ2)
valJ2.addEventListener("input", ValJ3)
valJ3.addEventListener("input", ValJ4)
valJ4.addEventListener("input", ValJ5)
valJ5.addEventListener("input", saisieCompJoueur)
complementairejoueur.addEventListener("input", Buttontirage)
