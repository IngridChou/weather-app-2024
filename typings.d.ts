interface ICurrentProps {
    dt: any
    name: string
    sys: {
        country: string
    }
    date: string;
    main: {
        temp: number;
        feels_like: number;
    }
    weather: {
        0: {
            main: string
            icon: string
        }
    };
    wind: {
        speed: number;
    }
}

interface IForecastProps {
    list: {
        [key: number]: {
            dt: any
            main: {
                temp: number;
            }
            weather: {
                0: {
                    main: string
                    description: string
                    icon: string
                }
            }
            wind: {
                speed: number;
            }
            dt_txt: string;
        }
    }
}
