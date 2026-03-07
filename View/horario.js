const tablaHorario = document.getElementById("tablaHorario");

const pagoRealizado = localStorage.getItem("pagoFinanciero");
const horario = JSON.parse(localStorage.getItem("horarioGenerado")) || [];

if (pagoRealizado !== "true" || horario.length === 0) {
    tablaHorario.innerHTML = `
        <tr>
            <td colspan="6">No hay horario generado todavía.</td>
        </tr>
    `;
} else {
    horario.forEach(asignatura => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${asignatura.nombre}</td>
            <td>${asignatura.profesor}</td>
            <td>${asignatura.dia}</td>
            <td>${asignatura.inicio}</td>
            <td>${asignatura.fin}</td>
            <td>${asignatura.creditos}</td>
        `;

        tablaHorario.appendChild(fila);
    });
}