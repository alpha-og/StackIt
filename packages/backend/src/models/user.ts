"use strict";

import { Model, DataTypes, type Optional, type Sequelize } from "sequelize";

// Define attributes
export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: "guest" | "user" | "admin";
}

// Define creation attributes
export interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "role"> {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: string;
    declare username: string;
    declare email: string;
    declare passwordHash: string;
    declare role: "guest" | "user" | "admin";

    // timestamps
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Associations
    static associate(models: any): void {
        User.hasMany(models.Question, { foreignKey: "userId" });
        User.hasMany(models.Answer, { foreignKey: "userId" });
    }
}

export default (sequelize: Sequelize): typeof User => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("guest", "user", "admin"),
                allowNull: false,
                defaultValue: "user",
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "Users",
            timestamps: true,
        },
    );

    return User;
};
