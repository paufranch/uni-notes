import React from 'react';
import AlgorithmPlayer from '../AlgorithmPlayer.jsx';
import { knapsack } from '../algorithms/knapsack01.js';

function renderKnapsack(state)
{
    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <table>
                <thead>
                    <tr>
                        <th>i \ x</th>
                        {state.P[0].map((_, x) => (<th key={x}>{x}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {state.P.map((row, i) => (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            {row.map((value, x) => {
                                const isActive =
                                    (state.active?.type === 'row' && state.active.i === i) ||
                                    (state.active?.type === 'cell' &&
                                        state.active.i === i &&
                                        state.active.x === x);
                                
                                return (
                                    <td
                                        key={x}
                                        style={{
                                        border: '1px solid var(--sl-color-hairline)',
                                        padding: '0.25rem 0.5rem',
                                        textAlign: 'center',
                                        backgroundColor: isActive
                                            ? 'var(--sl-color-accent-low)'
                                            : undefined,
                                        }}
                                    >
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function KnapsackWidget({ weights, values, W })
{
    const initialData = { weights, values, W };
    return (
        <AlgorithmPlayer
            algorithm={knapsack}
            initialData={initialData}
            renderer={renderKnapsack}
        />
    );
}