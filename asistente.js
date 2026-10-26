// ===== Asistente "Armá tu proyecto" =====
// Los productos, precios y datos técnicos vienen de asistente-datos.js (CATALOGO y KITS).

const TIENDA_PRODUCTO = "https://ingeniot.mitiendanube.com/productos/"; // + sku en minúscula + "/"
const FORM_ENDPOINT = "https://formspree.io/f/mdekvrbr";
const WHATSAPP = "5491128269570";

// ----- Preguntas -----
const PASOS = [
  {
    id: "medir", titulo: "¿Qué querés medir o detectar?", ayuda: "Podés elegir varias opciones, o ninguna.",
    opciones: [
      { id: "temphum", t: "Temperatura y humedad del ambiente", sku: ["SEN-002"] },
      { id: "templiq", t: "Temperatura de líquidos (sonda sumergible)", sku: ["SEN-006"] },
      { id: "tempprec", t: "Temperatura precisa en varios puntos", sku: ["SEN-015"] },
      { id: "mov", t: "Movimiento de personas", sku: ["SEN-003"] },
      { id: "dist", t: "Distancia (de 2 cm a 4 m)", sku: ["SEN-017"] },
      { id: "obst", t: "Obstáculos cercanos", sku: ["SEN-011"] },
      { id: "luz", t: "Luz ambiente (día o noche)", sku: ["SEN-010"] },
      { id: "agua", t: "Agua o lluvia", sku: ["SEN-013"] },
      { id: "sonido", t: "Sonido o aplausos", sku: ["SEN-016"] },
      { id: "incl", t: "Inclinación o vuelco", sku: ["SEN-012"] },
      { id: "corr", t: "Corriente que consume un equipo", sku: ["SEN-007"] },
      { id: "tens", t: "Tensión de la red de 220 V", sku: ["SEN-008"] },
      { id: "gas", t: "Gas hidrógeno (experimentación)", sku: ["SEN-018"] },
      { id: "rfid", t: "Tarjetas o llaveros (RFID)", sku: ["MOD-003"] },
      { id: "hora", t: "Fecha y hora", sku: ["MOD-004"] },
    ],
  },
  {
    id: "mostrar", titulo: "¿Dónde querés verlo?", ayuda: "Podés elegir varias opciones, o ninguna.",
    opciones: [
      { id: "oled", t: "Pantalla chica (OLED)", sku: ["DIS-001"] },
      { id: "lcd", t: "Pantalla de texto (16x2)", sku: ["DIS-002"] },
      { id: "num", t: "Números grandes, tipo reloj", sku: ["DIS-004"] },
      { id: "tft", t: "Pantalla a color", sku: ["DIS-006"] },
      { id: "tactil", t: "Pantalla táctil a color", sku: ["DIS-007"] },
      { id: "cel", t: "En el celular, por WiFi", sku: [], wifi: true },
      { id: "leds", t: "Luces indicadoras (LEDs)", sku: ["PAS-001", "PAS-002"] },
      { id: "rgb", t: "Luz de color (RGB)", sku: ["MOD-008"] },
    ],
  },
  {
    id: "hacer", titulo: "¿Querés que haga algo?", ayuda: "Podés elegir varias opciones, o ninguna.",
    opciones: [
      { id: "pitido", t: "Sonar un aviso (pitido)", sku: ["ACC-013"] },
      { id: "melodia", t: "Tocar melodías", sku: ["ACC-014"] },
      { id: "mp3", t: "Reproducir audio o voz (MP3)", sku: ["MOD-007"] },
      { id: "rele1", t: "Prender o apagar una luz o artefacto", sku: ["MOD-001"] },
      { id: "rele2", t: "Prender o apagar dos luces o artefactos", sku: ["MOD-002"] },
      { id: "servo", t: "Mover algo a un ángulo (servo)", sku: ["MOT-001"] },
      { id: "paso", t: "Girar con precisión (motor paso a paso)", sku: ["MOT-003", "MOT-002"] },
    ],
  },
  {
    id: "controlar", titulo: "¿Cómo lo vas a controlar?", ayuda: "Si funciona solo, seguí sin elegir nada.",
    opciones: [
      { id: "puls", t: "Pulsadores", sku: ["ACC-010"] },
      { id: "arcade", t: "Un botón grande con luz", sku: ["ACC-009"] },
      { id: "teclado", t: "Teclado para ingresar una clave", sku: ["MOD-006"] },
      { id: "perilla", t: "Una perilla", sku: ["PAS-008"] },
      { id: "joy", t: "Joystick", sku: ["MOD-005"] },
      { id: "ir", t: "Control remoto", sku: ["SEN-004", "ACC-012"] },
      { id: "touch", t: "Botón táctil", sku: ["SEN-014"] },
      { id: "celctl", t: "Desde el celular, por WiFi", sku: [], wifi: true },
    ],
  },
  {
    id: "placa", titulo: "¿Con qué placa?", ayuda: "Si no sabés, dejá que la elijamos por vos.", unico: true,
    opciones: [
      { id: "auto", t: "Elegila vos (recomendado)", d: "La elegimos según tu proyecto." },
      { id: "PLA-002", t: "ESP32 DevKit", d: "WiFi y Bluetooth. Micro-USB.", sku: ["PLA-002"] },
      { id: "PLA-001", t: "ESP32 con USB-C", d: "WiFi y Bluetooth. USB-C.", sku: ["PLA-001"] },
      { id: "PLA-004", t: "ESP32-C3 SuperMini", d: "Chiquita y económica. WiFi y Bluetooth 5. USB-C. Menos pines.", sku: ["PLA-004"] },
      { id: "PLA-003", t: "Arduino UNO", d: "La clásica para empezar. 5 V, sin WiFi.", sku: ["PLA-003"] },
    ],
  },
  {
    id: "energia", titulo: "¿Cómo lo vas a alimentar?", unico: true,
    opciones: [
      { id: "usb", t: "Por USB", d: "Computadora o cargador de celular." },
      { id: "pila", t: "Con una pila de 9 V", d: "Portátil, para pruebas y demostraciones." },
    ],
  },
];
const DEFAULT = { placa: ["auto"], energia: ["usb"] };
const ROL = { medir: "in", controlar: "in", mostrar: "out", hacer: "out" };
// Pines libres (d) y entradas analógicas usables (a) de cada placa. ESP32: solo ADC1 con WiFi activo.
const PINES = {
  "PLA-001": { d: 24, a: 6 }, "PLA-002": { d: 24, a: 6 },
  "PLA-003": { d: 18, a: 6 },
  "PLA-004": { d: 11, a: 5 },   // ESP32-C3 SuperMini: GPIO 0-10, 20, 21 (8 y 9 con cuidado); ADC en GPIO 0-4
};

// ----- Estado -----
let sel = {};
let paso = 0;
const yaTengo = new Set();

const $ = (id) => document.getElementById(id);
const pesos = (n) => "$" + Math.round(n).toLocaleString("es-AR");
const img = (sku) => `img/productos/${sku.toLowerCase()}.jpg`;
// En la tienda algunos SKU son variantes de un mismo producto (cables y buzzers)
const URL_TIENDA = { "ACC-004": "acc-003", "ACC-005": "acc-003", "ACC-014": "acc-013" };
const linkTienda = (sku) => `${TIENDA_PRODUCTO}${URL_TIENDA[sku] || sku.toLowerCase()}/`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const ICONO_CEL = `<svg viewBox="0 0 24 24" class="as-ico"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/><path d="M9 8.5a4.5 4.5 0 0 1 6 0M10.5 10.5a2 2 0 0 1 3 0"/></svg>`;
const ICONO_AUTO = `<svg viewBox="0 0 24 24" class="as-ico"><path d="M12 3l2.2 5.3L20 9l-4.4 3.8L17 18.5 12 15.6 7 18.5l1.4-5.7L4 9l5.8-.7z"/></svg>`;
const ICONO_USB = `<svg viewBox="0 0 24 24" class="as-ico"><path d="M12 2v15M9 5l3-3 3 3M7 9v3l5 3M17 8v3l-5 3"/><circle cx="12" cy="19" r="2.5"/></svg>`;
const ICONO_PILA = `<svg viewBox="0 0 24 24" class="as-ico"><rect x="5" y="6" width="14" height="15" rx="2"/><path d="M8 3h3v3H8zM13 3h3v3h-3zM9.5 12h5M12 9.5v5"/></svg>`;

// ===== Wizard =====
function renderProgreso() {
  $("progress").innerHTML = PASOS.map((p, i) =>
    `<li class="${i === paso ? "on" : i < paso ? "done" : ""}"><button type="button" data-ir="${i}">${i + 1}</button></li>`).join("");
}

function iconoOpcion(o) {
  if (o.wifi) return ICONO_CEL;
  if (o.id === "auto") return ICONO_AUTO;
  if (o.id === "usb") return ICONO_USB;
  if (o.id === "pila") return ICONO_PILA;
  return `<img src="${img(o.sku[0])}" alt="" loading="lazy">`;
}

function renderPaso() {
  const p = PASOS[paso];
  const elegidas = sel[p.id] || [];
  $("step").innerHTML = `
    <h2>${p.titulo}</h2>
    ${p.ayuda ? `<p>${p.ayuda}</p>` : ""}
    <div class="as-options ${p.unico ? "as-unico" : ""}">
      ${p.opciones.map((o) => `
        <button type="button" class="as-opt ${elegidas.includes(o.id) ? "on" : ""}" data-op="${o.id}" aria-pressed="${elegidas.includes(o.id)}">
          <span class="as-opt-img">${iconoOpcion(o)}</span>
          <span class="as-opt-txt"><strong>${o.t}</strong>${o.d ? `<small>${o.d}</small>` : ""}</span>
        </button>`).join("")}
    </div>`;
  $("prev").style.visibility = paso === 0 ? "hidden" : "visible";
  $("next").textContent = paso === PASOS.length - 1 ? "Ver mi proyecto" : "Siguiente";
  $("hint").textContent = "";
  renderProgreso();
}

$("step").addEventListener("click", (e) => {
  const b = e.target.closest(".as-opt");
  if (!b) return;
  const p = PASOS[paso];
  let lista = sel[p.id] || [];
  if (p.unico) lista = [b.dataset.op];
  else lista = lista.includes(b.dataset.op) ? lista.filter((x) => x !== b.dataset.op) : [...lista, b.dataset.op];
  // "una luz" y "dos luces" son excluyentes
  if (p.id === "hacer" && b.dataset.op.startsWith("rele")) {
    const otro = b.dataset.op === "rele1" ? "rele2" : "rele1";
    lista = lista.filter((x) => x !== otro);
  }
  sel[p.id] = lista;
  renderPaso();
});

$("progress").addEventListener("click", (e) => {
  const b = e.target.closest("[data-ir]");
  if (b) { paso = +b.dataset.ir; renderPaso(); }
});
$("prev").addEventListener("click", () => { if (paso > 0) { paso--; renderPaso(); } });
$("next").addEventListener("click", () => {
  if (paso < PASOS.length - 1) { paso++; renderPaso(); window.scrollTo({ top: $("wizard").offsetTop - 90, behavior: "smooth" }); return; }
  const algo = ["medir", "mostrar", "hacer", "controlar"].some((k) => (sel[k] || []).length);
  if (!algo) { $("hint").textContent = "Elegí al menos una opción en los primeros pasos."; return; }
  mostrarResultado();
});

// ===== Motor de reglas =====
function calcular() {
  const items = new Map(); // sku -> {sku, qty, rol, padre, motivo}
  const notas = [];
  const add = (sku, rol, motivo, extra = {}) => {
    if (items.has(sku)) { if (extra.sumar) items.get(sku).qty += 1; return; }
    items.set(sku, { sku, qty: 1, rol, motivo, ...extra });
  };
  const op = (paso, id) => (sel[paso] || []).includes(id);

  const wifi = PASOS.some((p) => p.opciones.some((o) => o.wifi && op(p.id, o.id)));
  const pila = op("energia", "pila");

  // Pines que necesitan los componentes elegidos (para elegir la placa)
  const elegidos = PASOS.filter((p) => ROL[p.id]).flatMap((p) => p.opciones.filter((o) => op(p.id, o.id)).flatMap((o) => o.sku));
  const pre = { s: 0, a: 0 };
  for (const s of new Set(elegidos)) { pre.s += CATALOGO[s].s || 0; pre.a += CATALOGO[s].a || 0; }
  if (elegidos.some((s) => CATALOGO[s].bus === "i2c")) pre.s += 2;
  if (elegidos.some((s) => CATALOGO[s].bus === "spi")) pre.s += 3;
  const entraEnC3 = pre.s <= PINES["PLA-004"].d - 2 && pre.a <= PINES["PLA-004"].a - 1;   // con margen

  // Placa
  let placa = (sel.placa || ["auto"])[0];
  if (placa === "auto") {
    if (pila && !wifi) placa = "PLA-003";
    else if (entraEnC3) {
      placa = "PLA-004";
      notas.push(["ok", "Elegimos la ESP32-C3 SuperMini: tu proyecto usa pocos pines y es la placa más chica y económica. Si pensás sumarle más cosas, la ESP32 DevKit tiene más pines."]);
    } else placa = "PLA-002";
  }
  if (placa === "PLA-003" && wifi) {
    notas.push(["info", "Elegiste Arduino UNO, pero verlo o controlarlo desde el celular necesita WiFi: te sugerimos un ESP32."]);
    placa = entraEnC3 ? "PLA-004" : "PLA-002";
  }
  const esp = placa !== "PLA-003";
  add(placa, "placa", "El cerebro del proyecto");

  // Componentes elegidos
  for (const p of PASOS) {
    if (!ROL[p.id]) continue;
    for (const o of p.opciones) {
      if (!op(p.id, o.id)) continue;
      o.sku.forEach((s) => add(s, ROL[p.id], o.t));
    }
  }
  // Relaciones para el diagrama
  if (items.has("MOT-002")) items.get("MOT-002").padre = "MOT-003";
  if (items.has("ACC-012")) items.get("ACC-012").padre = "SEN-004";

  // Componentes necesarios y notas técnicas
  const tiene = (s) => items.has(s);
  if (tiene("PAS-001") || tiene("PAS-002"))
    add("PAS-005", "con", "Una resistencia de 220 Ω en serie con cada LED");
  if (tiene("DIS-002") && esp)
    notas.push(["info", "El LCD 16x2 I2C se alimenta con 5 V (pin VIN o 5V de la placa); las señales I2C de 3,3 V funcionan bien."]);
  if (tiene("SEN-006") || tiene("SEN-015")) {
    add("PAS-007", "con", "Pull-up del bus 1-Wire");
    notas.push(["info", "El DS18B20 necesita una resistencia de pull-up de 4,7 kΩ entre datos y VCC: dos de 10 kΩ en paralelo (≈ 5 kΩ) funcionan perfecto."]);
  }
  if (esp && tiene("SEN-017")) {
    add("PAS-006", "con", "Divisor de tensión para la salida Echo");
    notas.push(["warn", "La salida Echo del sensor ultrasónico es de 5 V y el ESP32 trabaja a 3,3 V: usá un divisor con 3 resistencias de 1 kΩ (1 kΩ arriba, 2 kΩ abajo)."]);
  }
  if (esp && tiene("SEN-007")) {
    add("PAS-006", "con", "Divisor de tensión para la salida del ACS712");
    notas.push(["warn", "La salida del sensor de corriente puede llegar a 5 V: con ESP32 va con un divisor resistivo para no superar 3,3 V."]);
  }
  if (tiene("MOD-007")) {
    add("PAS-006", "con", "Resistencia de 1 kΩ en la línea RX del DFPlayer");
    notas.push(["info", "El reproductor MP3 necesita un parlante de 4 a 8 Ω (hasta 3 W) y una tarjeta microSD con los audios: no están incluidos."]);
  }
  if (tiene("MOD-001") || tiene("MOD-002") || tiene("SEN-008"))
    notas.push(["warn", "Si vas a conectar 220 V, la instalación tiene que hacerla una persona con conocimientos de electricidad y con la instalación sin tensión."]);
  if (esp && (tiene("MOD-001") || tiene("MOD-002")))
    notas.push(["info", "Con ESP32 te indicamos la conexión recomendada para que los relés activen bien con 3,3 V."]);
  if (tiene("MOT-001"))
    notas.push(["info", "El servo se alimenta con 5 V. Si usás más de uno o tiembla, conviene una fuente de 5 V aparte."]);
  if (tiene("MOT-003"))
    notas.push(["info", "El motor paso a paso se enchufa en el driver ULN2003, que se alimenta con 5 V. El precio del driver lo confirmamos al consultar."]);
  if (tiene("MOD-003") && !esp)
    notas.push(["info", "El lector RFID se alimenta con 3,3 V: usá el pin 3.3V del Arduino, no el de 5 V."]);
  if (!esp && (tiene("DIS-006") || tiene("DIS-007")))
    notas.push(["warn", "Esta pantalla trabaja con señales de 3,3 V: con Arduino UNO necesitás un adaptador de nivel. Con ESP32 se conecta directo."]);
  if (tiene("MOD-004"))
    notas.push(["info", "El módulo de reloj usa una pila CR2032 para no perder la hora cuando se desconecta."]);
  if (tiene("SEN-013"))
    notas.push(["info", "Para que el sensor de agua dure más, alimentalo desde un pin de la placa solo en el momento de medir."]);
  if (tiene("SEN-018"))
    notas.push(["warn", "El sensor de gas es para experimentación: no reemplaza a un detector de gas certificado."]);
  if (tiene("ACC-009"))
    notas.push(["info", "El botón arcade tiene terminales tipo faston: se conecta con terminales o soldando los cables."]);
  if (wifi)
    notas.push(["ok", "El ESP32 crea su propia red WiFi (o se conecta a la de tu casa) y muestra una página en el celular, sin instalar apps. Te ayudamos con el código."]);

  // Pines
  let senales = 0, analog = 0, i2c = false, spi = false;
  for (const it of items.values()) {
    const c = CATALOGO[it.sku];
    senales += (c.s || 0); analog += (c.a || 0);
    if (c.bus === "i2c") i2c = true;
    if (c.bus === "spi") spi = true;
  }
  senales += (i2c ? 2 : 0) + (spi ? 3 : 0);
  const lim = PINES[placa];
  if (senales > lim.d)
    notas.push(["warn", `Tu proyecto usa unos ${senales} pines y la placa tiene ${lim.d} libres. ` +
      (placa === "PLA-004" ? "Te conviene la ESP32 DevKit, que tiene más pines." : "Se resuelve con expansores (por ejemplo un 74HC595): consultanos y lo vemos juntos.")]);
  if (analog > lim.a)
    notas.push(["warn", `La placa tiene ${lim.a} entradas analógicas disponibles${esp ? " con WiFi activo" : ""} y tu proyecto usa ${analog}. Consultanos para reorganizarlas.`]);
  if (placa === "PLA-004")
    notas.push(["info", "La ESP32-C3 se programa por USB-C. En Arduino IDE elegí \"ESP32C3 Dev Module\" y activá \"USB CDC On Boot\" para ver el Monitor serie."]);

  // Protoboard y cables (estimación con margen)
  const lista = [...items.values()].map((it) => ({ ...it, c: CATALOGO[it.sku] }));
  const mods = lista.filter((x) => x.c.m === "mod");
  const pb = lista.filter((x) => x.c.m === "pb" || ["PAS-005", "PAS-006", "PAS-007"].includes(x.sku) || (x.sku === "PAS-008"));
  const usaPB = pb.length > 0 || mods.length >= 2;
  // Las señales van directo del módulo a la placa; la alimentación se reparte en la protoboard.
  // ESP32 tiene pines macho y Arduino UNO conectores hembra: eso define el tipo de cable.
  let mm = 0, mh = 0, hh = 0;
  const directo = (x, n) => {
    if (esp) x.c.fem ? (mh += n) : (hh += n);
    else x.c.fem ? (mm += n) : (mh += n);
  };
  if (usaPB) {
    add(pb.length <= 3 && mods.length <= 3 ? "ACC-011" : "ACC-001", "con", "Base para conectar sin soldar y repartir la alimentación");
    for (const x of mods) {
      directo(x, x.c.w - 2);                 // señales
      x.c.fem ? (mm += 2) : (mh += 2);       // VCC y GND a la protoboard
    }
    if (esp) mh += 3; else mm += 3;          // placa → protoboard: 5 V, 3,3 V y GND
    for (const x of pb) {
      const s = x.c.s || 0;               // las resistencias no llevan señal propia
      if (esp) mh += s; else mm += s;        // señal de la placa a la protoboard
      mm += 1;                               // puente a la línea de alimentación
    }
  } else if (mods.length === 1) {
    directo(mods[0], mods[0].c.w);
  }
  const sets = (n) => Math.ceil((n * 1.2) / 10);
  if (mm) add("ACC-003", "con", `Unos ${mm} cables macho-macho`, { qty: sets(mm) });
  if (mh) add("ACC-004", "con", `Unos ${mh} cables macho-hembra`, { qty: sets(mh) });
  if (hh) add("ACC-005", "con", `Unos ${hh} cables hembra-hembra`, { qty: sets(hh) });

  // Cable y alimentación
  if (placa === "PLA-002") add("ACC-007", "con", "Para programar y alimentar la placa");
  if (placa === "PLA-003") add("ACC-006", "con", "Para programar y alimentar la placa");
  if (placa === "PLA-001" || placa === "PLA-004") notas.push(["info", "La placa con USB-C se programa con un cable USB-C de datos (como el de muchos celulares)."]);
  if (pila) {
    if (!esp) add("ACC-008", "con", "Para alimentar el Arduino con una pila de 9 V");
    else notas.push(["info", "El ESP32 consume más que un Arduino: para hacerlo portátil conviene una batería recargable con regulador. Consultanos."]);
  }

  // Kit parecido
  const nucleo = (arr) => arr.filter((s) => /^(SEN|DIS|MOD|MOT)-|^ACC-01[234]$/.test(s));
  const mio = new Set(nucleo([...items.keys()]));
  let kit = null;
  for (const k of KITS) {
    const suyo = new Set(nucleo(k.piezas));
    if (mio.size >= 2 && [...mio].every((s) => suyo.has(s)) && (!kit || suyo.size < kit.n)) kit = { ...k, n: suyo.size };
  }

  return { placa, esp, wifi, items: [...items.values()], notas, senales, analog, kit };
}

// ===== Resultado =====
function tarjeta(it, chico = false) {
  const c = CATALOGO[it.sku];
  return `<a class="as-card ${chico ? "as-card-sm" : ""}" id="card-${it.sku}" data-padre="${it.padre || (it.rol === "in" || it.rol === "out" ? "placa" : "")}"
            href="${linkTienda(it.sku)}" target="_blank" rel="noopener">
    <img src="${img(it.sku)}" alt="" loading="lazy">
    <span class="as-card-txt"><strong>${esc(c.n)}${it.qty > 1 ? ` <em>x${it.qty}</em>` : ""}</strong>
    <small>${it.sku}${c.i && !chico ? ` · ${esc(c.i)}` : ""}</small></span></a>`;
}

let ultimo = null;

function mostrarResultado(scroll = true) {
  const r = calcular();
  ultimo = r;
  $("wizard").hidden = true;
  $("result").hidden = false;
  history.replaceState(null, "", "#p=" + encodeURIComponent(JSON.stringify(sel)));

  const nIn = r.items.filter((x) => x.rol === "in").length;
  const nOut = r.items.filter((x) => x.rol === "out").length;
  $("res-summary").textContent = `${CATALOGO[r.placa].n} con ${nIn} entrada${nIn === 1 ? "" : "s"} y ${nOut} salida${nOut === 1 ? "" : "s"}. ` +
    (r.senales === 1 ? "Usa 1 pin de la placa." : `Usa unos ${r.senales} pines de la placa.`);

  // Kit
  if (r.kit) {
    $("kit").hidden = false;
    $("kit").innerHTML = `<strong>Tenemos un kit para esto: ${esc(r.kit.t)}.</strong> ${esc(r.kit.o)}. Viene con la placa programada y probada, guía de armado impresa y todo lo necesario. <a href="#" id="kit-wa">Consultanos por el kit</a>`;
    $("kit-wa").onclick = (e) => { e.preventDefault(); abrirWA(`Hola INGENIoT! Me interesa el ${r.kit.t}. ¿Está disponible?`); };
  } else $("kit").hidden = true;

  // Diagrama
  const cel = r.wifi ? `<div class="as-card as-phone" id="card-cel" data-padre="placa">${ICONO_CEL}<span class="as-card-txt"><strong>Tu celular</strong><small>Página web por WiFi</small></span></div>` : "";
  $("col-center").innerHTML = cel + `<div class="as-board-wrap">${tarjeta(r.items.find((x) => x.rol === "placa")).replace('class="as-card', 'class="as-card as-board')}</div>`;
  const vacio = (t) => `<p class="as-empty">${t}</p>`;
  $("col-in").innerHTML = "<h3>Entradas</h3>" + (r.items.filter((x) => x.rol === "in").map((x) => tarjeta(x)).join("") || vacio("Sin sensores ni controles"));
  $("col-out").innerHTML = "<h3>Salidas</h3>" + (r.items.filter((x) => x.rol === "out").map((x) => tarjeta(x)).join("") || vacio("Sin displays ni actuadores"));
  $("wiring").innerHTML = r.items.filter((x) => x.rol === "con").map((x) => tarjeta(x, true)).join("");

  // Notas
  $("notes").innerHTML = r.notas.length ? "<h3>A tener en cuenta</h3>" + r.notas.map(([t, n]) => `<p class="as-note as-${t}">${esc(n)}</p>`).join("") : "";

  renderLista();
  requestAnimationFrame(dibujarLineas);
  if (scroll) window.scrollTo({ top: $("result").offsetTop - 90, behavior: "smooth" });
}

function renderLista() {
  const r = ultimo;
  const orden = { placa: 0, in: 1, out: 2, con: 3 };
  const filas = [...r.items].sort((a, b) => orden[a.rol] - orden[b.rol]);
  $("list").innerHTML = filas.map((it) => {
    const c = CATALOGO[it.sku];
    const off = yaTengo.has(it.sku);
    return `<label class="as-row ${off ? "off" : ""}">
      <input type="checkbox" data-sku="${it.sku}" ${off ? "" : "checked"}>
      <img src="${img(it.sku)}" alt="" loading="lazy">
      <span class="as-row-name"><strong>${esc(c.n)}</strong><small>${it.sku} · ${esc(it.motivo)}</small></span>
      <span class="as-row-qty">${it.qty} u.</span>
      <span class="as-row-price">${c.p ? pesos(c.p * it.qty) : "Consultar"}</span>
      <a href="${linkTienda(it.sku)}" target="_blank" rel="noopener" class="as-row-link">Ver</a>
    </label>`;
  }).join("");
  const activos = filas.filter((it) => !yaTengo.has(it.sku));
  const total = activos.reduce((s, it) => s + (CATALOGO[it.sku].p || 0) * it.qty, 0);
  const consultar = activos.some((it) => !CATALOGO[it.sku].p);
  $("total").textContent = pesos(total) + (consultar ? " + a consultar" : "");
}

$("list").addEventListener("change", (e) => {
  const s = e.target.dataset.sku;
  if (!s) return;
  e.target.checked ? yaTengo.delete(s) : yaTengo.add(s);
  renderLista();
});

// ----- Líneas del diagrama -----
function dibujarLineas() {
  const svg = $("lines");
  const caja = $("diagram").getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${caja.width} ${caja.height}`);
  const placa = document.querySelector(".as-board");
  if (!placa) return;
  const rect = (el) => { const b = el.getBoundingClientRect(); return { x: b.left - caja.left, y: b.top - caja.top, w: b.width, h: b.height }; };
  let d = "";
  document.querySelectorAll("#diagram [data-padre]").forEach((el) => {
    const padre = el.dataset.padre;
    if (!padre) return;
    const destino = padre === "placa" ? placa : document.getElementById("card-" + padre);
    if (!destino || destino === el) return;
    const a = rect(el), b = rect(destino);
    let x1, y1, x2, y2, horiz;
    if (a.x + a.w <= b.x) { x1 = a.x + a.w; y1 = a.y + a.h / 2; x2 = b.x; y2 = b.y + b.h / 2; horiz = true; }
    else if (a.x >= b.x + b.w) { x1 = a.x; y1 = a.y + a.h / 2; x2 = b.x + b.w; y2 = b.y + b.h / 2; horiz = true; }
    else if (a.y + a.h <= b.y) { x1 = a.x + a.w / 2; y1 = a.y + a.h; x2 = b.x + b.w / 2; y2 = b.y; }
    else { x1 = a.x + a.w / 2; y1 = a.y; x2 = b.x + b.w / 2; y2 = b.y + b.h; }
    const c = horiz ? `C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2},` : `C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2},`;
    const clase = el.id === "card-cel" || padre === "SEN-004" ? "as-wireless" : "";
    d += `<path class="${clase}" d="M ${x1} ${y1} ${c} ${x2} ${y2}"/><circle cx="${x1}" cy="${y1}" r="3"/><circle cx="${x2}" cy="${y2}" r="3"/>`;
  });
  svg.innerHTML = d;
}
window.addEventListener("resize", () => { if (!$("result").hidden) dibujarLineas(); });
document.addEventListener("load", (e) => { if (e.target.tagName === "IMG" && !$("result").hidden) dibujarLineas(); }, true);

// ----- Acciones -----
function resumenTexto() {
  const r = ultimo;
  const filas = r.items.filter((it) => !yaTengo.has(it.sku)).map((it) => {
    const c = CATALOGO[it.sku];
    return `- ${it.qty} x ${c.n} (${it.sku})${c.p ? " " + pesos(c.p * it.qty) : ""}`;
  });
  const elegidas = PASOS.flatMap((p) => p.opciones.filter((o) => (sel[p.id] || []).includes(o.id)).map((o) => o.t));
  return [`Proyecto: ${elegidas.join(", ")}`, "", ...filas, "", `Total estimado: ${$("total").textContent}`, `Link: ${location.href}`].join("\n");
}

function abrirWA(texto) {
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
}

$("wa").addEventListener("click", () =>
  abrirWA("Hola INGENIoT! Armé un proyecto en el asistente de la web:\n\n" + resumenTexto() + "\n\n¿Me confirman disponibilidad?"));

$("share").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(location.href); $("share").textContent = "Link copiado ✓"; }
  catch { $("share").textContent = "Copiá el link de la barra"; }
  setTimeout(() => ($("share").textContent = "Copiar link del proyecto"), 1800);
});

$("ask").addEventListener("click", () => {
  $("ask-form").hidden = false;
  $("ask-form").scrollIntoView({ behavior: "smooth", block: "center" });
});

$("ask-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;
  let ok = true;
  for (const c of f.querySelectorAll("[required]")) {
    const v = c.value.trim() !== "" && c.checkValidity();
    c.classList.toggle("invalid", !v);
    if (!v) ok = false;
  }
  const st = $("ask-status");
  if (!ok) { st.textContent = "Completá nombre, un email válido y tu idea."; st.className = "form-status error"; return; }
  $("ask-proyecto").value = resumenTexto();
  st.textContent = "Enviando…"; st.className = "form-status";
  try {
    const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
    if (!res.ok) throw new Error(res.status);
    f.reset();
    st.textContent = "¡Gracias! Recibimos tu proyecto y te respondemos a la brevedad."; st.className = "form-status ok";
  } catch {
    st.textContent = "No pudimos enviarlo. Probá de nuevo o escribinos por WhatsApp."; st.className = "form-status error";
  }
});

$("edit").addEventListener("click", () => {
  $("result").hidden = true; $("wizard").hidden = false; paso = 0; renderPaso();
  window.scrollTo({ top: $("wizard").offsetTop - 90, behavior: "smooth" });
});
$("restart").addEventListener("click", () => {
  sel = structuredClone(DEFAULT); yaTengo.clear(); paso = 0;
  history.replaceState(null, "", location.pathname);
  $("result").hidden = true; $("wizard").hidden = false; $("ask-form").hidden = true; renderPaso();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Inicio =====
document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));

sel = structuredClone(DEFAULT);
const m = location.hash.match(/^#p=(.+)$/);
if (m) {
  try { sel = { ...sel, ...JSON.parse(decodeURIComponent(m[1])) }; mostrarResultado(false); }
  catch { renderPaso(); }
} else renderPaso();
