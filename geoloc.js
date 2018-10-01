// objet qui récupère la position
const maPosition = (position) => {
    let infopos = "Position déterminée :\n";
    infopos += "Latitude : " + position.coords.latitude + "\n";
    infopos += "Longitude: " + position.coords.longitude + "\n";
    infopos += "Altitude : " + position.coords.altitude + "\n";
    document.getElementById("infoposition").innerHTML = infopos;
    // Affiche la carte en fonction des coordonnées récupérées
    initialize(position.coords.latitude, position.coords.longitude, 15);
}

// Fonction de callback en cas de succès
const surveillePosition = (position) => {
    let infopos = "Position déterminée :\n";
    infopos += "Latitude : " + position.coords.latitude + "\n";
    infopos += "Longitude: " + position.coords.longitude + "\n";
    infopos += "Altitude : " + position.coords.altitude + "\n";
    infopos += "Vitesse  : " + position.coords.speed + "\n";
    document.getElementById("infoposition").innerHTML = infopos;
    // Affiche la carte en fonction des coordonnées récupérées
    initialize(position.coords.latitude, position.coords.longitude, 18);
}

// On déclare la variable survId afin de pouvoir par la suite annuler le suivi de la position
//let survId = navigator.geolocation.watchPosition(surveillePosition);

// Annule le suivi de la position si nécessaire.
//navigator.geolocation.clearWatch(survId);

// Affiche la carte en fonction des coordonnées transmises sinon Londres par défaut
let initialize = (latitude=51.507268, longitude= -0.165730, zoom=10) => {               
    let map = L.map('mapid').setView([latitude, longitude], zoom);
    let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });
    map.addLayer(osmLayer);
}

// Fonction de callback en cas d’erreur
function erreurPosition(error) {
    let info = "Erreur lors de la géolocalisation : ";
    switch (error.code) {
        case error.TIMEOUT:
            info += "Timeout !";
            break;
        case error.PERMISSION_DENIED:
            info += "Vous n’avez pas donné la permission";
            break;
        case error.POSITION_UNAVAILABLE:
            info += "La position n’a pu être déterminée";
            break;
        case error.UNKNOWN_ERROR:
            info += "Erreur inconnue";
            break;
    }
}

// Si le navigateur récupère des coordonnées de géolocalisation
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(maPosition);
else
    erreurPosition(error);