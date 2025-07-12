"use strict";

import { Model, DataTypes, type Optional, type Sequelize } from "sequelize";

export interface VoteAttributes {
    id: string;
    type: "upvote" | "downvote";
    userId: string;
    answerId: string;
}

export interface VoteCreationAttributes
    extends Optional<VoteAttributes, "id"> {}

export class Vote
    extends Model<VoteAttributes, VoteCreationAttributes>
    implements VoteAttributes
{
    public id!: string;
    public type!: "upvote" | "downvote";
    public userId!: string;
    public answerId!: string;

    public readonly createdAt!: Date;

    static associate(models: any) {
        Vote.belongsTo(models.User, { foreignKey: "userId" });
        Vote.belongsTo(models.Answer, { foreignKey: "answerId" });
    }
}

export default (sequelize: Sequelize): typeof Vote => {
    Vote.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("upvote", "downvote"),
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            answerId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Vote",
            tableName: "Votes",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["userId", "answerId"],
                },
            ],
        },
    );

    return Vote;
};
