import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUsers) => {
    try {
        const usersPromise = [];
        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.username().toLowerCase(),
                bio: faker.lorem.sentence(10),
                password: "password",
                avatar: {
                    public_id: faker.system.fileName(),
                    url: faker.image.avatar()
                },
            })
            usersPromise.push(tempUser)

        }
        await Promise.all(usersPromise)
        console.log("Users created", numUsers)
        process.exit(1);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export {
    createUser
};
