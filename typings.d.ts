interface ICurrentProps {
    dt: string
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
        }
    };
    wind: {
        speed: number;
    }
}

interface IForecastProps {
    list: {
        [key: number]: {
            main: {
                temp: number;
            }
            weather: {
                0: {
                    main: string
                    description: string
                }
            }
            wind: {
                speed: number;
            }
            dt_txt: string;
        }
    }
}