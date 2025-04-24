let currentData = {};
let typeProjet = "";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function chargerCentrale(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      currentData = data;
      typeProjet = data.type_projet || "default";
      chargerOnglet("descriptif");
    });
}

import { renderProductible } from './onglets/productible.js';

export function chargerOnglet(nom) {
  fetch(`html/${nom}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("contenu").innerHTML = html;

      // Si c'est "productible", on exécute une fonction spécifique
      if (nom === "productible") {
        renderProductible();
      }

      // Sinon, on tente d'importer dynamiquement et appeler afficherXXX
      else {
        import(`./onglets/${nom}.js`)
          .then(module => {
            const nomFn = `afficher${capitalize(nom)}`;
            if (typeof module[nomFn] === 'function') {
              module[nomFn](currentData);
            }
          })
          .catch(() => {
            console.warn(`Pas de module JS trouvé pour ${nom}`);
          });
      }
    });
}


export function changerSection(section) {
  const sousMenu = document.getElementById("sousMenuProjet");
  if (section === "projets") {
    sousMenu.style.display = "block";
    chargerOnglet("descriptif");
  } else {
    sousMenu.style.display = "none";
    document.getElementById("contenu").innerHTML = `<h2>${section}</h2><p>Contenu à venir...</p>`;
  }
}




// 👇 expose immédiatement les fonctions AVANT DOMContentLoaded
window.changerSection = changerSection;
window.changerOnglet = chargerOnglet;
window.changerCentrale = chargerCentrale;



// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  chargerCentrale("data/centrale_demo.json");
});
