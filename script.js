const teams = document.querySelector('#teams');
const teamsData = document.querySelector('#team-data');
const getTeamBtn = document.querySelector('#getTeam');
const refreshBtn = document.querySelector('#refresh');


const FOOTBALL_DATA_URL = 'http://api.football-data.org/v2';

const getTeams = async () => {
  try {
    const res = await fetch(`${FOOTBALL_DATA_URL}/competitions/2017/teams`, {
      headers: {
        'X-Auth-Token': '15a24cc3edfb4c64a66c0214e356ebe7',
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
    const team = document.createElement('div');
    team.innerText = i.name;
    teams.appendChild(team);
    team.className = 'team';
    getTeamBtn.className = 'hidden';

    // create team data
    team.addEventListener('click', () => {
      teams.classList.add('hidden');
      teamsData.innerHTML =
        `<div>Address:</div>
         <div class="team-data" id="teamsData">${i.address}</div>
         <div>phone:</div>
         <div class="team-data" id="teamsData">${i.phone}</div>
         <div>Website:</div>
         <div class="team-data" id="teamsData">${i.website}</div>
         <div>Country:</div>
         <div class="team-data" id="teamsData">${i.area.name}</div>
`;
    });
  });
};










