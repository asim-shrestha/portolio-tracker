import { Model } from 'objection';
import knex from '../db/knex';
import User from './UserModel'

Model.knex(knex)

export default class Activity extends Model {
    
    static get tableName() {
        return 'activities';
    }

    static get relationMappings() {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'users.id',
					to: 'activities.user_id'
				}
			}
		}
	}

    static get jsonSchema() {
		return {
			type: 'object',
			required: ['date', 'price', 'commission', 'quantity', 'action', 'symbol'],
			properties: {
                date: { type: 'date', minLength: 8, minLength: 10 },
                price: { type: 'decimal', minLength: 3, maxLength: 16 },
                commission: { type: 'decimal', minLength: 3, maxLength: 16 },
                quantity: { type: 'integer', minLength: 1, maxLength: 10 },
                symbol: { type: 'string', minLength: 1, maxLength: 255 },
			}
		};
	}
}
