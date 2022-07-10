import * as ShortId from 'shortid';

export default async function generateRandomCode (repository: any): Promise<string> {
    //toDo нужна другая кодировка
    const randomCode = (ShortId.generate() + ShortId.generate()).replace(/[^\w\d]/, '').substring(0, 6);
    const existingCode = await repository.findOneBy({ code: randomCode});
    if (existingCode) {
        return generateRandomCode(repository)
    } else {
        return randomCode
    }
};