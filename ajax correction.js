// A l'aide de l'api de géocalisation https://adresse.data.gouv.fr/api-doc/adresse
// Retourner l'ensemble des villes en fonction du code postal
// Faire 3 requêtes AJAX (xhr, fetch, jquery)

// Fonction pour remplir le dropdown avec les résultats
function updateVilleDropdown(villes) {
	// Sélectionne l'élément <select>
	const $ville = $('#ville');
	$ville.empty();
	// Si aucune ville n'est trouvée
	if (villes.length === 0) {
		// Ajoute une option par défaut indiquant qu'aucune ville n'a été trouvée
		$ville.append('<option>Aucune ville trouvée</option>');
	} else {
		villes.forEach(ville => {
			// Ajoute une nouvelle option au dropdown pour chaque ville
         // `ville.nom` correspond au nom de la ville
			$ville.append(`<option value="${ville.nom}">${ville.nom}</option>`);
		});
	}
}

// Avec XMLHttpRequest
function fetchVillesXHR(cp) {
	const xhr = new XMLHttpRequest();
	// Ouvre une requête GET vers l'API avec le code postal (cp) en paramètre
	xhr.open('GET', `https://api-adresse.data.gouv.fr/search/?q=${cp}&type=municipality`, true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			const data = JSON.parse(xhr.responseText);
			// Extrait les noms des villes depuis les données récupérées
			const villes = data.features.map(feature => ({
				nom: feature.properties.city // Récupère le nom de la ville dans chaque objet featur
			}));
			// Met à jour la liste déroulante avec les villes extraites
			updateVilleDropdown(villes);
		}
	};
	xhr.send();
}

// Avec Fetch API
function fetchVillesFetch(cp) {
	// Appelle l'API avec l'URL contenant le code postal (cp) en paramètre
	fetch(`https://api-adresse.data.gouv.fr/search/?q=${cp}&type=municipality`)
		.then(response => {
			if (!response.ok) {
				// Si le statut n'est pas OK, lance une erreur avec un message personnalisé
				throw new Error('Erreur lors de la récupération des données');
			}
			return response.json();
		})
		.then(data => {
			// Récupère les noms des villes à partir des données de l'API
			const villes = data.features.map(feature => ({
				nom: feature.properties.city // Récupère le nom de la ville
			}));
			// Met à jour la liste déroulante avec les noms des villes récupérés
			updateVilleDropdown(villes);
		})
		.catch(error => {
			// Affiche un message d'erreur dans la console si une erreur survient
			console.error('Erreur:', error);
	});
}

// Avec jQuery
function fetchVillesJQuery(cp) {
	// Utilisation de la méthode `$.ajax` de jQuery pour effectuer une requête HTTP
	$.ajax({
		// URL de l'API avec le code postal (cp) inclus en paramètre
		url: `https://api-adresse.data.gouv.fr/search/?q=${cp}&type=municipality`,
		method: 'GET',
		// Format attendu pour la réponse de l'API
		dataType: 'json',
		success: function (data) {
			// `data` contient la réponse JSON de l'API
         // J'utilise la méthode `map` pour extraire un tableau contenant les noms des villes
			const villes = data.features.map(feature => ({
				nom: feature.properties.city
			}));
			updateVilleDropdown(villes);
		},
		// Fonction appelée si une erreur survient lors de la requête
		error: function (xhr, status, error) {
			console.error('Erreur:', error);
		}
	});
}

// Événement sur le champ Code Postal
$('#cp').on('input', function () {
	// Récupère la valeur actuelle du champ de saisie
	const cp = $(this).val();
	if (cp.length === 5) {
		fetchVillesXHR(cp);
		// fetchVillesFetch(cp);
		// fetchVillesJQuery(cp);
	} else {
		$('#ville').html('<option>Saisissez un code postal valide</option>');
	}
});