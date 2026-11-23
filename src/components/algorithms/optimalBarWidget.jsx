import React from 'react';
import AlgorithmPlayer from '../AlgorithmPlayer.jsx';
import { cutBar } from '../algorithms/optimalBarValue.js';

function getCutPositions(j, i, S) {
    if (i >= j) return [];

    const cuts = [i];
    let remaining = j - i;
    let position = i;

    while (remaining > 0) {
        const piece = S[remaining];

        if (!Number.isInteger(piece) || piece <= 0) {
            throw new Error(`No hay una decisión válida para la longitud ${remaining}.`);
        }

        remaining -= piece;
        if (remaining > 0) {
            position += piece;
            cuts.push(position);
        }
    }

    return cuts;
}

function renderCutBar(state, n, P)
{
    const unit = 100;
    const overlap = 40;
    const active = state?.active ?? {};
    const step = unit - overlap;
    const cutPositions =
    Number.isInteger(active.j) && Number.isInteger(active.i)
        ? getCutPositions(active.j, active.i, state.S)
        : [];

    const svgWidth = unit + (n - 1) * step + cutPositions.length * overlap;

    const { j, i } = active;
    const remainder = j - i;

    const firstEnd = (i - 1) * step + unit;
    const remainderStart = i * step + overlap;
    const remainderEnd = (j - 1) * step + overlap + unit;

    return (
        <div style={{ display: 'grid', justifyItems: 'center', gap: '0.75rem' }}>
            <svg viewBox={`0 0 ${svgWidth} 100`} width={svgWidth} height={72} color="var(--sl-color-text)">
                {Array.from({ length: n }, (_, drawIndex) => {
                    const unitIndex = n - 1 - drawIndex;
                    const overlapsToRemove = cutPositions.filter(
                        (cutPosition) => cutPosition <= unitIndex
                    ).length;
                    const x = unitIndex * step + overlapsToRemove * overlap;
                    const selected = unitIndex < (active.j ?? 0);
                    return (
                        <g key={drawIndex}>
                            <rect
                                x={x}
                                y={10}
                                width={unit}
                                height={40}
                                rx={20}
                                fill="#d1d5db"
                                stroke={selected ? '#f3e412' : '#666'}
                            />
                            <circle
                                cx={x+20}
                                cy={30}
                                r={20}
                                fill="#a0a4a9"
                                stroke={selected ? '#f3e412' : '#666'}
                            />
                        </g>
                    );
                })}
                {Number.isInteger(j) && (
                    <text x={firstEnd / 2} y={92} textAnchor="middle">
                        P({i}) = {P[i - 1]}€
                    </text>
                )}
                {remainder > 0 && (
                    <text
                        x={(remainderStart + remainderEnd) / 2}
                        y={92}
                        textAnchor="middle"
                    >
                        R({remainder}) = {state.R[remainder]}€
                    </text>
                )}
            </svg>

            <ul
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0.5rem 1rem',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}
            >
                {P.map((price, index) => (
                    <li key={index}>
                        P({index + 1}) = {price}€
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function CutBarWidget({ n, P })
{
    const initialData = {n, P};
    return (
        <AlgorithmPlayer
            algorithm={cutBar}
            initialData={initialData}
            renderer={(state) => renderCutBar(state, n, P)}
        />
    );
}