import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('12?34567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export default async function generateRandomCode (repository: any): Promise<string> {
    const randomCode = nanoid();
    const existingCode = await repository.findOneBy({ code: randomCode});
    if (existingCode) {
        return generateRandomCode(repository)
    } else {
        return randomCode
    }
    return ''
};