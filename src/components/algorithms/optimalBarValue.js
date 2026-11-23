export function* cutBar({ n, P })
{
    if(!Number.isInteger(n) || n <= 0)
        throw new Error('La barra tiene que tener una longitud entera mayor que 1!');

    if(P.some((pi) => pi <= 0))
        throw new Error('Los precios deben ser racionales mayores que 0.');

    let R = Array.from({ length: n+1 }).fill(null);
    let S = Array.from({ length: n+1 }).fill(null);
    R[0] = 0;

    yield {
        R: [...R],
        active: null,
        message: 'Inicialización',
    };

    for(let j = 1; j <= n; j++)
    {
        let q = -Infinity;
        for(let i = 1; i <= j; i++)
        {
            if(P[i-1] + R[j-i] > q)
            {
                q = P[i-1] + R[j-i];
                S[j] = i;
            }

            yield {
                R: [...R],
                S: [...S],
                active: { j, i },
                message: `Evaluando longitud ${j} y corte después de ${i}`
            }
        }

        R[j] = q;
    }

    let C = [];
    let r = n;
    let p = 0;

    while(r > 0)
    {
        let c = S[r];
        r -= c;

        if(r > 0)
        {
            p += c;
            C.push(p);
        }
    }

    yield {
        R: [...R],
        S: [...S],
        active: { j: n, i: S[n] },
        message: `Solucion optima encontrada: cortes en ${C}.`
    }
}