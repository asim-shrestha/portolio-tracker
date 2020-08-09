import { Model } from 'objection';
import knex from '../db/knex';

Model.knex(knex);

export default class Symbol extends Model {

    static get tableName() {
        return 'symbols';
    }

    // resolve malformed array: https://github.com/Vincit/objection.js/issues/52
    static get jsonAttributes() {
        return [];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['date', 'symbols'],
            properties: {
                id: { type: 'integer', minLength: 1 },
                date: { type: 'date', minLength: 8, maxLength: 10 },
                symbols: {
                    type: 'array',
                    items: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 20
                    }
                },
            }
        };
    }
}
