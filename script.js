const wrapper = document.querySelector('#wrapper');
const teams = document.querySelector('#teams');
const teamsData = document.querySelector('#team-data');
const getTeamBtn = document.querySelector('#getTeam');


const FOOTBALL_DATA_URL = 'https://api.football-data.org/v2';

const getTeams = async () => {
  try {
    const res = await fetch(`${FOOTBALL_DATA_URL}/competitions/2017/teams`, {
      headers: {
        'X-Auth-Token': '15a24cc3edfb4c64a66c0214e356ebe7',
        'Access-Control-Allow-Origin': '*',
      },
      type: 'GET',
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

const getMatchlistCurrent = async (id) => {
  try {
    const res = await fetch(`${FOOTBALL_DATA_URL}/teams/${id}/matches`, {
      headers: {
        'X-Auth-Token': '15a24cc3edfb4c64a66c0214e356ebe7',
        'Access-Control-Allow-Origin': '*',
      },
      type: 'GET',
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

getTeamBtn.addEventListener('click', () => {
  getTeams()
    .then(createLayoutByTeams);
});

const createLayoutByTeams = (data) => {
  data.teams.forEach(i => {
    wrapper.style = 'height: 100%';
    const team = document.createElement('div');
    team.innerText = i.name;
    teams.appendChild(team);
    team.className = 'team';
    getTeamBtn.className = 'hidden';

    // create team data
    team.addEventListener('click', () => {
      teams.classList.add('hidden');
      teamsData.style = 'display: flex';
      // create team info
      const teamInfo = document.createElement('div');
      teamInfo.classList.add('team-data-info');
      teamsData.appendChild(teamInfo);
      teamInfo.innerHTML = `<div>Address:</div>
            <div class="team-data" id="teamsData">${i.address}</div>
            <div>phone:</div>
            <div class="team-data" id="teamsData">${i.phone}</div>
            <div>Website:</div>
            <div class="team-data" id="teamsData">${i.website}</div>
            <div>Country:</div>
            <div class="team-data" id="teamsData">${i.area.name}</div>
`;
      // create match list info by team
      const teamListHeader = document.createElement('p');
      teamListHeader.innerText = 'Current matches:';
      const teamList = document.createElement('div');
      teamList.classList.add('match-list-wrapper');
      teamsData.appendChild(teamListHeader);
      teamsData.appendChild(teamList);
      getMatchlistCurrent(i.id)
        .then(teamInfo => {
          teamInfo.matches.forEach(item => {
            const teamListItem = document.createElement('div');
            teamList.appendChild(teamListItem);
            return teamListItem.innerHTML +=
              `<ul>
              <li>${item.homeTeam.name} - ${item.awayTeam.name}</li>
               </ul>   
`;
          });
        });
    });
  });
};










