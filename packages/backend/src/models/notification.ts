"use strict";

import { Model, DataTypes, type Optional, Sequelize } from "sequelize";

export interface NotificationAttributes {
    id: string;
    userId: string;
    type: "answer" | "comment" | "mention";
    relatedId: string;
    isRead: boolean;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationCreationAttributes
    extends Optional<NotificationAttributes, "id" | "isRead"> {}

export class Notification
    extends Model<NotificationAttributes, NotificationCreationAttributes>
    implements NotificationAttributes
{
    public id!: string;
    public userId!: string;
    public type!: "answer" | "comment" | "mention";
    public relatedId!: string;
    public isRead!: boolean;
    public content!: string;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any): void {
        Notification.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
    }
}

export default (sequelize: Sequelize): typeof Notification => {
    Notification.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("answer", "comment", "mention"),
                allowNull: false,
            },
            relatedId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Notification",
            tableName: "Notifications",
            timestamps: true,
        },
    );

    return Notification;
};
