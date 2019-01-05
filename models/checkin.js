import { sequelize } from '../utils/provider'
import Sequelize from 'sequelize'
import User from './user'

const Checkin = sequelize.define('checkins',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER.UNSIGNED,
            field: 'user_id',
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        checkinAt: {
            type: Sequelize.DATE(6),
            field: 'checkin_at'
        },
        location: Sequelize.STRING,
        wifi: Sequelize.STRING,
        GPS: {
            type: Sequelize.STRING,
            field: 'gps'
        },
        valid: Sequelize.BOOLEAN,
        createdAt: {
            type: Sequelize.DATE(6),
            field: 'created_at'
        },
        updatedAt: {
            type: Sequelize.DATE(6),
            field: 'updated_at'
        }
    },
    {
        timestamps: false,
        indexes: [
            {
                name: 'checkins_pk_index',
                fields: ['id']
            },
            {
                name: 'checkins_users_fk_index',
                fields: ['user_id']
            }
        ]
    }
)

export default Checkin