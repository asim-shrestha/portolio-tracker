import { Model } from 'objection';
import knex from '../db/knex';

Model.knex(knex)

export default class Company extends Model {
    
    static get tableName() {
        return 'companies';
    }

    static get jsonSchema() {
		return {
			type: 'object',
			required: ['symbol', 'industry', 'sector', 'country'],
			properties: {
                id: { type: 'integer', minLength: 1 },
                symbol: { type: 'string', minLength: 1, maxLength: 20 },
                industry: { type: 'string', minLength: 1, maxLength: 255 },
                sector: { type: 'string', minLength: 1, maxLength: 255 },
                country: { type: 'string', minLength: 1, maxLength: 255 },
            }
		}
	}
}
