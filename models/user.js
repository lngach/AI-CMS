import { sequelize } from '../utils/provider'
import Sequelize from 'sequelize'
import Checkin from './checkin'

const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        avatar: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tokens: Sequelize.STRING,
        resetPasswordToken: {
            type: Sequelize.STRING,
            field: 'reset_password_token'
        },
        resetPasswordSentAt: {
            type: Sequelize.Sequelize.DATE(6),
            field: 'reset_password_sent_at'
        },
        confirmationToken: {
            type: Sequelize.STRING,
            field: 'confirmation_token'
        },
        confirmationSentAt: {
            type: Sequelize.DATE(6),
            field: 'confirmation_sent_at'
        },
        confirmedAt: {
            type: Sequelize.DATE(6),
            field: 'confirmed_at'
        },
        currentSigninAt: {
            type: Sequelize.DATE(6),
            field: 'current_sign_in_at'
        },
        currentSigninIP: {
            type: Sequelize.STRING,
            field: 'current_sign_in_ip'
        },
        lastSigninAt: {
            type: Sequelize.DATE(6),
            field: 'last_sign_in_at'
        },
        lastSigninIP: {
            type: Sequelize.STRING,
            field: 'last_sign_in_ip'
        },
        signinCount: {
            type: Sequelize.INTEGER,
            field: 'sign_in_count',
            defaultValue: 0
        },
        lockedAt: {
            type: Sequelize.DATE(6),
            field: 'locked_at'
        },
        disable: Sequelize.BOOLEAN,
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
                name: 'users_pk_index', 
                fields: ['id']
            },
            {
                name: 'users_unique_username_index',
                unique: true,
                fields: ['username']
            },
            {
                name: 'users_unique_email_index',
                unique: true,
                fields: ['email']
            }
        ]
    }
)

User.hasMany(Checkin, {foreignKey: 'user_id'})

export default User