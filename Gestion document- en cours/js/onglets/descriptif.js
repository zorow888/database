
export function afficherDescriptif(data) {
  document.getElementById("nom").textContent = data.nom;
  document.getElementById("mes").textContent = data.mise_en_service;
  document.getElementById("portefeuille").textContent = data.portefeuille;
  document.getElementById("puissance").textContent = data.puissance_kwc;
}
