"use strict";

import { Model, DataTypes, type Optional, type Sequelize } from "sequelize";

export interface TagAttributes {
    id: string;
    name: string;
}

export interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

export class Tag
    extends Model<TagAttributes, TagCreationAttributes>
    implements TagAttributes
{
    public id!: string;
    public name!: string;

    static associate(models: any) {
        Tag.belongsToMany(models.Question, {
            through: "QuestionTags",
            foreignKey: "tagId",
        });
    }
}

export default (sequelize: Sequelize): typeof Tag => {
    Tag.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Tag",
            tableName: "Tags",
            timestamps: true,
        },
    );

    return Tag;
};
