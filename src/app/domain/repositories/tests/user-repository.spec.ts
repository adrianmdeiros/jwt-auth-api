import { describe, expect, it, vi } from 'vitest'
import { UserRepository } from '../user-repository'
import { prisma } from '../../../database'

vi.mock('../../../database')

vi.mock('../user-repository', () => {
    return {
        UserRepository: vi.fn().mockImplementation(() => {
            return {
                save: vi.fn(),
                findBy: vi.fn()
            }
        })
    }
})

describe('User Repository', () => {
    const userRepo = new UserRepository(prisma);

    it('should save a user in database', async () => {
        const userToSave = {
            email: 'user@example.com',
            password: 'password'
        };
        const savedUser = {
            id: 'uuid',
            email: userToSave.email
        };

        const mockedSaveUserFunction = vi.fn().mockResolvedValue(savedUser)
        userRepo.save = mockedSaveUserFunction
        const newUser = await userRepo.save(userToSave)
        
        expect(newUser).toEqual(savedUser)
    })

    it('should find a user by email', async () => {
        const userToFind = {
            id: 'uuid',
            email: 'email@example.com'
        };

        const mockedFindByEmailFunction = vi.fn().mockResolvedValue(userToFind)
        userRepo.findByEmail = mockedFindByEmailFunction
        const userFound = await mockedFindByEmailFunction(userToFind.email)

        expect(userFound).toEqual(userToFind)
    })

    it('should return a conflict error when trying to save a user', async () => {
        const userToSave = {
            email: 'email@example.com',
            password: 'password'
        }
        
        const mockedSaveUserFunction = vi.fn().mockRejectedValue(new Error('Conflict: User already exists'))
        userRepo.save = mockedSaveUserFunction 

        try{
            await userRepo.save(userToSave)
        }catch(e: any){
            expect(e.message).toEqual('Conflict: User already exists')
        }
        
    })

    it('should return null if the user is not found by his email', async () => {
        const userToFind = {
            id: 'uuid',
            email: 'email@example.com'
        }

        const mockedFindByEmailFunction = vi.fn().mockRejectedValue(new Error('User not found'))
        userRepo.findByEmail = mockedFindByEmailFunction

        try{
            await userRepo.findByEmail(userToFind.email)
        }catch(e: any){
            expect(e.message).toEqual('User not found')
        }



    })
})