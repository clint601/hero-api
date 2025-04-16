const con = require('../../config/dbconfig')

const powerDao = {
    table: 'power',
    ...require('../daoCommon'),
    findHeroesByPower: (res, table, power)=> {
        con.query(
            `select h.hero_id, h.hero_name, h.first_name, 
            h.last_name, h.alias, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
            from hero h
            join franchise f using (franchise_id)
            join species s using (species_id)
            join hero_to_power hp on h.hero_id = hp.hero_id
            join power p on hp.power_id = p.power_id
            where p.power = '${power}'
            order by h.hero_id;`,
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`DAO ERROR: ${table}`, error)
                }
            }
        )
    }
}

module.exports = powerDao