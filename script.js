// ===== Configuración =====
// Cuando la tienda esté lista, poner la URL acá y el botón pasa a "Ir a la tienda".
const STORE_URL = "";            // ej: "https://ingeniot.mitiendanube.com"
// Servicio de formularios (Formspree, Web3Forms, etc.). Vacío = la consulta se envía por WhatsApp.
const FORM_ENDPOINT = "https://formspree.io/f/mdekvrbr";
const WHATSAPP = "5491128269570";

// ===== Año del pie =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Menú móvil =====
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", false);
}));

// ===== Tienda =====
if (STORE_URL) {
  document.querySelector("#tienda h2").textContent = "Comprá online en nuestra tienda";
  document.querySelector("#tienda p").textContent =
    "Placas, sensores, módulos y accesorios con envío a todo el país.";
  for (const a of [document.getElementById("store-link"), ...document.querySelectorAll('a[href="#tienda"]')]) {
    a.href = STORE_URL;
    a.target = "_blank";
    a.rel = "noopener";
  }
  document.getElementById("store-link-text").textContent = "Ir a la tienda";
}

// ===== Formulario de contacto =====
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

function setStatus(msg, type) {
  status.textContent = msg;
  status.className = "form-status " + (type || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let valid = true;
  for (const field of form.querySelectorAll("[required]")) {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  }
  if (!valid) {
    setStatus("Completá nombre, un email válido y tu consulta.", "error");
    return;
  }

  const data = new FormData(form);
  const intereses = data.getAll("interes");

  if (!FORM_ENDPOINT) {
    const texto = [
      "Hola INGENIoT! Les escribo desde la web.",
      `Nombre: ${data.get("nombre")}`,
      `Email: ${data.get("email")}`,
      data.get("telefono") ? `Teléfono: ${data.get("telefono")}` : "",
      intereses.length ? `Me interesa: ${intereses.join(", ")}` : "",
      `Consulta: ${data.get("mensaje")}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
    setStatus("Te abrimos WhatsApp con tu consulta lista para enviar.", "ok");
    return;
  }

  setStatus("Enviando…");
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    setStatus("¡Gracias! Recibimos tu consulta y te respondemos a la brevedad.", "ok");
  } catch {
    setStatus("No pudimos enviar la consulta. Probá de nuevo o escribinos por WhatsApp.", "error");
  }
});

form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
