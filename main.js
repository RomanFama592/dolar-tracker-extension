const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const selector = $("#selectDolars");
const viewer = $("#viewDolars");

const cotizaciones = [
  "dolar-blue",
  "dolar-contado-con-liquidacion",
  "dolar-mep",
  "bitcoin-usd",
  "banco-nacion",
  "dolar-bancos-y-casas-de-cambio",
];

cotizaciones.forEach((coti) => {
  let option = document.createElement("option");
  option.value = coti;
  option.text = coti.replaceAll("-", " ").toLocaleUpperCase();
  selector.appendChild(option);
});

chrome.storage.local.get(["lastView"], (result) => {
  if (!result.lastView) {
    return;
  }
  selector.value = result.lastView;
});

createiframe(selector.value);

selector.addEventListener("change", () => {
  removeiframe;
  createiframe(selector.value);
});

function createiframe(url) {
  chrome.storage.local.set({ lastView: url }, () => {
    viewer.innerHTML = `<iframe style="width:100%;height:260px;border-radius:10px;margin-bottom:15px;box-shadow:2px 4px 4px rgb(0 0 0 / 25%);display:flex;justify-content:center;border:1px solid #bcbcbc" src="https://dolarhoy.com/i/cotizaciones/${url}" frameborder="0"></iframe>`;
  });
}

function removeiframe() {
  viewer.removeChild();
}
