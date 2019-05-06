
class Grade {
    constructor() {
        this.gradetable = [];
    }

    create(grade) {
        this.gradetable.push(grade);
        return true;
    }

    read() {
        return this.gradetable;
        /*[{"id":1,"name":"Hlina Beyene","course":"cs572","grade":99},
        {"id":2,"name":"Solomie Nigus","course":"cs572","grade":94},
        {"id":3,"name":"Abeba Ibrahim","course":"cs572","grade":92}] */
    }

    update(grade) {
        if(grade.id) {
            for(let i=0; i<this.gradetable.length; i++){
                if(this.gradetable[i].id === grade.id) {
                    this.gradetable[i] = grade;
                    break;
                }
            }
            return true;
        }else return false;
    }

    delete(id) {
        if(id) {
            for(let i=0; i<this.gradetable.length; i++){
                if(this.gradetable[i].id === id) {
                    let data = [];
                    for(let j=0; j<this.gradetable.length; j++){
                        if(j !== i){
                            data.push(this.gradetable[j]);
                        }
                    }
                    this.gradetable = data;
                    return true;
                }
            }
        }else return false;
    }
}

module.exports = new Grade();