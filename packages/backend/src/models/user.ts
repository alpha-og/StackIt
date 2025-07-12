"use strict";

import { Model, DataTypes, type Optional, Sequelize } from "sequelize";

// Define attributes
export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: "guest" | "user" | "admin";
}

// Define creation attributes (omit `id` if auto-generated)
export interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "role"> {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    public id!: string;
    public username!: string;
    public email!: string;
    public passwordHash!: string;
    public role!: "guest" | "user" | "admin";

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

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
