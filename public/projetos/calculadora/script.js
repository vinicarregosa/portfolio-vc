let expressao = "";

const display = document.getElementById("display");
const NORMAL = "linear-gradient(gray, black)";
const DESTAQUE = "linear-gradient(gray, red)";
const ESPECIAIS = { Backspace: "<", Enter: "=", Escape: "C" };
const botoes = new Map();

function mostrar(texto) {
  display.textContent = texto;
}

function pressed(valor) {
  expressao += valor;
  mostrar(expressao);
}

function clearAll() {
  expressao = "";
  mostrar("");
}

function backspace() {
  expressao = expressao.slice(0, -1);
  mostrar(expressao);
}

function calculate() {
  if (!expressao) return;

  try {
    expressao = String(eval(expressao));
    mostrar(expressao);
  } catch {
    expressao = "";
    mostrar("Erro");
  }
}

function destacar(botao) {
  botao.style.backgroundImage = DESTAQUE;
}

function restaurar(botao) {
  botao.style.backgroundImage = NORMAL;
}

function botaoDaTecla(tecla) {
  return botoes.get(ESPECIAIS[tecla] || tecla);
}

document.querySelectorAll(".btn").forEach((botao) => {
  botoes.set(botao.textContent.trim(), botao);
  botao.addEventListener("mousedown", () => destacar(botao));
});

document.addEventListener("mouseup", () => botoes.forEach(restaurar));

document.addEventListener("keydown", (evento) => {
  const botao = botaoDaTecla(evento.key);
  if (!botao || evento.ctrlKey || evento.metaKey || evento.altKey) return;

  evento.preventDefault();
  destacar(botao);
  botao.click();
});

document.addEventListener("keyup", (evento) => {
  const botao = botaoDaTecla(evento.key);
  if (botao) restaurar(botao);
});
