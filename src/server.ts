import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';


//logger tras algumas informações de log para facilitar o desenvolvimento, como as requisições feitas, erros, etc.
const app: FastifyInstance = fastify({ logger: true });

app.listen(
    {port: 3100,
    },
    () => console.log('Servidor rodando'),
);
