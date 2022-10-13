// divide as equipes em 8 grupos
let teams;

async function divideTeams() {
  // recebe as informações das equipes
  let allTeams = await get();

  // cria os grupos
  let groupsLength = 8;
  let groups = [];
  for (let i = 0; i < groupsLength; i++) {
    let newGroup = [];

    for (let j = 0; j < 4; j++) {
      let teamsRange = allTeams.length;
      let selectTeam = Math.floor(Math.random() * teamsRange);

      newGroup.push(allTeams[selectTeam]);

      allTeams.splice(selectTeam, 1)
    }

    groups.push(newGroup)
  }

  teams = insertProperty(groups);
  fillTableStart(groups);

  return groups
}

// cria duas novas propriedades para cada um dos times
function insertProperty(teams) {
  let teamsPoints = teams;

  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].length; j++) {
      teamsPoints[i][j] = { ...teamsPoints[i][j], "Points": 0, "Goals": 0 }
    }
  }

  return teamsPoints;
}

// preenche os espaços na tabela com os nomes das equipes
function fillTableStart(groups) {
  let groupsName = ["A", "B", "C", "D", "E", "F", "G", "H"]

  for (let i = 0; i < groups.length; i++) {
    let row = document.getElementsByClassName(groupsName[i])[0];
    for (let j = 0; j < groups[i].length; j++) {
      let insideRow = row.insertRow()
      insideRow.insertCell(0).appendChild(document.createTextNode(groups[i][j].Name));
      insideRow.insertCell(1).appendChild(document.createTextNode(groups[i][j].Points));
      insideRow.insertCell(1).appendChild(document.createTextNode(groups[i][j].Goals));
    }
  }
}

divideTeams()