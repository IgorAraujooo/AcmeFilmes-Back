'use strict';

const tabelaFilmes = document.getElementById('tabela')
const lixeira = document.getElementById('lixo')
const editar = document.getElementById('editar')
const fundo_preto = document.getElementById('fundo_preto')



async function listarFilmes() {
    console.log('asasassa');
    const filmes = await pegarFilmes()
    console.log(filmes);
    console.log(filmes.filmes[0]);

    filmes.filmes.forEach(filme => {
        
        const tagfilme = document.createElement('div')
        tagfilme.classList.add('filme', 'w-auto', 'min-h-20', 'bg-white', 'mx-2', 'flex', 'flex-row')

        const divCheckbox = document.createElement('div')
        divCheckbox.classList.add('custom-w-25', 'flex', 'items-center', 'ml-1')
        
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.classList.add('h-2/3', 'w-full')

        const linhasEspacotag = [5]
        linhasEspacotag[0] = document.createElement('div')

        linhasEspacotag[1] = document.createElement('div')

        linhasEspacotag[2] = document.createElement('div')

        linhasEspacotag[3] = document.createElement('div')

        linhasEspacotag[4] = document.createElement('div')

        linhasEspacotag.forEach(linha => {
            linha.classList.add('h-full', 'bg-zinc-900', 'w-1', 'ml-2', 'mr-2')
        })

        linhasEspacotag[4].classList.remove('mr-2')

        const id = document.createElement('div')
        id.classList.add('id', 'w-12', 'flex', 'items-center', 'text-black', 'text-3xl', 'justify-center')
        id.textContent = filme.id

        const nome = document.createElement('div')
        nome.classList.add('h-full', 'custom-w-nome', 'text-3xl', 'items-center', 'flex', 'justify-center')
        nome.textContent = filme.titulo

        const data_lancamento = document.createElement('div')
        data_lancamento.classList.add('flex', 'text-black', 'text-3xl', 'justify-center', 'items-center', 'w-64', 'justify-center')
        data_lancamento.textContent = validarData(filme.data_lancamento)

        const valor_unitario = document.createElement('div')
        valor_unitario.classList.add('flex', 'text-black', 'text-3xl', 'justify-center', 'items-center', 'w-60', 'justify-center')
        const valorFormatado = parseFloat(filme.valor_unitario).toFixed(2);
        valor_unitario.textContent = `R$${valorFormatado}`

        const espaco_sobrando = document.createElement('div')
        espaco_sobrando.classList.add('flex', 'h-full', 'flex-grow', 'bg-zinc-300', 'justify-end')

        const ultima_linha = document.createElement('div')
        ultima_linha.classList.add('h-full', 'bg-zinc-900', 'w-1', 'ml-2', 'mr-0')

        tabelaFilmes.appendChild(tagfilme)
        tagfilme.replaceChildren(divCheckbox, linhasEspacotag[0], id, linhasEspacotag[1], nome, linhasEspacotag[2], data_lancamento, linhasEspacotag[3], valor_unitario, linhasEspacotag[4], espaco_sobrando)
        divCheckbox.appendChild(checkbox)

        console.log(tagfilme);

    });
}

function validarData(data){
    const dataReduzida = data.substr(0,10)
    const dataDividida = dataReduzida.split('-')
    const dataCerta = dataDividida[0]+'/'+dataDividida[1]+'/'+dataDividida[2]
    return dataCerta
}

editar.addEventListener('click', function(){

    const divsFilmes = document.querySelectorAll('.filme');
    let checkboxSelecionada = null;
    let checkboxesSelecionadas = 0;

    divsFilmes.forEach(function(div){
        const checkbox = div.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            checkboxesSelecionadas++;
            checkboxSelecionada = checkbox;
        }
    });

    if (checkboxesSelecionadas === 0) {
        alert("Selecione um filme para editar.");
    } else if (checkboxesSelecionadas === 1) {
        const id = checkboxSelecionada.closest('.filme').querySelector('.id').textContent;
        window.location.href='../editar_filme/editar.html?id='+id
    } else {
        alert("Selecione apenas um filme para editar.");
    }

})
lixeira.addEventListener('click', async function(){

    const divsFilmes = document.querySelectorAll('.filme')

    divsFilmes.forEach(function(div){
        console.log('div' + div);
        const checkbox = div.querySelector('input[type="checkbox"]')
        if(checkbox.checked){
            const id = div.querySelector('.id').textContent
            deletarFilme(id)
        }
    })
    // const checkboxes = document.querySelectorAll('.tabela input[type="checkbox"]');
    // console.log(checkboxes);
    // const filmesSelecionados = [];

    // checkboxes.forEach(checkbox => {
    //     if (checkbox.checked) {
    //         // Se a checkbox estiver marcada, adiciona o ID do filme aos filmesSelecionados
    //         filmesSelecionados.push("aaa");
    //     }
    // });

    // console.log('Filmes selecionados:', filmesSelecionados);

})

async function pegarFilmes() {
    const endpoint = 'http://localhost:8080/v2/acmefilmes/filmes';
    const filmesApi = await fetch(endpoint);
    const listFilmes = await filmesApi.json();
    return listFilmes;
}

async function deletarFilme(id){


        const endpoint = `http://localhost:8080/v1/acmefilmes/deleteFilme/${id}`
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Filme com ID ${id} deletado com sucesso.`);
        } else {
            console.error(`Erro ao deletar filme com ID ${id}.`);
        }
    } catch (error) {
        console.error('Ocorreu um erro durante a solicitação:', error);
    }

    window.location.reload()
}

listarFilmes();
