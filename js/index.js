// console.log('Tabela do Paulistão')

let tabelaJogos = document.querySelector('.tabelaJogos')
// console.log(tabelaJogos)

// ler o arquivo json
fetch('jogos-fase1.json')
.then( response => response.json() )
.then( data => data.forEach( jogo => {
    // console.log(data)

    // criar uma linha de tabela, colocar ela na tabela
    let linha = document.createElement('tr')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha da tabela
    linha.innerHTML = `
        <td>${jogo.data}</td>
        <td>${jogo.hora}</td>
        <td class='centralizar'>
            <img class='imagemP' src='./img/Times/${jogo.mandante}' alt='' />
            <span class='gols'>${jogo.gols_mandante}</span>

            <span class='partida'>${jogo.partida}</span>

            <span class='gols'>${jogo.gols_visitante}</span>
            <img class='imagemP' src='./img/Times/${jogo.visitante}' alt='' />
        </td>

        <td class='esquerda'>${jogo.estadio}</td>
    `
})
)

let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
// console.log(tabelaClassificacao)
let linhas = document.querySelectorAll('.corpoClassificacao tr')
// console.log(linhas)

exibirTabelaClassificacao('A')

function exibirTabelaClassificacao(letraGrupo) {
    // atualizar letra do grupo no index.html
    document.querySelector('.letra').innerHTML = letraGrupo

    // ler json das classificações
    fetch(`classificacaoGrupo${letraGrupo}.json`)
    .then( resposta => resposta.json() )
    .then( dados => {
        // ORDENAR OS DADOS DO ARRAY COM OBJETOS
        dados.sort(function compararNumeros(a, b) {
            return a.posicao - b.posicao
        })
        
        dados.forEach( (time, indice) => {
            // console.log(dados)
            // console.log(time)
    
            // criar linhar tr
            // let linha = document.createElement('tr')
        
            // colocar ela como filho dentro da tabela
            // tabelaClassificacao.appendChild(linha)
        
            // preencher os dados
            linhas[indice].innerHTML = `
                <td>${time.posicao}</td>
                <td>${time.time}</td>
                <td>${time.pontos}</td>
                <td>${time.jogos}</td>
                <td>${time.vitorias}</td>
                <td>${time.empates}</td>
                <td>${time.derrotas}</td>
                <td>${time.gols_pro}</td>
                <td>${time.gols_contra}</td>
                <td>${time.saldo_de_gols}</td>
            `
        })
    }
    )
}

// exibirTabelaClassificacao('G')

// controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')
// console.log(selectLetra)

// usar um escutador de eventos para a nossa cx select
selectLetra.addEventListener('change', (event) => {
    // console.log('mudou')
    // console.log(event.target.value)
    exibirTabelaClassificacao(event.target.value)
})

// consumir dados json externos de uma API
fetch('https://worldcupjson.net/matches/tomorrow/?by_date=DESC')
.then( resposta => resposta.json() )
.then( dados => {
    // console.log(dados)
    dados.forEach( jogo => {
        // console.log(jogo)
        console.log(jogo.home_team_country + " x " + jogo.away_team_country) 
    })
})

// QUARTAS DE FINAL
let divQuartas = document.querySelector('.divQuartas')
// console.log(divQuartas)
const selecoes = [
    {
        mandante: 'Corinthians',
        visitante: 'Ituano'
    }
]

fetch('quartas-de-final.json')
.then( resposta => resposta.json() )
.then( dados => {
    // console.log(dados)

    dados.forEach( jogo => {  
        // criar uma nova divisoria
        let divisoria = document.createElement('div')
        
        // colocar ela como filho de divQuartas
        divQuartas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img class='imagemP' src='./img/Times/${jogo.img_mandante}' />
                <input type='number' min='0' max='99' class='gols golsMandante' value='${jogo.gols_mandante}'>
                ${jogo.partida}
                <input type='number' min='0' max='99' class='gols golsVisitante' value='${jogo.gols_visitante}'>
                <img class='imagemP' src='./img/Times/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar de pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
        let inputGolsMandante = document.querySelectorAll('.golsMandante')
        let inputGolsVisitante = document.querySelectorAll('.golsVisitante')
        let golsM = 0
        let golsV = 0

        // pegar os valores dos inputs quando ocorrer uma mudança neles
        inputGolsMandante.forEach( (jogo, posicao) => {
            inputGolsMandante[posicao].addEventListener('change', (e) => {
                console.log(e.target.value)
                golsM = e.target.value
            })
        })
        inputGolsVisitante.forEach( (jogo, posicao) => {
            inputGolsVisitante[posicao].addEventListener('change', (e) => {
                console.log(e.target.value)
                golsV = e.target.value
                // ver o resultado da partida
                resultados(golsM, golsV, posicao)
            })
        })

        // console.log(jogo.classificado)
        classificados.push(jogo.classificado)
        // console.log(classificados)
        localStorage.setItem('classificados', JSON.stringify(classificados))

    }) // fim do forEach
})

let spanQ1 = document.querySelector('.q1')
let spanQ2 = document.querySelector('.q2')
let spanQ3 = document.querySelector('.q3')
let spanQ4 = document.querySelector('.q4')

function resultados(golsM, golsV, posicao) {
    if(golsM > golsV) {
        if(posicao == 0) {
            spanQ1.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 1) {
            spanQ2.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 2) {
            spanQ3.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 3) {
            spanQ4.innerHTML = selecoes[posicao].mandante
        }
    }
    if(golsM < golsV) {
        if(posicao == 0) {
            spanQ1.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 1) {
            spanQ2.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 2) {
            spanQ3.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 3) {
            spanQ4.innerHTML = selecoes[posicao].visitante
        }
    }
    if(golsM == golsV) {
        console.log('Empate')
    }
}

// criar uma lista de classificados
let classificados = []

// ler os spans que tem a class quartas
let spans = document.querySelectorAll('.quartas')
// console.log(spans)

// preencher com a lista de classificados
// console.log( JSON.parse(localStorage.getItem('classificados'))[1] )

spans.forEach( (span, indice) => {
    span.innerHTML = JSON.parse(localStorage.getItem('classificados'))[indice]
} )