// ... (import statements)

export default function Forecast(props: { data: IForecastProps[] }) {
    if (!props.data?.length) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {props.data.map(({ list }: IForecastProps, index: number) => {

                const listArray = Object.values(list);
                const sixDaysForecast = [0, 7, 15, 23, 31, 39];

                return (
                    <div key={index} style={{ margin: '15px' }} className="flex flex-col gap-10 w-full lg:w-auto">
                        {/* tomorrow's forecast */}
                        <h1 className="text-2xl">Tomorrow's Forecast</h1>
                        <div className="flex flex-col gap-10 items-center lg:flex lg:flex-row">
                            {listArray.slice(0, 7).map((tmw, innerIndex) => (
                                <div key={innerIndex} className="bg-white bg-opacity-50 p-10 rounded-2xl shadow-md">
                                    <div className="text-2xl">{tmw.main.temp.toFixed(0)}°</div>
                                    <div>{tmw.weather[0].main}</div>
                                    <div>{new Date(tmw.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })}</div>
                                </div>
                            ))}
                        </div>
                        {/* 6 days */}
                        <div className="flex flex-col gap-10">
                        <h1 className="text-2xl">6-Day Forecast</h1>
                            {sixDaysForecast.map((day, innerIndex) => {

                                const timestamp = new Date(list[day].dt * 1000);
                                const date = timestamp.toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
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

                                const weatherIconCode = list[day].weather[0].icon;
                                const weatherIcon = weatherIconMapping[weatherIconCode];

                                return (
                                    <div key={innerIndex} className="flex flex-col gap-5 items-center justify-center bg-white bg-opacity-50 p-7 rounded-2xl shadow-md h-full lg:flex lg:flex-row lg:gap-10 lg:justify-between lg:px-10">
                                        <img
                                            src={`/images/${weatherIcon}.png`}
                                            alt="Weather Icon"
                                            width={100}
                                            height={100}
                                        />
                                        <div className="text-3xl">{list[day].main.temp.toFixed(1)}°</div>
                                        <div>{list[day].weather[0].main}</div>
                                        <div>{list[day].weather[0].description}</div>
                                        <div>{list[day].wind.speed} km/h</div>
                                        <div>{date}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
