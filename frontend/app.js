const API_URL = `${window.location.origin}/inspections`;

const form = document.getElementById("inspectionForm");
const output = document.getElementById("output");
const loadBtn = document.getElementById("loadInspectionsBtn");

// ==============================
// POST – criar inspeção
// ==============================
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Limpa qualquer conteúdo anterior
  output.innerHTML = "";

  const data = {
    equipmentId: document.getElementById("equipmentId").value,
    inspector: document.getElementById("inspector").value,
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar inspeção");
    }

    // Mensagem simples conforme solicitado
    output.innerHTML = "<p class='success'>Inspeção registrada com sucesso.</p>";

    form.reset();

  } catch (error) {
    alert(error.message);
  }
});

// ==============================
// GET – carregar inspeções
// ==============================
loadBtn.addEventListener("click", loadInspections);

async function loadInspections() {
  // Limpa qualquer retorno anterior
  output.innerHTML = "Carregando inspeções...";

  try {
    const response = await fetch(API_URL);
    const inspections = await response.json();

    if (inspections.length === 0) {
      output.innerHTML = "<p>Nenhuma inspeção encontrada.</p>";
      return;
    }

    // Criação da tabela
    let tableHTML = `
      <table class="inspection-table">
        <thead>
          <tr>
            <th>Equipamento</th>
            <th>Inspetor</th>
            <th>Status</th>
            <th>Data</th>
            <th>Obs</th>
          </tr>
        </thead>
        <tbody>
    `;

    inspections.forEach((i) => {
      tableHTML += `
        <tr>
          <td>${i.equipmentId}</td>
          <td>${i.inspector}</td>
          <td class="status ${i.status}">${i.status}</td>
          <td>${new Date(i.createdAt).toLocaleString()}</td>
          <td>${i.notes || "-"}</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
    `;

    // Exibe SOMENTE o resultado do GET
    output.innerHTML = tableHTML;

  } catch (error) {
    output.innerHTML = "<p>Erro ao carregar inspeções.</p>";
  }
}
