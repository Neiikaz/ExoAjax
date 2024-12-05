// A l'aide de l'api de géocalisation https://adresse.data.gouv.fr/api-doc/adresse
// Retourner l'ensemble des villes en fonction du code postal
// Faire 3 requêtes AJAX (xhr, fetch, jquery)


let input = document.getElementById('cp');
let champSelect = document.getElementById('ville');
input.addEventListener('input',() =>{
let codePostalChamps = input.value;
    //Je créer une constante pour que me URL ne bouge pas
    const URL= "https://api-adresse.data.gouv.fr/search/?q=" + codePostalChamps + "&type=municipality";

console.log(codePostalChamps);
//Je créer un objet sous format XMLHttp afin de créer une requête
let xhr = new XMLHttpRequest();
// Je configure ma requête AJAX
xhr.open('GET',URL,true);

//J'utilise ma fonction callback afin de faire un rappel
xhr.onload = function(){
    //Si j'ai un code 200 qui s'affiche ça veut dire que tout marche, je vais utiliser .status
    if(xhr.status === 200){
    //Je veux voir le résultat dans ma console
    let afficheVille= JSON.parse(xhr.responseText)
    let features = afficheVille.features;
    for(i=0;i<=5;i++);
        console.log(features);
    }else{
        console.log('Erreur chef'+xhr.statusText);
    }
};
//Gérer les erreurs réseaux;
xhr.onerror = function(){
    console.log('Erreur réseau mon con');
};
//Toujours envoyé la requête
xhr.send();
});


