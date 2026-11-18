export function* knapsack({ weights, values, W })
{
    if(weights.length !== values.length)
        throw new Error('Hay distinto numero de pesos y valores!');
    if(!Number.isInteger(W) || W < 0)
        throw new Error('W debe ser un entero no negativo.');
    if(weights.some((w) => !Number.isInteger(w) || w <= 0))
        throw new Error('Los pesos deben ser todos enteros positivos.');

    const n = weights.length;
    const P = Array.from(
        { length: n+1 },
        () => Array(W + 1).fill(null), 
    );

    for(let i = 1; i <= W; i++)
        P[0][i] = 0;
    const snapshot = () => P.map((row) => row.slice());

    yield {
        P: snapshot(),
        active: {type: 'row', i: 0},
        message: 'Inicializamos la tabla con los casos base.'
    };

    for(let i = 1; i <= n; i++)
    {
        for(let x = 1; x <= W; x++)
        {
            const weight = weights[i-1];

            if(weight > x)
            {
                P[i][x] = P[i-1][x];
                yield {
                    P: snapshot(),
                    active: {type: 'cell',i,x},
                    message: `Calculamos P[${i}, ${x}]. Como w[i]=${weight} > x=${x}, nos quedamos con la fila anterior P[i-1][x].`
                };
            }
            else
            {
                const skip = P[i-1][x];
                const take = P[i-1][x - weight] + values[i - 1];
                P[i][x] = Math.max(skip, take);
                yield {
                    P: snapshot(),
                    active: {type: 'cell',i,x},
                    message: `Calculamos P[${i}, ${x}]. Como w[i]=${weight} ≤ x=${x}, cogemos el maximo entre P[i-1][x] y P[i-1][x-wi] + v[i-1], en este caso: ${Math.max(skip, take)}.`
                };
            }
        }
    }

    yield {
        P: snapshot(),
        active: {type: 'cell', i:n, x:W},
        message: `Valor optimo encontrado: ${P[n][W]}`
    };
}