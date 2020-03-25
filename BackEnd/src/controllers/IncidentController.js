const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;//paginação

        const [ count ] = await connection('incidents')
          .count();

        const incidents = await connection('incidents')//paginação
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .limit(5)//paginação
          .offset((page - 1) * 5)//paginação
          .select([
            'incidents.*',
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);//paginação
        
        response.header('X-Total-Count', count['count(*)']);//retorna o total de itens de incidentes para o header

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });

    return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incidents.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not premitted.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};