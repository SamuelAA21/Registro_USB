const tablaAsignaturas = document.getElementById("tablaAsignaturas");
const totalCreditos = document.getElementById("totalCreditos");
const btnContinuar = document.getElementById("btnContinuar");

let asignaturasSeleccionadas = [];

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {
    alert("No hay un usuario activo en sesión");
    window.location.href = "loginView.html";
}

fetch("../asignaturas.JSON")
    .then(respuesta => respuesta.json())
    .then(asignaturas => {
        const asignaturasFiltradas = asignaturas.filter(asignatura => {
            return asignatura.semestre === usuarioActivo.semestre;
        });

        renderizarAsignaturas(asignaturasFiltradas);
    })
    .catch(() => {
        tablaAsignaturas.innerHTML = `
            <tr>
                <td colspan="8">Error al cargar las asignaturas</td>
            </tr>
        `;
    });

function renderizarAsignaturas(asignaturas) {
    tablaAsignaturas.innerHTML = "";

    if (asignaturas.length === 0) {
        tablaAsignaturas.innerHTML = `
            <tr>
                <td colspan="8">No hay asignaturas para el semestre del estudiante</td>
            </tr>
        `;
        return;
    }

    asignaturas.forEach(asignatura => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <input 
                    type="checkbox"
                    value="${asignatura.id}"
                    onchange="seleccionarAsignatura(${asignatura.id}, this.checked)"
                >
            </td>
            <td>${asignatura.nombre}</td>
            <td>${asignatura.profesor}</td>
            <td>${asignatura.dia}</td>
            <td>${asignatura.inicio}</td>
            <td>${asignatura.fin}</td>
            <td>${asignatura.estado}</td>
            <td>${asignatura.creditos}</td>
        `;

        tablaAsignaturas.appendChild(fila);
    });

    window.asignaturasMostradas = asignaturas;
}

function seleccionarAsignatura(id, checked) {
    const asignatura = window.asignaturasMostradas.find(a => a.id === id);

    if (!asignatura) {
        return;
    }

    if (checked) {
        asignaturasSeleccionadas.push(asignatura);
    } else {
        asignaturasSeleccionadas = asignaturasSeleccionadas.filter(a => a.id !== id);
    }

    actualizarTotal();
}

function actualizarTotal() {
    let total = 0;

    asignaturasSeleccionadas.forEach(asignatura => {
        total += asignatura.creditos;
    });

    totalCreditos.textContent = total;
}

btnContinuar.addEventListener("click", function () {
    if (asignaturasSeleccionadas.length === 0) {
        alert("Seleccione al menos una asignatura");
        return;
    }

    localStorage.setItem("asignaturasSeleccionadas", JSON.stringify(asignaturasSeleccionadas));
    window.location.href = "financieroView.html";
});