class ResourceManager {

    constructor() {

    }


    use(resource, amount) {
        if(resources[resource].amount >= amount) {
            resources[resource].amount -= amount;
            return true;
        } else {    // not enough resources and got here by mistake
            return false;
        }
    }

    add(resource, amount) {
        resources[resource].amount += amount;
        
        saveList("resources", true);
    }
}