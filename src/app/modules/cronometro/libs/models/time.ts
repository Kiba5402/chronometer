export class Time {

    public status :  number;

    constructor(
        public id: number,
        public title: string,
        public time: {
            hours: number,
            minutes: number,
            seconds: number,
        },
        estateSt : string
    ) { 
        this.setStatus = estateSt;
        this.setTime = time;
    };

    set setTime(time: { hours: number, minutes: number, seconds: number }) {
        if (time.seconds <= 59 && time.minutes <= 59 && time.hours <= 99) {
            this.time.hours = time.hours;
            this.time.minutes = time.minutes;
            this.time.seconds = time.seconds;
        } else {
            this.time.hours = 99;
            this.time.minutes = 59;
            this.time.seconds = 59;
        }
    }

    set setStatus(estado: string) {
        switch (estado) {
            case "active":
                this.status = 1;
                break;
            case "inactive":
                this.status = 0;
                break;
            case "waiting":
                this.status = -1;
                break;
            default:
                this.status = 0;
                break;
        }
    }

    get getStatus(): string {
        switch (this.status) {
            case 1:
                return "active";
                break;
            case 0:
                return "inactive";
                break;
            case -1:
                return "waiting";
                break;
            default:
                return "inactive";
                break;
        }
    }

}
