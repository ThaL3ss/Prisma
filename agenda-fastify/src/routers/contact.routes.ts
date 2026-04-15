import type { FastifyInstance } from 'fastify';
import { ContactUseCase } from '../usecases/contact.usercase.js';
import { ContactRepositoryPrisma } from '../repositories/contact.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';
import type { ContactCreate } from '../interfaces/contact.interface.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


export async function contactRoutes(fastify: FastifyInstance) {
    // Cria instâncias dos repositórios e do use case
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const contactUseCase = new ContactUseCase(contactRepository, userRepository);

    fastify.addHook('preHandler', authMiddleware);


    // Rota para criação de um novo contato
    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail
            });

            return reply.status(201).send(data);
        } catch (error) {
            // Em caso de erro (ex: contato já existe), retorna o erro para o cliente
            reply.send(error);
        }
    });

    // Rota para busca de contatos  
    fastify.get('/', async (request, reply) => {
        const emailUser = request.headers['email'] as string;
      try {     
        const data = await contactUseCase.listAllContacts(emailUser);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    });

    fastify.put<{ Body: ContactCreate, Params: { id: string } }>('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { name, email, phone } = request.body;
        const userEmail = request.headers['email'] as string;
        try {
            const data = await contactUseCase.updateContact({ id, name, email, phone });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }   
    });

    fastify.delete('/:id', async (request, reply) => {
        try {
            const { id } = request.params as { id: string };
            const result = await contactUseCase.delete(id);
            return reply.send(result);

            } catch (error) {
                reply.send(error);
            } 
    }); 

    fastify.get('/:id', { preHandler: [authMiddleware] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    try {
        const contact = await contactUseCase.findById(id);
        return reply.status(200).send(contact);
    } catch (error) {
        return reply.status(404).send({ error: 'Contato não encontrado' });
    }
});
}
