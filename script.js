let grafica;
const ctx = document.getElementById('graficaProgreso').getContext('2d');
const flujoCtx = document.getElementById('graficaFlujo').getContext('2d');

// Arrays para categorías
let categorias = [];
let montos = [];

let graficaPie;
let graficaBar;

const tips = [
  "Ahorra al menos el 20% de tus ingresos.",
  "Evita deudas innecesarias y paga tus tarjetas a tiempo.",
  "Crea un fondo de emergencia de al menos 3 meses de gastos.",
  "Invierte en educación financiera, es tu mejor activo.",
  "Divide tus metas grandes en objetivos pequeños."
];

function calcularPlan() {
  const ingresos = Number(document.getElementById("ingresos").value);
  const gastos = Number(document.getElementById("gastos").value);
  const objetivo = document.getElementById("objetivo").value;
  const meta = Number(document.getElementById("meta").value);
  const resultadoDiv = document.getElementById("resultado");

  const ahorroMensual = ingresos - gastos;
  let mensaje;

  if (ahorroMensual <= 0) {
    mensaje = "⚠️ No tienes capacidad de ahorro actualmente. Revisa tus gastos.";
  } else {
    const meses = Math.ceil(meta / ahorroMensual);
    mensaje = `Objetivo: <b>${objetivo}</b><br>
               Ahorro mensual estimado: <b>$${ahorroMensual}</b><br>
               Meta de $${meta} en <b>${meses}</b> meses.`;

    if (grafica) grafica.destroy();
    grafica = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Meta alcanzada', 'Restante'],
        datasets: [{
          data: [0, meta],
          backgroundColor: ['#1a73e8', '#e0e0e0']
        }]
      }
    });
  }

  resultadoDiv.innerHTML = mensaje;
  resultadoDiv.style.display = "block";

  // Tip aleatorio
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tipFinanciero").innerHTML = "💡 Tip financiero: " + randomTip;
}

// Flujo de efectivo (gráfica de ejemplo)
new Chart(flujoCtx, {
  type: 'line',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Flujo de efectivo',
      data: [500, 800, 600, 900, 1200],
      borderColor: '#1a73e8',
      fill: false
    }]
  }
});

// Categorías dinámicas
function agregarCategoria() {
  const nombre = document.getElementById("categoriaNombre").value;
  const monto = Number(document.getElementById("categoriaMonto").value);

  if (nombre && monto > 0) {
    categorias.push(nombre);
    montos.push(monto);

    const li = document.createElement("li");
    li.textContent = `${nombre}: $${monto}`;
    document.getElementById("listaCategorias").appendChild(li);

    document.getElementById("categoriaNombre").value = "";
    document.getElementById("categoriaMonto").value = "";

    actualizarGraficas();
  }
}

// Actualizar gráficas de categorías
function actualizarGraficas() {
  if (graficaPie) graficaPie.destroy();
  if (graficaBar) graficaBar.destroy();

  const colores = categorias.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);

  graficaPie = new Chart(document.getElementById('graficaCategoriasPie').getContext('2d'), {
    type: 'pie',
    data: {
      labels: categorias,
      datasets: [{
        data: montos,
        backgroundColor: colores
      }]
    }
  });

  graficaBar = new Chart(document.getElementById('graficaCategoriasBar').getContext('2d'), {
    type: 'bar',
    data: {
      labels: categorias,
      datasets: [{
        label: 'Gastos por Categoría ($)',
        data: montos,
        backgroundColor: colores
      }]
    }
  });
}
