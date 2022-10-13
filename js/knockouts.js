// nextPhaseTeams

function newTable() {
  console.log("ola")
}

// nome ficou ruim mas é isso
function firstRound() {
  async function generatePoints(teams) {
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
  }
}

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