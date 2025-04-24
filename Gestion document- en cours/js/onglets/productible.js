export function renderProductible() {

const productibles = [
    {
      id: "init",
      titre: "Productible Initial",
      periode: { debut: "2022-01-01", fin: "2024-12-31" },
      actif: true,
      table: [
        ["Mois", "GHI", "P50", "P90"],
        ["Janvier", 49, 47, 44],
        ["Février", 69, 66, 62],
        ["Mars", 115, 110, 103]
      ]
    },
    {
      id: "refi2023",
      titre: "Refinancement 2023",
      periode: { debut: "2023-06-01", fin: "2025-12-31" },
      actif: false,
      table: [
        ["Mois", "GHI", "P50", "P90"],
        ["Janvier", 48, 45, 42],
        ["Février", 67, 63, 60],
        ["Mars", 112, 107, 100]
      ]
    },
    {
      id: "actualise2024",
      titre: "Actualisé 2024",
      periode: { debut: "2024-01-01", fin: "2026-12-31" },
      actif: false,
      table: [
        ["Mois", "GHI", "P50", "P90"],
        ["Janvier", 46, 43, 40],
        ["Février", 65, 61, 58],
        ["Mars", 110, 105, 98]
      ]
    }
  ];
  
  function renderProductibles() {
    const container = document.getElementById("productibles-container");
    container.innerHTML = "";
  
    productibles.forEach((prod) => {
      const box = document.createElement("div");
      box.className = "productible-box";
      box.innerHTML = `
        <div class="productible-header">
          <h3>${prod.titre}</h3>
          <p><strong>Période :</strong> ${prod.periode.debut} → ${prod.periode.fin}</p>
          <label>
            <input type="radio" name="activeProductible" ${prod.actif ? "checked" : ""} onchange="setActiveProductible('${prod.id}')">
            Actif
          </label>
        </div>
        <div class="productible-table">
          ${renderTable(prod.table)}
        </div>
      `;
      container.appendChild(box);
    });
  }
  
  function renderTable(data) {
    let html = "<table><thead><tr>";
    data[0].forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += "</tr></thead><tbody>";
    for (let i = 1; i < data.length; i++) {
      html += "<tr>";
      data[i].forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += "</tr>";
    }
    html += "</tbody></table>";
    return html;
  }
  
  function setActiveProductible(id) {
    productibles.forEach(p => p.actif = (p.id === id));
    renderProductibles();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderProductibles();
  });
  

}