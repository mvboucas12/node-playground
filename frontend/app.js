const API_URL = "http://localhost:3000/inspections";

const form = document.getElementById("inspectionForm");
const result = document.getElementById("result");

// POST – criar inspeção
form.addEventListener("submit", async (event) => {
  event.preventDefault();

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

    const json = await response.json();
    result.textContent = JSON.stringify(json, null, 2);

    // ✅ AGORA O RESET FUNCIONA
    form.reset();

  } catch (error) {
    alert(error.message);
  }
});
