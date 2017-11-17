import React from 'react';

export default function ScoreBoardTable(props) {
  return <table className="score-board-table table">
    <thead>
      <tr>
        <th>
          Équipe
        </th>
        <th>
          Tués
        </th>
        <th>
          Morts
        </th>
        <th>
          Diff
        </th>
      </tr>
    </thead>
    <tbody>
      {
        props.teams.map((team, i) => (<tr key={i}>
          <td>
            {team.name}
          </td>
          <td>
            {team.kills}
          </td>
          <td>
            {team.deaths}
          </td>
          <td>
            {team.diff > 0 ? `+${team.diff}` : team.diff}
          </td>
        </tr>))
      }
    </tbody>
  </table>;
}
