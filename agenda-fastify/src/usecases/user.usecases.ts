import type { User, UserCreate, userRepository } from '../interfaces/user.interface.js';

export class UserUseCase {
    

    private userRepository: userRepository;
    contactRepository: any;

    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    async create({ name, email }: UserCreate): Promise<User> {
        const verifyUserExists = await this.userRepository.findbyEmail(email);
        if (verifyUserExists) {
            throw new Error('User already exists');
        }
        const result = await this.userRepository.create({ name, email });
        return result;
    }

    async findById(id: string) {
    const contact = await this.contactRepository.findById(id);
    if (!contact) throw new Error('Contato não encontrado');
    return contact;
}
}