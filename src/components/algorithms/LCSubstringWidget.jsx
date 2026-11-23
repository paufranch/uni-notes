import React from 'react';
import AlgorithmPlayer from '../AlgorithmPlayer.jsx';
import { lcsubstring } from '../algorithms/LCSubstring.js';

function renderLCSubstring(state, X, Y)
{
    const best = state.best ?? { length: 0, xEnd: 0, yEnd: 0 };
    
    return (
        <div style={{width: '100%'}}>
            <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <table style={{ margin: '0 auto', width: 'fit-content' }}>
                    <caption>
                        Longest Common Substring: X = {X} | Y = {Y}
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">i \ j</th>
                            {state.S[0].map((_, j) => (
                                <th scope="col" key={j}>
                                    {j === 0 ? '∅' : Y[j - 1]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {state.S.map((row, i) => (
                            <tr key={i}>
                                <th scope="row">
                                    {i === 0 ? '∅' : X[i - 1]}
                                </th>
                                {row.map((value, j) => {
                                    const isActive =
                                        state.active?.type === 'cell' &&
                                        state.active.i === i &&
                                        state.active.j === j;

                                    return (
                                        <td
                                            key={j}
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
            <div style={{ textAlign: 'center', whiteSpace: 'pre' }}>
                <p>
                    <strong>X: </strong>
                    {renderString(X, best.xEnd - best.length, best.xEnd)}
                </p>
                <p>
                    <strong>Y: </strong>
                    {renderString(Y, best.yEnd - best.length, best.yEnd)}
                </p>
                <p>Longitud máxima encontrada: {best.length}</p>
            </div>
        </div>
    );
}

function renderString(text, start, end) {
    return text.split('').map((char, index) => (
        <span
            key={index}
            style={
                index >= start && index < end
                    ? {
                        backgroundColor: 'var(--sl-color-accent-low)',
                        borderRadius: '3px',
                    }
                    : undefined
            }
        >
            {char}
        </span>
    ));
}

export default function LCSubstringWidget({ X, Y })
{
    const initialData = { X, Y };
    return (
        <AlgorithmPlayer
            algorithm={lcsubstring}
            initialData={initialData}
            renderer={(state) => renderLCSubstring(state, X, Y)}
        />
    );
}