const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters

    create(data) {
        const newUser = FighterRepository.create(data);
        return newUser;
    }

    getAll() {
        const all = FighterRepository.getAll();
        if(!all) {
            return null;
        }
        return all;
    }

    getById(id) {
        let found = this.search({id: id});
        return found;
    }

    update(id, data) {
        let updated = FighterRepository.update(id, data);
        return updated;
    }

    delete(id) {
        let deleted = FighterRepository.delete(id);
        return deleted;
    }

    getByName(name) {
        let found = this.search({name: name});
        return found;
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();