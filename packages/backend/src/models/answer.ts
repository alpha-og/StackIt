"use strict";

import { Model, DataTypes, type Optional, type Sequelize } from "sequelize";

export interface AnswerAttributes {
    id: string;
    content: string;
    isAccepted: boolean;
    userId: string;
    questionId: string;
}

export interface AnswerCreationAttributes
    extends Optional<AnswerAttributes, "id" | "isAccepted"> {}

export class Answer
    extends Model<AnswerAttributes, AnswerCreationAttributes>
    implements AnswerAttributes
{
    public id!: string;
    public content!: string;
    public isAccepted!: boolean;
    public userId!: string;
    public questionId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Answer.belongsTo(models.User, { foreignKey: "userId" });
        Answer.belongsTo(models.Question, { foreignKey: "questionId" });
        Answer.hasMany(models.Vote, { foreignKey: "answerId" });
    }
}

export default (sequelize: Sequelize): typeof Answer => {
    Answer.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            questionId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Answer",
            tableName: "Answers",
            timestamps: true,
        },
    );

    return Answer;
};
