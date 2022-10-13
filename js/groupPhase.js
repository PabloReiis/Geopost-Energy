// debug para ver os times
function seeTeams() {
  console.log(teams);
}

// variáveis de tempo, controle de rodada, das equipes e os times ordenados
const timer = ms => new Promise(res => setTimeout(res, ms));
let round = 0;
let groups = [
  [[0, 1], [2, 3]],
  [[0, 2], [1, 3]],
  [[0, 3], [1, 2]]
]
let orderedTeams = [];

// inicio dos jogos fase de grupos
function startGP(teams) {
  // desativa o botão enquanto os resultados estiverem sendo gerados
  document.getElementsByClassName("start-button")[0].style.display = "none";

  // Modifica com o número da rodada
  let roundText = document.getElementsByClassName("match-header")[0];
  roundText.innerHTML = "Rodada " + (round + 1);

  // faz aparecer os separadores
  document.getElementsByClassName("team-x")[0].style.display = "flex";
  document.getElementsByClassName("team-x")[1].style.display = "flex";

  // chama o log para alterar os valores das partidas
  generatePoints(teams)
}

// gera os resultados dos jogos
async function generatePoints(teams) {
  // grupo
  for (let j = 0; j < 8; j++) {
    // jogos do grupo
    for (let k = 0; k < 2; k++) {
      // os gols serão de 0 a 3 porém, é gerado um valor de 0 a 100, e caso seja sorteado um dos valores presentes nos
      // ifs abaixo, é adicionado determinada de quantia ao valor final, como se fosse uma sorte ou desempenho extra
      // da equipe;
      let teamAGoals = Math.floor(Math.random() * 4);
      let teamAModifier = Math.floor(Math.random() * 100);
      if (teamAModifier == 35) {
        teamAGoals += 3;
      }
      else if (teamAModifier == 58) {
        teamAGoals += 2;
      }
      else if (teamAModifier == 15) {
        teamAGoals += 1;
      }

      let teamBGoals = Math.floor(Math.random() * 4);
      let teamBModifier = Math.floor(Math.random() * 100);
      if (teamBModifier == 35) {
        teamBGoals += 3;
      }
      else if (teamBModifier == 58) {
        teamBGoals += 2;
      }
      else if (teamBModifier == 15) {
        teamBGoals += 1;
      }

      // essa parte pode ter ficado um pouco confusa mas foi a forma mais simples que eu pensei de separar os valores
      // j será o valor da equipe, i é a rodada e k é qual das duas partidas da rodada
      // groups eu predefini a ordem que os times irão se enfrentar, como tem 2 jogos por grupo, as 6 partidas estão 
      // já predefinidas
      let teamA = teams[j][groups[round][k][0]];
      let teamB = teams[j][groups[round][k][1]];

      console.log("Gols da " + teamA.Name + ": " + teamAGoals);
      console.log("Modificador da " + teamA.Name + ": " + teamAModifier);
      console.log("Gols da " + teamB.Name + ": " + teamBGoals);
      console.log("Modificador da " + teamB.Name + ": " + teamBModifier);

      // determina os pontos de cada time
      let result;
      if (teamAGoals > teamBGoals) {
        teamA.Points += 3;
        result = teamA.Name;
      }
      else if (teamAGoals == teamBGoals) {
        teamA.Points += 1;
        teamB.Points += 1;
        result = "drawn";
      }
      else {
        teamB.Points += 3;
        result = teamB.Name;
      }

      // adiciona as quantidade de gols nos históricos
      teamA.Goals += teamAGoals;
      teamB.Goals += teamBGoals;

      // chama a função para atualizar o placar
      rewriteValues(teams[j], j, k);
      // atualiza o log da partida
      log(teamA.Name, teamAGoals, teamB.Name, teamBGoals, result);
      // espera 5 segundos para o resultado do próximo jogo
      await timer(100);
      console.log("");
    }
  }

  if (round < 2) {
    nextRound();
  }
  else {
    nextPhase();
  }
}

// escreve na tela os acontecimentos
function log(teamAName, teamAGoals, teamBName, teamBGoals, result) {
  // escreve as informações para o time A
  document.getElementsByClassName("teamA-name")[0].innerHTML = teamAName;
  document.getElementsByClassName("teamA-goals")[0].innerHTML = teamAGoals;

  // escreve as informações para o time B
  document.getElementsByClassName("teamB-name")[0].innerHTML = teamBName;
  document.getElementsByClassName("teamB-goals")[0].innerHTML = teamBGoals;

  // Escreve o resultado
  if (result == "drawn") {
    document.getElementsByClassName("result")[0].innerHTML = "Empate";
  }
  else {
    document.getElementsByClassName("result")[0].innerHTML = "Vitória da " + result;
  }
}

// reescreve os valores no placar
function rewriteValues(teams, j, k) {
  let groupsName = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let orderedValues = sortValues(teams, k);

  for (let i = 0; i < 4; i++) {
    let element = document.getElementsByClassName(groupsName[j])[0].getElementsByTagName("tr")[1 + i];
    element.getElementsByTagName("td")[0].innerHTML = orderedValues[i].Name;
    element.getElementsByTagName("td")[1].innerHTML = orderedValues[i].Points;
    element.getElementsByTagName("td")[2].innerHTML = orderedValues[i].Goals;
  }
}

// reorganiza as arrays por ordem de pontos, gols, aleatório
function sortValues(teams, k) {
  // é necessário utilizar o slice(0) para que não modifique a array principal
  let sortValues = teams.slice(0);

  for (let i = 0; i < sortValues.length; i++) {
    sortValues.sort(function (a, b) {
      if (a.Points == b.Points) {
        if (a.Goals == b.Goals) {
          console.log("Necessário escolher aleatóriamente");
          // caso empate em número de gols organiza aleatoriamente
          return Math.random() - 0.5;
        }
        // caso empate organizar por gols
        return b.Goals - a.Goals;
      }
      // organiza por pontos
      return b.Points - a.Points;
    });
  }

  // salva a ordenação final
  if (round == 2 && k == 1) {
    orderedTeams.push(sortValues)
  }

  return sortValues
}

// habilita o botão para iniciar o próximo round
function nextRound() {
  // soma mais um no round
  round++;
  // reabilita o botão e troca seu texto
  document.getElementsByClassName("start-button")[0].style.display = "flex";
  document.getElementsByClassName("start-button")[0].innerHTML = "Iniciar fase " + (round + 1);
}

// gera os classificados e inicia o próximo round 
function nextPhase() {
  // aparece o botão para ir pra próxima parte
  document.getElementsByClassName("start-button")[0].style.display = "flex";
  document.getElementsByClassName("start-button")[0].innerHTML = "Finalizar fase de grupos";
  document.getElementsByClassName("start-button")[0].onclick = function () { newTable() };

  let nextPhaseTeams = [];

  // configura os times para as oitavas
  for (let i = 0; i < 4; i++) {
    nextPhaseTeams.push([orderedTeams[i * 2][0], orderedTeams[(i * 2) + 1][1]]);
    nextPhaseTeams.push([orderedTeams[i * 2][1], orderedTeams[(i * 2) + 1][0]]);
  }

  console.log(nextPhaseTeams);
}