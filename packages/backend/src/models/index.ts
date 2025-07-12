import { Sequelize } from "sequelize";

import defineUser, { User } from "./user.ts";
import defineQuestion, { Question } from "./question.ts";
import defineAnswer, { Answer } from "./answer.ts";
import defineVote, { Vote } from "./vote.ts";
import defineTag, { Tag } from "./tag.ts";

const models = {
    User,
    Question,
    Answer,
    Vote,
    Tag,
};

export const initModels = (sequelize: Sequelize) => {
    // Initialize
    defineUser(sequelize);
    defineQuestion(sequelize);
    defineAnswer(sequelize);
    defineVote(sequelize);
    defineTag(sequelize);

    // Associate
    User.associate(models);
    Question.associate(models);
    Answer.associate(models);
    Vote.associate(models);
    Tag.associate(models);
};

export { User, Question, Answer, Vote, Tag };

// import fs from "fs";
// import path from "path";
// import { Sequelize, DataTypes, ModelStatic } from "sequelize";
//
// import process from "process";
//
// import configObj from "../config/config.json"; // Adjust this if using a different path or filename
// import { Dialect } from "sequelize";
//
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = configObj[env];
//
// interface DB {
//     sequelize: Sequelize;
//     Sequelize: typeof Sequelize;
//     [modelName: string]: ModelStatic<any> | Sequelize | typeof Sequelize;
// }
// const db = {} as DB;
// let sequelize: Sequelize;
//
// if ("use_env_variable" in config && config.use_env_variable) {
//     const connectionUri = process.env[config.use_env_variable];
//     if (!connectionUri)
//         throw new Error(
//             `Missing environment variable: ${config.use_env_variable}`,
//         );
//     sequelize = new Sequelize(connectionUri, config);
// } else {
//     sequelize = new Sequelize(
//         config.database as string,
//         config.username as string,
//         config.password as string,
//         {
//             ...config,
//             dialect: config.dialect as Dialect,
//         },
//     );
// }
//
// // Dynamically import all models in this directory
// const files = fs.readdirSync(__dirname).filter((file) => {
//     return (
//         file.indexOf(".") !== 0 &&
//         file !== basename &&
//         file.endsWith(".ts") &&
//         !file.endsWith(".test.ts")
//     );
// });
//
// for (const file of files) {
//     const modelImport = await import(path.join(__dirname, file));
//     const model = modelImport.default(sequelize, DataTypes);
//     db[model.name] = model;
// }
//
// Object.keys(db).forEach((modelName) => {
//     const model = db[modelName];
//     if (model && typeof (model as any).associate === "function") {
//         (model as any).associate(db);
//     }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// export default db;
