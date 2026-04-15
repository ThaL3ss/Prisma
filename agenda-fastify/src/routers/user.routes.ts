import type { FastifyInstance } from 'fastify';
import { UserUseCase } from '../usecases/user.usecases.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { UserCreate } from '../interfaces/user.interface.js';


export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepositoryPrisma();
    const userUseCase = new UserUseCase(userRepository);

    
    fastify.post<{ Body: UserCreate }>('/', async (request, reply) => {
        const { name, email } = request.body;
        // O uso de try/catch é importante para lidar com possíveis erros que possam ocorrer durante a criação do usuário, como erros de validação, problemas de conexão com o banco de dados, etc. Isso garante que o servidor possa responder adequadamente em caso de falhas, em vez de simplesmente travar ou retornar uma resposta genérica de erro.
        try {
            // O método create do UserUseCase é chamado para criar o usuário no banco de dados ou em qualquer outra fonte de dados.
            // O resultado é retornado como um objeto do tipo User, que representa o usuário criado.
            const data = await userUseCase.create({
                name,
                email,
            });
            // O status 201 (Created) é usado para indicar que um novo recurso foi criado com sucesso. O método send é usado para enviar a resposta de volta ao cliente, contendo os dados do usuário criado.
            return reply.status(201).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    // A rota GET '/' é definida para retornar uma mensagem de "Hello World!" como resposta. Esta rota é apenas um exemplo simples para demonstrar como definir uma rota GET no Fastify. Em um cenário real, esta rota poderia ser usada para listar usuários ou fornecer outras funcionalidades relacionadas a usuários.
    fastify.get('/', async (request, reply) => {
        return reply.send('Hello World!');
    });


    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };    
        return reply.send(`User with ID ${id} deleted`);
    });

}
