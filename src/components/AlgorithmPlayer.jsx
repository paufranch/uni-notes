import React, { useState, useEffect, useMemo } from 'react';

export default function AlgorithmPlayer({ algorithm, initialData, renderer })
{
    const steps = useMemo(() => {
        const history = [];
        const gen = algorithm(structuredClone(initialData));
        for(const state of gen)
        {
            history.push(state);
        }
        return history;
    }, [algorithm, initialData]);

    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if(!playing) return;
        const timer = setInterval(() => {
            setIndex((prev) => {
                if(prev >= steps.length - 1)
                {
                    setPlaying(false);
                    return prev;
                }
                return prev + 1
            });
        }, 600);
        return () => clearInterval(timer);
    }, [playing, steps.length]);

    const currentState = steps[index];

    return (
        <div style={{ border: '1px solid var(--sl-color-hairline)', borderRadius: '8px', padding: '1rem', margin: '1.5rem 0'}}>
            <div style={{ minHeight: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderer(currentState)}
            </div>

            <p style={{ textAlign: 'center', fontStyle: 'italic', margin: '0.75rem 0' }}>
                {currentState?.message || `Paso ${index + 1} de ${steps.length}`}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button type="button" className="player-button" onClick={() => { setPlaying(false); setIndex(0); }}>
                    <span className="player-button_long">⏪️ Reiniciar</span>
                    <span className="player-button_short">⏪️</span>
                </button>
                <button type="button" className="player-button" onClick={() => { setPlaying(false); setIndex((i) => Math.max(0, i-1)); }}>
                    <span className="player-button_long">⏮️ Anterior</span>
                    <span className="player-button_short">⏮️</span>
                </button>
                <button type="button" className="player-button" onClick={() => setPlaying(!playing)}>
                    {playing ? (
                        <>
                            <span className="player-button_long">⏸️ Pausar</span>
                            <span className="player-button_short">⏸️</span>
                        </>
                    ) : (
                        <>
                            <span className="player-button_long">▶️ Reproducir</span>
                            <span className="player-button_short">▶️</span>
                        </>
                    )}
                </button>
                <button type="button" className="player-button" onClick={() => { setPlaying(false); setIndex((i) => Math.min(steps.length-1, i+1))}}>
                    <span className="player-button_long">Siguiente ⏭️</span>
                    <span className="player-button_short">⏭️</span>
                </button>
            </div>
        </div>
    );
}