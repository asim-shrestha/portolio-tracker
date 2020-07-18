import { Model } from 'objection';
import knex from '../db/knex';

Model.knex(knex)

export default class User extends Model {
    
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
		return {
			type: 'object',
			required: ['username', 'password'],
			properties: {
                id: { type: 'integer', minLength: 1 },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255},
                first_name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                phone: { type: 'string', minLength: 1, maxLength: 255 },
			}
		};
	}
}
