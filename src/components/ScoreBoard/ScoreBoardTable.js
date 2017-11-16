import React from 'react';

export default function ScoreBoardTable(props) {
  return <table className="score-board-table table">
    <thead>
      <tr>
        <th>
          Nom
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
          <td>
            <b>{player.name}</b>
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
