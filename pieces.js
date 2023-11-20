import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js"
// Récupérer des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:8081/pieces')
const pieces = await reponse.json()
ajoutListenerEnvoyerAvis()


function genererPieces(pieces){
    for (let i =0; i < pieces.length; i++){
    
        //Création des différents éléments
    const article = pieces[i]
    const sectionFiches = document.querySelector(".fiches")
    
    const piecesElement = document.createElement("article")
    
    const imageElement = document.createElement("img") //Création de l'image
    imageElement.src = article.image
    
    const nomElement = document.createElement("h2") //Création du nom
    nomElement.innerText = article.nom
    
    const prixElement = document.createElement("p") //Création du prix
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`
    
    
    const categorieElement = document.createElement("p") //Création de catégorie
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)"
    
    const descriptionElement = document.createElement("p") //Création de description
    descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)"
    
    const disponibiliteElement = document.createElement("p") //Création pour la disponibilité du produit
    disponibiliteElement.innerText = article.disponibilite  ? "En stock" : "Rupture de stock"
    
    // Ajouter des boutons pour les avis

    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = article.id;
    avisBouton.textContent = "Afficher les avis";
    //Ajout des éléments à la page web
    
    sectionFiches.appendChild(piecesElement)
    piecesElement.appendChild(imageElement)
    piecesElement.appendChild(nomElement)
    piecesElement.appendChild(prixElement)
    piecesElement.appendChild(categorieElement)
    piecesElement.appendChild(descriptionElement)
    piecesElement.appendChild(disponibiliteElement)
    piecesElement.appendChild(avisBouton)
    }

    // Ajout de la fonction ajoutListenersAvis
    ajoutListenersAvis()
   
}

genererPieces(pieces)

    // Trier pour faire afficher, les produits par prix croissant

const boutonTrier = document.querySelector(".btn-trier")
    boutonTrier.addEventListener("click", function (){
        const piecesOrdonnees = Array.from(pieces)
        piecesOrdonnees.sort(function (a,b){
            return a.prix - b.prix
        })
        document.querySelector(".fiches").innerHTML = ""
        genererPieces(piecesOrdonnees)
    })

    // Filtrer pour faire afficher, les produits dont le prix est < 35€

const boutonFiltrer = document.querySelector(".btn-filtrer")
    boutonFiltrer.addEventListener("click", function (){
        const piecesFiltrees = pieces.filter(function (pieces){
            return pieces.prix <= 35;
        })
        document.querySelector(".fiches").innerHTML = ""
        genererPieces(piecesFiltrees)
    })
    
const boutonNonDescription = document.querySelector(".btn-description")
    boutonNonDescription.addEventListener("click", function(){
        const piecesNonDescription = pieces.filter(function (pieces){
            return !pieces.description;
        })
        document.querySelector(".fiches").innerHTML = ""
        genererPieces(piecesNonDescription)
    })

const boutonOrdreDecroissant = document.querySelector(".btn-decroissant")
    boutonOrdreDecroissant.addEventListener("click", function(){
        const piecesDecroissant = pieces.sort(function(a,b){
            return b.prix - a.prix 
        })
        document.querySelector(".fiches").innerHTML = ""
        genererPieces(piecesDecroissant)
    })
  
    // Faire afficher les pièces abordables

const noms = pieces.map(piece => piece.nom)
    for(let i = pieces.length -1; i>=0; i--){
        if(pieces[i].prix > 35){
            noms.splice(i,1)
        }
    }
console.log(noms)

const elementsAbordables = document.createElement("ul")
    for(let i= 0; i< noms.length; i++){
        const elementNom = document.createElement("li")
        elementNom.innerText = noms[i]
        elementsAbordables.appendChild(elementNom)
    }
    document.querySelector(".abordables")
            .appendChild(elementsAbordables)


    // Faire afficher les pièces disponibles

const nomDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)
    for(let i = pieces.length -1; i>=0; i--){
        if(pieces[i].disponibilite === false){
            nomDisponibles.splice(i,1)
            prixDisponibles.splice(i,1)
        }
    }

const ElementDisponibles = document.createElement("ul")
    for(let i= 0; i< nomDisponibles.length; i++){
        const elementNom = document.createElement("li")
        elementNom.innerHTML = `${nomDisponibles[i]} : ${prixDisponibles[i]} €`
        ElementDisponibles.appendChild(elementNom)
    }
    document.querySelector(".disponibles")
            .appendChild(ElementDisponibles)


const inputPrixMax = document.querySelector("#prixMaximal")
inputPrixMax.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value 
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})