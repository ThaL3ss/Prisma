import { PrismaClient } from '@prisma/client';

//O código do database será referenciado via const prisma, para que seja possível realizar as operações de leitura e escrita no banco de dados.
export const prisma = new PrismaClient();