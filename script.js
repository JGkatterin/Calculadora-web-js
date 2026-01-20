/*
  Proyecto: Calculadora Web
  Autora: TU NOMBRE AQUÍ
  GitHub: https://github.com/tuusuario
  Fecha: 2026
  Descripción: Calculadora con historial temporal, atajos de teclado y tema oscuro.
*/


const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");
const panel = document.getElementById("panelHistorial");

num1.addEventListener("keydown", e => {
  if (e.key === "Enter") num2.focus();
});

num2.addEventListener("keydown", e => {
  if (e.key === "Enter") calcular("suma");
});

function calcular(op) {
  let a = Number(num1.value);
  let b = Number(num2.value);
  let res;

  if (isNaN(a) || isNaN(b)) {
    resultado.textContent = "Resultado: valores inválidos";
    return;
  }

  if (op === "suma") res = a + b;
  if (op === "resta") res = a - b;
  if (op === "multiplica") res = a * b;
  if (op === "divide") {
    if (b === 0) {
      resultado.textContent = "Resultado: no se puede dividir entre 0";
      return;
    }
    res = a / b;
  }

  resultado.textContent = "Resultado: " + res;

  const li = document.createElement("li");
  li.textContent = `${a} ${simbolo(op)} ${b} = ${res}`;
  historial.prepend(li);
}

function simbolo(op) {
  return {
    suma: "+",
    resta: "-",
    multiplica: "×",
    divide: "÷"
  }[op];
}

function limpiar() {
  num1.value = "";
  num2.value = "";
  resultado.textContent = "Resultado:";
  num1.focus();
}

function toggleMenu() {
  panel.classList.toggle("activo");
}

function cambiarTema() {
  document.body.classList.toggle("oscuro");

  localStorage.setItem(
    "tema",
    document.body.classList.contains("oscuro") ? "oscuro" : "claro"
  );
}

if (localStorage.getItem("tema") === "oscuro") {
  document.body.classList.add("oscuro");
}

document.addEventListener("keydown", function (e) {

  if (e.key === "+") calcular("suma");
  if (e.key === "-") calcular("resta");
  if (e.key === "*") calcular("multiplica");
  if (e.key === "/") {
    e.preventDefault(); 
    calcular("divide");
  }

  if (e.key === "Escape") limpiar();
});



