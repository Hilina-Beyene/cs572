class University {
    name: string;
    dept: string;

    constructor(name: string, dept: string) {
        this.name = name;
        this.dept = dept;
    }

    graduation(year: number) {
        console.log(`Graduating from ${this.name} ${this.dept} department in year ${year} students`);
    }

}

let mum = new University("MUM", "Computer science");
mum.graduation(2019);