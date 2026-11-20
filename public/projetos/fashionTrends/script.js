/**
 * @typedef {Object} Produto
 * @property {string} id         Identificador único
 * @property {string} nome
 * @property {string} categoria  Roupas, Calçados, Acessórios ou Bolsas
 * @property {string} marca
 * @property {string} cor
 * @property {number} estoque    Inteiro >= 0 (0 = esgotado)
 * @property {number} preco      Em reais, >= 0
 * @property {string} descricao
 * @property {string} imagem     Foto em texto (passo 15) ou "" se não houver
 */

const CHAVE_STORAGE = "fashiontrends:produtos";

const PRODUTOS_INICIAIS = [
    {
        id: "p1",
        nome: "Vestido Midi Floral",
        categoria: "Roupas",
        marca: "Maison Lume",
        cor: "Rosa",
        estoque: 12,
        preco: 189.9,
        descricao: "Vestido midi com estampa floral.",
        imagem: ""
    },
    {
        id: "p2",
        nome: "Tênis Urbano Branco",
        categoria: "Calçados",
        marca: "Urbana",
        cor: "Branco",
        estoque: 8,
        preco: 249.9,
        descricao: "Tênis casual para o dia a dia.",
        imagem: ""
    },
    {
        id: "p3",
        nome: "Bolsa Tiracolo Couro",
        categoria: "Bolsas",
        marca: "Maison Lume",
        cor: "Caramelo",
        estoque: 0,
        preco: 329,
        descricao: "Bolsa tiracolo em couro legítimo.",
        imagem: ""
    },
    {
        id: "p4",
        nome: "Colar Aço Dourado",
        categoria: "Acessórios",
        marca: "Urbana",
        cor: "Dourado",
        estoque: 25,
        preco: 59.9,
        descricao: "Colar em aço inoxidável com banho dourado.",
        imagem: ""
    }
];

/**
 * Lê a lista de produtos salva no navegador.
 * @returns {Produto[]}
 */
function carregarProdutos() {
    const texto = localStorage.getItem(CHAVE_STORAGE);

    if (texto === null) {
        return [];
    }

    try {
        const dados = JSON.parse(texto);

        if (Array.isArray(dados)) {
            return dados;
        }

        return [];
    } catch (erro) {
        console.error("Não foi possível ler os produtos salvos:", erro);
        return [];
    }
}

/**
 * Grava a lista de produtos no navegador, substituindo a anterior.
 * @param {Produto[]} produtos
 * @returns {boolean} true se gravou; false se o navegador recusou (ex.: espaço cheio)
 */
function salvarProdutos(produtos) {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar os produtos:", erro);
        return false;
    }
}

/**
 * Gera um id único para um novo produto.
 * @returns {string}
 */
function gerarId() {
    return crypto.randomUUID();
}

/**
 * Na primeira visita (nada salvo ainda), grava os produtos iniciais.
 */
function iniciarDados() {
    if (localStorage.getItem(CHAVE_STORAGE) === null) {
        salvarProdutos(PRODUTOS_INICIAIS);
    }
}

iniciarDados();

const corpoTabela = document.getElementById('corpo-tabela');
const rodapeTabela = document.getElementById('rodape-tabela');

function formatarPreco(valor){
    return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarCelulaProduto(produto) {
    const td = document.createElement("td");

    const divProduto = document.createElement("div");
    divProduto.className = "produto";

    let foto;
    if (temFoto(produto)) {
        foto = document.createElement("img");
        foto.src = produto.imagem;
        foto.alt = "";
    } else {
        foto = document.createElement("span");
    }
    foto.className = "produto__foto";

    const nome = document.createElement("span");
    nome.className = "produto__nome";
    nome.textContent = produto.nome;

    divProduto.appendChild(foto);
    divProduto.appendChild(nome);
    td.appendChild(divProduto);

    return td;
}

function criarCelulaEstoque(produto) {
    const td = document.createElement("td");
    const status = document.createElement("span");

    if (estaEsgotado(produto)) {
        status.className = "status status--esgotado";
        status.textContent = "Esgotado";
    } else {
        status.className = "status status--disponivel";
        status.textContent = produto.estoque;
    }

    td.appendChild(status);
    return td;
}

function criarCelulaPreco(produto) {
    const td = criarCelula(formatarPreco(produto.preco));
    td.className = "celula--fixa";
    return td;
}

function criarCelulaAcoes(produto) {
    const td = document.createElement("td");
    td.className = "celula--fixa";

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "acao";
    botaoEditar.dataset.acao = "editar";
    botaoEditar.setAttribute("aria-label", "Editar " + produto.nome);
    botaoEditar.textContent = "Editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "acao acao--perigo";
    botaoExcluir.dataset.acao = "excluir";
    botaoExcluir.setAttribute("aria-label", "Excluir " + produto.nome);
    botaoExcluir.textContent = "Excluir";

    td.appendChild(botaoEditar);
    td.appendChild(botaoExcluir);
    return td;
}

function criarLinha(produto) {
    const tr = document.createElement("tr");
    tr.dataset.id = produto.id;

    if (estaEsgotado(produto)) {
        tr.classList.add("linha--esgotada");
    }

    tr.appendChild(criarCelulaProduto(produto));
    tr.appendChild(criarCelula(produto.categoria));
    tr.appendChild(criarCelula(produto.marca));
    tr.appendChild(criarCelula(produto.cor));
    tr.appendChild(criarCelulaEstoque(produto));
    tr.appendChild(criarCelulaPreco(produto));
    tr.appendChild(criarCelulaAcoes(produto));

    return tr;
}

function criarLinhaVazia(mensagem) {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.colSpan = 7;
    td.className = "tabela__vazio";
    td.textContent = mensagem;

    tr.appendChild(td);
    return tr;
}

function renderizarTabela() {
    const produtos = carregarProdutos();
    atualizarOpcoesMarca(produtos);

    const filtrados = filtrarProdutos(produtos);

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PRODUTOS_POR_PAGINA));
    if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }
    const inicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
    const daPagina = filtrados.slice(inicio, inicio + PRODUTOS_POR_PAGINA);

    corpoTabela.replaceChildren();

    if (produtos.length === 0) {
        corpoTabela.appendChild(criarLinhaVazia("Nenhum produto cadastrado."));
    } else if (filtrados.length === 0) {
        corpoTabela.appendChild(criarLinhaVazia("Nenhum produto encontrado com esses filtros."));
    }

    for (const produto of daPagina) {
        corpoTabela.appendChild(criarLinha(produto));
    }

    atualizarRodape(produtos.length, filtrados.length, inicio, daPagina.length);
    atualizarPaginacao(totalPaginas);
    atualizarResumo(produtos);
}

const CATEGORIAS =["Roupas", "Calçados", "Acessórios", "Bolsas"];

const telaLista = document.getElementById("tela-lista");
const telaFormulario = document.getElementById("tela-formulario");
const tituloFormulario = document.getElementById("titulo-formulario");
const formulario = document.getElementById("formulario-produto");
const botaoNovo = document.getElementById("botao-novo");
const botaoCancelar = document.getElementById("botao-cancelar");
const linkProdutos = document.getElementById("link-produtos");

function preencherOpcoes(select, opcoes, textoPadrao) {
    select.replaceChildren();

    const padrao = document.createElement("option");
    padrao.value = "";
    padrao.textContent = textoPadrao;
    select.appendChild(padrao);

    for (const opcao of opcoes) {
        const item = document.createElement("option");
        item.value = opcao;
        item.textContent = opcao;
        select.appendChild(item);
    }
}

function mostrarTela(nome) {
    telaLista.hidden = nome !== "lista";
    telaFormulario.hidden = nome !== "formulario";
}

function abrirFormularioNovo() {
    idEmEdicao = null;
    formulario.reset();
    limparErros();
    iniciarFoto("");
    atualizarDicaEstoque();
    tituloFormulario.textContent = "Novo produto";
    botaoSalvar.textContent = "Cadastrar produto";
    mostrarTela("formulario");
    document.getElementById("campo-nome").focus();
}

function voltarParaLista() {
    idEmEdicao = null;
    mostrarTela("lista");
}

botaoNovo.addEventListener("click", abrirFormularioNovo);
botaoCancelar.addEventListener("click", voltarParaLista);

linkProdutos.addEventListener("click", function (evento) {
    evento.preventDefault();
    voltarParaLista();
    fecharMenu();
});

const CAMPOS = ["nome", "categoria", "marca", "cor", "estoque", "preco", "descricao"];

function lerFormulario() {
    return Object.fromEntries(new FormData(formulario));
}

function textoVazio(texto) {
    return texto.trim() === "";
}

function validarProduto(dados) {
    const erros = {};

    if (textoVazio(dados.nome)) {
        erros.nome = "Informe o nome do produto.";
    }

    if (!CATEGORIAS.includes(dados.categoria)) {
        erros.categoria = "Escolha uma categoria.";
    }

    if (textoVazio(dados.marca)) {
        erros.marca = "Informe a marca.";
    }

    if (textoVazio(dados.estoque)) {
        erros.estoque = "Informe o estoque.";
    } else {
        const estoque = Number(dados.estoque);
        if (!Number.isInteger(estoque) || estoque < 0) {
            erros.estoque = "O estoque deve ser um número inteiro maior ou igual a 0.";
        }
    }

    if (textoVazio(dados.preco)) {
        erros.preco = "Informe o preço.";
    } else {
        const preco = Number(dados.preco);
        if (!Number.isFinite(preco) || preco < 0) {
            erros.preco = "O preço deve ser um número maior ou igual a 0.";
        }
    }

    return erros;
}

function limparErros() {
    for (const campo of CAMPOS) {
        const entrada = document.getElementById("campo-" + campo);
        document.getElementById("erro-" + campo).textContent = "";
        entrada.classList.remove("campo--invalido");
        entrada.removeAttribute("aria-invalid");
    }
}

function mostrarErros(erros) {
    for (const campo of Object.keys(erros)) {
        const entrada = document.getElementById("campo-" + campo);
        document.getElementById("erro-" + campo).textContent = erros[campo];
        entrada.classList.add("campo--invalido");
        entrada.setAttribute("aria-invalid", "true");
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErros();

    const dados = lerFormulario();
    const erros = validarProduto(dados);
    const camposComErro = Object.keys(erros);

    if (camposComErro.length > 0) {
        mostrarErros(erros);
        document.getElementById("campo-" + camposComErro[0]).focus();
        return;
    }

    const ehCadastro = idEmEdicao === null;
    let salvou;
    let mensagem;

    if (ehCadastro) {
        salvou = cadastrarProduto(dados);
        mensagem = "Produto cadastrado com sucesso.";
    } else {
        salvou = atualizarProduto(idEmEdicao, dados);
        mensagem = "Produto atualizado com sucesso.";
    }

    if (!salvou) {
        mostrarAviso("Não foi possível salvar: o armazenamento do navegador está cheio. Tente uma foto menor.", true);
        return;
    }

    if (ehCadastro) {
        limparFiltros();
    }

    renderizarTabela();
    voltarParaLista();
    mostrarAviso(mensagem);
});

// ===== Passo 8: cadastrar =====

const aviso = document.getElementById("aviso");
let temporizadorAviso = null;

function mostrarAviso(texto, ehErro) {
    aviso.textContent = texto;

    if (ehErro === true) {
        aviso.classList.add("aviso--erro");
    } else {
        aviso.classList.remove("aviso--erro");
    }

    aviso.hidden = false;

    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function () {
        aviso.hidden = true;
    }, 4000);
}

function gerarIdUnico(produtos) {
    let id = gerarId();

    while (produtos.some((produto) => produto.id === id)) {
        id = gerarId();
    }

    return id;
}

function converterDados(dados, id, imagem) {
    return {
        id: id,
        nome: dados.nome.trim(),
        categoria: dados.categoria,
        marca: dados.marca.trim(),
        cor: dados.cor.trim(),
        estoque: Number(dados.estoque),
        preco: Math.round(Number(dados.preco) * 100) / 100,
        descricao: dados.descricao.trim(),
        imagem: imagem
    };
}

function cadastrarProduto(dados) {
    const produtos = carregarProdutos();
    const novo = converterDados(dados, gerarIdUnico(produtos), imagemAtual);

    produtos.unshift(novo);
    return salvarProdutos(produtos);
}

// ===== Passo 9: excluir =====

function buscarProdutoPorId(id) {
    const produtos = carregarProdutos();
    return produtos.find((produto) => produto.id === id);
}

function excluirProduto(id) {
    const produto = buscarProdutoPorId(id);

    if (produto === undefined) {
        renderizarTabela();
        return;
    }

    const confirmou = confirm('Excluir "' + produto.nome + '"? Esta ação não pode ser desfeita.');
    if (!confirmou) {
        return;
    }

    const restantes = carregarProdutos().filter((p) => p.id !== id);
    salvarProdutos(restantes);

    renderizarTabela();
    mostrarAviso("Produto excluído.");
}

corpoTabela.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (botao === null) {
        return;
    }

    const id = botao.closest("tr").dataset.id;

    if (botao.dataset.acao === "excluir") {
        excluirProduto(id);
    } else if (botao.dataset.acao === "editar") {
        abrirFormularioEdicao(id);
    }
});

// ===== Passo 10: editar =====

const botaoSalvar = document.getElementById("botao-salvar");

let idEmEdicao = null;

function preencherFormulario(produto) {
    for (const campo of CAMPOS) {
        document.getElementById("campo-" + campo).value = produto[campo];
    }
}

function abrirFormularioEdicao(id) {
    const produto = buscarProdutoPorId(id);

    if (produto === undefined) {
        renderizarTabela();
        mostrarAviso("Esse produto não existe mais.", true);
        return;
    }

    limparErros();
    preencherFormulario(produto);
    iniciarFoto(produto.imagem);
    atualizarDicaEstoque();
    idEmEdicao = id;
    tituloFormulario.textContent = "Editar produto";
    botaoSalvar.textContent = "Salvar alterações";
    mostrarTela("formulario");
    document.getElementById("campo-nome").focus();
}

function atualizarProduto(id, dados) {
    const produtos = carregarProdutos();

    const atualizados = produtos.map(function (produto) {
        if (produto.id === id) {
            return converterDados(dados, id, imagemAtual);
        }
        return produto;
    });

    return salvarProdutos(atualizados);
}

// ===== Passo 11: busca por nome =====

const campoBusca = document.getElementById("busca");

function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim();
}

function filtrarProdutos(produtos) {
    return produtos.filter(produtoPassaNosFiltros);
}

// ===== Passo 12: filtros =====

const filtroCategoria = document.getElementById("filtro-categoria");
const filtroMarca = document.getElementById("filtro-marca");
const botaoLimparFiltros = document.getElementById("botao-limpar-filtros");

const filtros = {
    busca: "",
    categoria: "",
    marca: ""
};

function produtoPassaNosFiltros(produto) {
    if (filtros.busca !== "" && !normalizar(produto.nome).includes(filtros.busca)) {
        return false;
    }

    if (filtros.categoria !== "" && produto.categoria !== filtros.categoria) {
        return false;
    }

    if (filtros.marca !== "" && produto.marca !== filtros.marca) {
        return false;
    }

    return true;
}

function listarMarcas(produtos) {
    const marcas = [];

    for (const produto of produtos) {
        if (produto.marca !== "" && !marcas.includes(produto.marca)) {
            marcas.push(produto.marca);
        }
    }

    marcas.sort((a, b) => a.localeCompare(b, "pt-BR"));
    return marcas;
}

function atualizarOpcoesMarca(produtos) {
    const marcas = listarMarcas(produtos);

    if (!marcas.includes(filtros.marca)) {
        filtros.marca = "";
    }

    preencherOpcoes(filtroMarca, marcas, "Todas as marcas");
    filtroMarca.value = filtros.marca;
}

function lerFiltros() {
    filtros.busca = normalizar(campoBusca.value);
    filtros.categoria = filtroCategoria.value;
    filtros.marca = filtroMarca.value;
}

function aplicarFiltros() {
    lerFiltros();
    paginaAtual = 1;
    renderizarTabela();
}

function limparFiltros() {
    campoBusca.value = "";
    filtroCategoria.value = "";
    filtroMarca.value = "";
    lerFiltros();
    paginaAtual = 1;
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroCategoria.addEventListener("input", aplicarFiltros);
filtroMarca.addEventListener("input", aplicarFiltros);

botaoLimparFiltros.addEventListener("click", function () {
    limparFiltros();
    renderizarTabela();
});

// ===== Passo 13: paginação =====

const PRODUTOS_POR_PAGINA = 5;

const paginacao = document.getElementById("paginacao");
const infoPagina = document.getElementById("info-pagina");
const botaoAnterior = document.getElementById("botao-anterior");
const botaoProxima = document.getElementById("botao-proxima");

let paginaAtual = 1;

function atualizarRodape(total, filtrados, inicio, naPagina) {
    if (filtrados === 0) {
        rodapeTabela.textContent = "Mostrando 0 de " + total + " produtos";
        return;
    }

    let texto = "Mostrando " + (inicio + 1) + " a " + (inicio + naPagina) +
        " de " + filtrados + " produtos";

    if (filtrados < total) {
        texto = texto + " (" + total + " no total)";
    }

    rodapeTabela.textContent = texto;
}

function atualizarPaginacao(totalPaginas) {
    paginacao.hidden = totalPaginas <= 1;
    infoPagina.textContent = "Página " + paginaAtual + " de " + totalPaginas;
    botaoAnterior.disabled = paginaAtual === 1;
    botaoProxima.disabled = paginaAtual === totalPaginas;
}

botaoAnterior.addEventListener("click", function () {
    paginaAtual = paginaAtual - 1;
    renderizarTabela();
});

botaoProxima.addEventListener("click", function () {
    paginaAtual = paginaAtual + 1;
    renderizarTabela();
});

// ===== Passo 14: esgotado e resumo =====

const resumoTotal = document.getElementById("resumo-total");
const resumoUnidades = document.getElementById("resumo-unidades");
const resumoEsgotados = document.getElementById("resumo-esgotados");
const resumoValor = document.getElementById("resumo-valor");
const campoEstoque = document.getElementById("campo-estoque");
const dicaEstoque = document.getElementById("dica-estoque");

function estaEsgotado(produto) {
    return produto.estoque === 0;
}

function calcularResumo(produtos) {
    const inicial = { totalProdutos: 0, unidades: 0, esgotados: 0, valorEmEstoque: 0 };

    return produtos.reduce(function (resumo, produto) {
        resumo.totalProdutos = resumo.totalProdutos + 1;
        resumo.unidades = resumo.unidades + produto.estoque;
        resumo.valorEmEstoque = resumo.valorEmEstoque + produto.preco * produto.estoque;

        if (estaEsgotado(produto)) {
            resumo.esgotados = resumo.esgotados + 1;
        }

        return resumo;
    }, inicial);
}

function atualizarResumo(produtos) {
    const resumo = calcularResumo(produtos);

    resumoTotal.textContent = resumo.totalProdutos;
    resumoUnidades.textContent = resumo.unidades.toLocaleString("pt-BR");
    resumoEsgotados.textContent = resumo.esgotados;
    resumoValor.textContent = formatarPreco(resumo.valorEmEstoque);
}

function atualizarDicaEstoque() {
    const texto = campoEstoque.value;

    if (texto.trim() !== "" && Number(texto) === 0) {
        dicaEstoque.textContent = "Com estoque 0, o produto será exibido como Esgotado.";
    } else {
        dicaEstoque.textContent = "";
    }
}

campoEstoque.addEventListener("input", atualizarDicaEstoque);

// ===== Passo 15: foto do produto =====

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp"];
const TAMANHO_MAXIMO_ARQUIVO = 5 * 1024 * 1024;
const LADO_MAXIMO_FOTO = 400;

const campoFoto = document.getElementById("campo-foto");
const previa = document.getElementById("previa");
const previaImagem = document.getElementById("previa-imagem");
const botaoRemoverFoto = document.getElementById("botao-remover-foto");
const erroFoto = document.getElementById("erro-foto");

let imagemAtual = "";

function temFoto(produto) {
    return typeof produto.imagem === "string" && produto.imagem.startsWith("data:image/");
}

function mostrarErroFoto(texto) {
    erroFoto.textContent = texto;
}

function iniciarFoto(imagem) {
    imagemAtual = imagem;
    campoFoto.value = "";
    mostrarErroFoto("");
    atualizarPrevia();
}

function atualizarPrevia() {
    if (imagemAtual === "") {
        previa.hidden = true;
        previaImagem.removeAttribute("src");
    } else {
        previaImagem.src = imagemAtual;
        previa.hidden = false;
    }
}

function reduzirImagem(textoDaImagem, aoTerminar) {
    const imagem = new Image();

    imagem.onload = function () {
        const maiorLado = Math.max(imagem.width, imagem.height);
        const escala = Math.min(1, LADO_MAXIMO_FOTO / maiorLado);

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(imagem.width * escala);
        canvas.height = Math.round(imagem.height * escala);

        const contexto = canvas.getContext("2d");
        contexto.fillStyle = "#FFFFFF";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);

        aoTerminar(canvas.toDataURL("image/jpeg", 0.8));
    };

    imagem.onerror = function () {
        aoTerminar(null);
    };

    imagem.src = textoDaImagem;
}

campoFoto.addEventListener("change", function () {
    mostrarErroFoto("");

    const arquivo = campoFoto.files[0];
    if (arquivo === undefined) {
        return;
    }

    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
        mostrarErroFoto("Use uma imagem JPG, PNG ou WebP.");
        campoFoto.value = "";
        return;
    }

    if (arquivo.size > TAMANHO_MAXIMO_ARQUIVO) {
        mostrarErroFoto("A imagem deve ter no máximo 5 MB.");
        campoFoto.value = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        reduzirImagem(leitor.result, function (resultado) {
            if (resultado === null) {
                mostrarErroFoto("Não foi possível ler essa imagem.");
                return;
            }
            imagemAtual = resultado;
            atualizarPrevia();
        });
    };

    leitor.onerror = function () {
        mostrarErroFoto("Não foi possível ler o arquivo.");
    };

    leitor.readAsDataURL(arquivo);
});

botaoRemoverFoto.addEventListener("click", function () {
    imagemAtual = "";
    campoFoto.value = "";
    atualizarPrevia();
});

// ===== Passo 16: menu para celular =====

const menuLateral = document.getElementById("menu-lateral");
const botaoMenu = document.getElementById("botao-menu");
const sobreposicao = document.getElementById("sobreposicao");

function abrirMenu() {
    menuLateral.classList.add("sidebar--aberta");
    sobreposicao.classList.add("sobreposicao--visivel");
    botaoMenu.setAttribute("aria-expanded", "true");
}

function fecharMenu() {
    menuLateral.classList.remove("sidebar--aberta");
    sobreposicao.classList.remove("sobreposicao--visivel");
    botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", function () {
    if (menuLateral.classList.contains("sidebar--aberta")) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

sobreposicao.addEventListener("click", fecharMenu);

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        fecharMenu();
    }
});

// ===== Início do programa (mantenha sempre no final do arquivo) =====

preencherOpcoes(document.getElementById("campo-categoria"), CATEGORIAS, "Selecione...");
preencherOpcoes(filtroCategoria, CATEGORIAS, "Todas as categorias");
renderizarTabela();

