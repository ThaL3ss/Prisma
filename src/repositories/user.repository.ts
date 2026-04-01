import type { User, UserRepository } from "../interface/user.interface.js";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        
    }
}