const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    create(data) {
        const newUser = UserRepository.create(data);
        return newUser;
    }

    getAll() {
        const all = UserRepository.getAll();
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
        let updated = UserRepository.update(id, data);
        return updated;
    }

    delete(id) {
        let deleted = UserRepository.delete(id);
        return deleted;
    }

    getByName(name) {
        let found = this.search({name: name});
        return found;
    }

    getByEmail(email) {
        let found = this.search({email: email});
        return found;
    }

    getByPhoneNumber(phoneNumber) {
        let found = this.search({phoneNumber: phoneNumber});
        return found;
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();