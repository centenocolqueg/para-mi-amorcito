function crearVideo(titulo, linea2, linea3, linea4, linea5, linea6, linea7) {
  const sorpresa = document.getElementById("sorpresa");

  sorpresa.innerHTML = `
    <div class="video-ai">
      <div class="barra-video"></div>

      <div class="mini-planeta p1"></div>
      <div class="mini-planeta p2"></div>
      <div class="mini-planeta p3"></div>

      <div class="hud hud-1">SYSTEM ONLINE</div>
      <div class="hud hud-2">CENTENO AI</div>
      <div class="hud hud-3">CEO MODE</div>

      <div class="escena escena1">${titulo}</div>
      <div class="escena escena2">${linea2}</div>
      <div class="escena escena3">${linea3}</div>
      <div class="escena escena4">${linea4}</div>
      <div class="escena escena5">${linea5}</div>
      <div class="escena escena6">${linea6}</div>
      <div class="escena escena7">${linea7}</div>
    </div>
  `;
}

function mostrarSorpresa(tipo) {
  if (tipo === "ceo") {
    crearVideo(
      "🚀 MODO CEO ACTIVADO 🚀",
      "Guido Americo Centeno Colque<br>fundador en construcción.",
      "No persigo atención.<br>Construyo autoridad.",
      "Mi disciplina será mi ventaja.<br>Mi visión será mi camino.",
      "Trabajo. Código. Negocios.<br>Presencia. Control. Futuro.",
      "No nací para rogar.<br>Nací para crear y liderar.",
      "CEO DE MI PROPIA VIDA<br>AMERICO AI 👑"
    );
    return;
  }

  if (tipo === "sistema") {
    crearVideo(
      "🧠 SISTEMA IA ACTIVADO 🧠",
      "Núcleo neural conectado.<br>Procesando visión del fundador.",
      "APIs. Automatización.<br>Modelos. Datos. Seguridad.",
      "CENTENO AI será mi sistema,<br>mi marca y mi tecnología.",
      "Cada línea de código<br>me acerca a mi imperio.",
      "Mi mente diseña soluciones.<br>Mi futuro se construye en silencio.",
      "INTELIGENCIA ARTIFICIAL<br>BAJO MI VISIÓN ⚡"
    );
    return;
  }

  if (tipo === "universo") {
    crearVideo(
      "🌌 UNIVERSO TECH ACTIVADO 🌌",
      "Planetas, sistemas y tecnología<br>orbitan alrededor de mi visión.",
      "No miro pequeño.<br>Pienso como fundador.",
      "Mi marca no será común.<br>Será diferente, fuerte y futurista.",
      "CENTENO AI será mi camino<br>hacia libertad y crecimiento.",
      "El mundo cambia con tecnología.<br>Yo también voy a cambiar mi vida.",
      "GUIDO AMERICO<br>FUNDADOR EN ASCENSO 🚀"
    );
    return;
  }

  crearVideo(
    "⚡ IA DEL FUTURO ACTIVADA ⚡",
    "Guido Americo Centeno Colque<br>fundador de una nueva era tecnológica.",
    "No persigo atención.<br>Construyo sistemas inteligentes.",
    "CENTENO AI será mi marca,<br>mi visión y mi tecnología avanzada 🚀",
    "Hologramas. APIs. Automatización.<br>Inteligencia artificial. Código. Disciplina.",
    "Mi mente ya no vive en el pasado.<br>Mi mente diseña tecnología del futuro.",
    "CEO DE MI PROPIA VIDA<br>AMERICO AI ⚡👑"
  );
}

window.addEventListener("load", () => {
  setTimeout(() => {
    mostrarSorpresa("ia");
  }, 1200);
});
