function appTarefas() {
    document.querySelector("#bt-novo").addEventListener("click", novaTarefa);
    const comprasBox = document.querySelector("#compras-box");

    const listaConteudo = localStorage.getItem("lista");
    if (listaConteudo != null) {
        comprasBox.innerHTML = listaConteudo;
        setListaClicks();
    } else {
    const comprasLista = document.createElement("ul");
    const comprasListaOff = document.createElement("ul");
    const comprasListaOffTitulo = document.createElement("h4");

    comprasLista.setAttribute("id", "lista");
    comprasListaOff.setAttribute("id", "lista-off");
    comprasListaOffTitulo.innerHTML = "Itens Adicionados";

    comprasBox.append(comprasLista);
    comprasBox.append(comprasListaOffTitulo);
    comprasBox.append(comprasListaOff);
           
    }

    const config = {attributes: true, childList: true, subtree: true}

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                gravarLista();
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(comprasBox, config);
}

function novaTarefa() {
    const comprasLista = document.querySelector("#lista");
    const formTitulo = document.querySelector("#titulo");
    const titulo = formTitulo.value;

    if (titulo == "") {
        alert("Falta o nome do artigo");
        formTitulo.focus();
        return;
    }

    const formQtd = document.querySelector("#qtd");
    const qtd = formQtd.value;

    const comprasItem = document.createElement("li");
    const comprasItemX = document.createElement("div");
    comprasItemX.innerHTML = "X";

    comprasItem.addEventListener("click", toggleRasurar);

    let texto = titulo
    if (qtd != "") {
        texto += " : " + qtd;
    }
    
    comprasItem.innerHTML = texto;
    comprasItemX.addEventListener("click", apagarItem);
    comprasItem.append(comprasItemX);
    comprasLista.append(comprasItem);

    limparForm("#form-compras");
    formTitulo.focus();
}

function apagarItem(event) {
    event.stopPropagation();
    this.parentNode.remove();
}

function limparForm(form) {
    const formulario = document.querySelector(form);
    formulario.reset();
}

function toggleRasurar() {
    const e = this;
    let listaTemp;
    if (e.parentNode.id == "lista-off") {
        listaTemp = document.querySelector("#lista");
    } else {
        listaTemp = document.querySelector("#lista-off");
    }
    listaTemp.append(e);
}

function gravarLista() {
    const listaConteudo = document.querySelector("#compras-box").innerHTML;
    localStorage.setItem("lista", listaConteudo);
    console.log(listaConteudo);
}

function setListaClicks() {
    document.querySelectorAll("#compras-box li").forEach((item) => {
        item.addEventListener("click", toggleRasurar);
        item.firstElementChild.addEventListener("click", apagarItem);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    appTarefas();
});