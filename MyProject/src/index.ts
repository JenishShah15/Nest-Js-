import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

// AppDataSource.initialize().then(async()=>{
//     console.log("Initializing the database connection and inserting the user")

//     const user = new User();
//     user.firstName= "abhi"
//     user.lastName = "shah"
//     user.age = 22;
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new database user with userid"+user.id);
//     console.log("Loading users for the database");
//     const users = await AppDataSource.manager.find(User);
//     console.log("the total users registered in the database are ",users);

// }).catch(error => console.log(error.message))


