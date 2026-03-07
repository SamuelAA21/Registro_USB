const tablaFinanciera = document.getElementById("tablaFinanciera");
const creditosFinales = document.getElementById("creditosFinales");
const totalPagar = document.getElementById("totalPagar");
const btnPagar = document.getElementById("btnPagar");

const VALOR_CREDITO = 180000;

const asignaturas = JSON.parse(localStorage.getItem("asignaturasSeleccionadas")) || [];

let totalCreditos = 0;

if (asignaturas.length === 0) {
    tablaFinanciera.innerHTML = `
        <tr>
            <td colspan="3">No hay asignaturas seleccionadas.</td>
        </tr>
    `;
} else {
    asignaturas.forEach(asignatura => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${asignatura.nombre}</td>
            <td>${asignatura.profesor}</td>
            <td>${asignatura.creditos}</td>
        `;

        tablaFinanciera.appendChild(fila);
        totalCreditos += asignatura.creditos;
    });
}

creditosFinales.textContent = totalCreditos;
totalPagar.textContent = formatearMoneda(totalCreditos * VALOR_CREDITO);

btnPagar.addEventListener("click", function () {
    if (asignaturas.length === 0) {
        alert("No hay asignaturas para pagar.");
        return;
    }

    localStorage.setItem("pagoFinanciero", "true");
    localStorage.setItem("horarioGenerado", JSON.stringify(asignaturas));

    alert("Pago realizado correctamente.");
    window.location.href = "horarioView.html";
});

function formatearMoneda(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
}