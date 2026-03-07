const tablaAsignaturas = document.getElementById("tablaAsignaturas");
const totalCreditos = document.getElementById("totalCreditos");
const btnContinuar = document.getElementById("btnContinuar");

let asignaturasDisponibles = [];
let asignaturasSeleccionadas = [];

fetch("../asignaturas.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        asignaturasDisponibles = data;
        renderizarAsignaturas();
    })
    .catch(() => {
        tablaAsignaturas.innerHTML = `
            <tr>
                <td colspan="7">No se pudieron cargar las asignaturas.</td>
            </tr>
        `;
    });

function renderizarAsignaturas() {
    tablaAsignaturas.innerHTML = "";

    asignaturasDisponibles.forEach(asignatura => {
        const fila = document.createElement("tr");
        const bloqueada = asignatura.estado !== "Disponible";
        fila.innerHTML = `
            <td>
                <input 
                    type="checkbox" 
                    value="${asignatura.id}" 
                    ${bloqueada ? "disabled" : ""}
                    onchange="seleccionarAsignatura(${asignatura.id}, this.checked)"
                >
            </td>
            <td>${asignatura.nombre}</td>
            <td>${asignatura.profesor}</td>
            <td>${asignatura.inicio}</td>
            <td>${asignatura.fin}</td>
            <td>${asignatura.estado}</td>
            <td>${asignatura.creditos}</td>
        `;

        tablaAsignaturas.appendChild(fila);
    });
}

function seleccionarAsignatura(id, checked) {
    const asignatura = asignaturasDisponibles.find(a => a.id === id);

    if (!asignatura) {
        return;
    }

    if (checked) {
        asignaturasSeleccionadas.push(asignatura);
    } else {
        asignaturasSeleccionadas = asignaturasSeleccionadas.filter(a => a.id !== id);
    }

    actualizarResumen();
}

function actualizarResumen() {
    let suma = 0;

    asignaturasSeleccionadas.forEach(asignatura => {
        suma += asignatura.creditos;
    });

    totalCreditos.textContent = suma;
}

btnContinuar.addEventListener("click", function () {
    if (asignaturasSeleccionadas.length === 0) {
        alert("Debe seleccionar al menos una asignatura.");
        return;
    }

    localStorage.setItem("asignaturasSeleccionadas", JSON.stringify(asignaturasSeleccionadas));
    window.location.href = "financieroView.html";
});