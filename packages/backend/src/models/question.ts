"use strict";

import { Model, DataTypes, type Optional, type Sequelize } from "sequelize";
import { Tag } from "./tag.ts";

export interface QuestionAttributes {
    id: string;
    title: string;
    description: string;
    userId: string;
}

export interface QuestionCreationAttributes
    extends Optional<QuestionAttributes, "id"> {}

export class Question
    extends Model<QuestionAttributes, QuestionCreationAttributes>
    implements QuestionAttributes
{
    public id!: string;
    public title!: string;
    public description!: string;
    public userId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Tag association methods added by Sequelize
    public setTags!: (tags: Tag[] | string[] | any) => Promise<void>;
    public addTags!: (tags: Tag[] | string[] | any) => Promise<void>;
    public getTags!: () => Promise<Tag[]>;

    static associate(models: any) {
        Question.belongsTo(models.User, { foreignKey: "userId" });
        Question.hasMany(models.Answer, { foreignKey: "questionId" });
        Question.belongsToMany(models.Tag, {
            through: "QuestionTags",
            foreignKey: "questionId",
            otherKey: "tagId",
        });
    }
}

export default (sequelize: Sequelize): typeof Question => {
    Question.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Question",
            tableName: "Questions",
            timestamps: true,
        },
    );

    return Question;
};
