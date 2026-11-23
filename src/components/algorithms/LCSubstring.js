export function* lcsubstring({ X, Y })
{
    if (
        (typeof X !== 'string' && !(X instanceof String)) ||
        (typeof Y !== 'string' && !(Y instanceof String))
    ) {
        throw new Error('Las entradas no son strings!');
    }

    X = String(X);
    Y = String(Y);

    const n = X.length;
    const m = Y.length;
    const s = Array.from(
        { length: n + 1 },
        () => Array(m+1).fill(0),
    );

    const snapshot = () => s.map((row) => row.slice());
    let best = { length: 0, xEnd: 0, yEnd: 0 };

    yield {
        S: snapshot(),
        best: { ...best },
        active: {type: 'table' },
        message: 'Inicializamos la tabla con los casos base.'
    };

    for (let i = 1; i <= n; i++) {
        for(let j = 1; j <= m; j++) {
            if (X[i - 1] === Y[j - 1]) {
                s[i][j] = s[i - 1][j - 1] + 1;

                if(s[i][j] > best.length)
                    best = { length: s[i][j], xEnd: i, yEnd: j };

                yield {
                    S: snapshot(s),
                    best: { ...best },
                    active: { type: 'cell', i, j },
                    message: 'Las letras coinciden'
                };
            } else {
                s[i][j] = 0;
                yield {
                    S: snapshot(s),
                    best: { ...best },
                    active: { type: 'cell', i, j },
                    message: 'Las letras no coinciden'
                };
            }
        }
    }
}