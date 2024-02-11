

export default function Container(
    props: { data: ICurrentProps[] }
) {
    if (!props.data?.length) {
        return (
            <div className="flex flex-col gap-5 items-center justify-center md:items-start lg:flex lg:flex-row lg:gap-0">
                <h1 className="text-2xl">When you don't know the weather, Ask HER!</h1>
                <ul className="flex flex-col items-start justify-center lg:text-xl">
                    <li>1. Enter a location</li>
                    <li>2. Find the City's Current Weather, Tomorrow's Forecast, and 6-Day Forecast</li>
                </ul>
            </div>
        )
    }
    return (
        <>
            {
                // .map((a, index) => {})
                props.data && props.data.map(({
                    name,
                    sys,
                    dt,
                    main,
                    weather,
                    wind
                }: ICurrentProps, index: number) => {

                    const timestamp = new Date(dt * 1000);
                    const date = timestamp.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })

                    const weatherIconMapping: { [key: string]: string } = {
                        '01d': 'clear-day',
                        '01n': 'clear-night',
                        '02d': 'few-clouds-day',
                        '02n': 'few-clouds-night',
                        '03d': 'scattered',
                        '03n': 'scattered',
                        '04d': 'broken',
                        '04n': 'broken',
                        '09d': 'shower-rain-day',
                        '09n': 'shower-rain-night',
                        '10d': 'rain',
                        '10n': 'rain',
                        '11d': 'thunderstorm',
                        '11n': 'thunderstorm',
                        '13d': 'snow',
                        '13n': 'snow',
                        '50d': 'mist',
                        '50n': 'mist'
                      };

                      const weatherIconCode = weather[0].icon;
                      const weatherIcon = weatherIconMapping[weatherIconCode]

                    return (
                        <div key={index} style={{ margin: '15px' }} className="flex flex-col items-center justify-between w-full h-full bg-white bg-opacity-50 p-5 rounded-2xl shadow-md gap-5 lg:flex lg:flex-row lg:gap-0">
                            <div className="flex flex-col gap-3 items-center lg:items-start">
                                <div className="text-2xl">{name}</div>
                                <div>{sys.country}</div>
                                <div className="text-white">Last Updated: {date}</div>
                            </div>
                            <div className="flex flex-col gap-10 lg:flex-row">
                            <img
                                src={`/images/${weatherIcon}.png`}
                                alt="Weather Icon"
                                width={150} 
                                height={150}
                            />
                            <div className="flex flex-col gap-3 items-center lg:items-start">
                                <div className="text-2xl">{main.temp.toFixed(0)}°</div>
                                <div>{weather[0].main}</div>
                                <div>{wind.speed} km/h</div>
                            </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
