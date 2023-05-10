class User{
    private id?: number;
    name: string;
    surname: string;

    constructor(name: string, surname: string){
        this.name = name;
        this.surname = surname;
    }

    /**
     * 
     * @param id leave undefined to generate a random id
     */
    setId(id?: number){
        if(this.id != null){
            return false;
        }
        if(id == undefined){
            this.id = Math.floor(Math.random()*100000);
        }else{
            this.id = id;
        }
        return true;
    }

    getId(){
        if(this.id == null){
            this.setId();
        }
        return this.id;
    }

    callName(){
        return this.name + " " + this.surname;
    }
}

export class Guest extends User{

    birthday: Date;
    email: string;
    phonenumber: string;
    sport_def?: string;
    team: number;
    gender: string;
    allergie?: string;

    // in case underage
    parent_name?: string;
    parent_surname?: string;
    parent_phonenumber?: string;

    constructor(name: string, surname: string, birthday: Date, email: string, team: number, phonenumber: string, gender: string, sport_def?: string, allergie?: string){
        super(name, surname);

        this.birthday = birthday;
        this.email = email;
        this.phonenumber = phonenumber;
        this.team = team;
        this.gender = gender;

        this.allergie = allergie;

        if(sport_def != undefined && sport_def != null){
            this.sport_def = sport_def;
        }
    }

    /**
     * 
     * @param p_name parent's name
     * @param p_surname parent's surname
     * @param p_pn parent's phone number
     */
    setParent(p_name?: string, p_surname?: string, p_pn?: string){
        this.parent_name = p_name;
        this.parent_surname = p_surname;
        this.parent_phonenumber = p_pn;
    }

    getAge(){
        let now = Date.now();
        return Math.floor((- this.birthday + now)/(1000 * 60 * 60 * 24 * 365));
    }
}