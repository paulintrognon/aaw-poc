import React from 'react';

export default function ScoreBoardTable(props) {
  return <table className="score-board-table table">
    <thead>
      <tr>
        <th>
          Nom
        </th>
        <th>
          Équipe
        </th>
        <th>
          Tués
        </th>
        <th>
          Morts
        </th>
      </tr>
    </thead>
    <tbody>
      {
        props.players.map((player, i) => (<tr key={i}>
          <td style={{wordWrap: 'break-word', maxWidth: '125px'}}>
            {player.name}
          </td>
          <td>
            {player.team}
          </td>
          <td>
            {player.kills}
          </td>
          <td>
            {player.deaths}
          </td>
        </tr>))
      }
    </tbody>
  </table>;
}
