import { Model } from 'objection';
import knex from '../db/knex';
import Activity from './ActivityModel'

Model.knex(knex)

export default class User extends Model {
    
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
		return {
			activity: {
				relation: Model.BelongsToOneRelation,
				modelClass: Activity,
				join: {
					from: 'activities.user_id',
					to: 'users.id'
				}
			}
		}
	}

    static get jsonSchema() {
		return {
			type: 'object',
			required: ['email', 'password'],
			properties: {
                id: { type: 'integer', minLength: 1 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255},
                first_name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
			}
		};
	}
}
