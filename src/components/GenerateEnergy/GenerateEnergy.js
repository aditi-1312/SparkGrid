import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Sun, Waves, Factory, Battery, CloudRain } from 'lucide-react';
import ReactApexChart from 'react-apexcharts';

const mockData = {
    // predictions: {
    //     Bioenergy: 4798.598876953125,
    //     Coal: 9844.68392753601,
    //     Gas: 4811.322234153748,
    //     Hydro: 2466.510558128357,
    //     Nuclear: 1548.1870422363281,
    //     "Other Fossil": 407.766508102417,
    //     "Other Renewables": 792.1717529296875,
    //     Solar: 2015.9663677215576,
    //     Wind: 3250.459104537964
    // },
    hourlyGeneration: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        solar: Math.sin(i * Math.PI / 12) * 400 + Math.random() * 50,
        wind: 200 + Math.random() * 150,
        hydro: 300 + Math.random() * 100,
        bioenergy: 150 + Math.random() * 50,
        coal: 600 + Math.random() * 100,
        gas: 500 + Math.random() * 80,
        nuclear: 700 + Math.random() * 50,
        otherFossils: 100 + Math.random() * 20,
        otherRenewables: 80 + Math.random() * 30,
    })),
    weather: {
        temperature: 28,
        windSpeed: 15,
        humidity: 65,
        cloudCover: 30,
    },
};

const WeatherGauge = ({ value, max, title, icon: Icon }) => (

    <div className="flex flex-col items-center p-4 bg-slate-800 rounded-lg">
        <Icon className="w-6 h-6 mb-2 text-blue-400" />
        <div className="text-lg font-semibold">{title}</div>
        <div className="w-full h-2 bg-slate-700 rounded-full mt-2">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-blue-500 rounded-full"
            />
        </div>
        <div className="mt-1 text-sm">{value}/{max}</div>
    </div>
);

const CircularProgress = ({ value, max, title, color }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <svg width="100" height="100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#1f2937"
                        strokeWidth="8"
                        fill="none"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1 }}
                        transform="rotate(-90 50 50)"
                    />
                    <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="0.3em"
                        className="text-xl font-bold"
                        fill="white"
                    >
                        {Math.round(percentage)}%
                    </text>
                </svg>
            </div>
            <div className="mt-2 text-center">{title}</div>
        </div>
    );
};

const WeatherImpactView = () => {
    const weatherImpactData = {
        solar: {
            efficiency: mockData.weather.cloudCover < 30 ? 95 : 65,
            impact: `${mockData.weather.cloudCover}% cloud cover reduces efficiency`,
            color: '#eab308', // Yellow for Solar
        },
        wind: {
            efficiency: mockData.weather.windSpeed > 10 ? 90 : 70,
            impact: `${mockData.weather.windSpeed} km/h wind speed affects generation`,
            color: '#3b82f6', // Blue for Wind
        },
        hydro: {
            efficiency: mockData.weather.humidity > 60 ? 85 : 75,
            impact: `${mockData.weather.humidity}% humidity influences water flow`,
            color: '#22d3ee', // Light Blue for Hydro
        },
        bioenergy: {
            efficiency: mockData.weather.temperature > 25 ? 88 : 78,
            impact: `${mockData.weather.temperature}°C temperature impacts biomass processing`,
            color: '#10b981', // Green for Bioenergy
        },
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Weather Impact Analysis</h2>

            {/* Weather Conditions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <WeatherGauge value={mockData.weather.temperature} max={50} title="Temperature" icon={Sun} color="#ef4444" />
                <WeatherGauge value={mockData.weather.windSpeed} max={30} title="Wind Speed" icon={Wind} color="#3b82f6" />
                <WeatherGauge value={mockData.weather.humidity} max={100} title="Humidity" icon={CloudRain} color="#22d3ee" />
                <WeatherGauge value={mockData.weather.cloudCover} max={100} title="Cloud Cover" icon={Battery} color="#eab308" />
            </div>

            {/* Weather Impact for Each Energy Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(weatherImpactData).map(([source, data]) => (
                    <div key={source} className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                        <h3 className="text-lg font-semibold capitalize mb-4 text-white">{source} Generation</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Current Efficiency</span>
                                <span className="font-bold text-lg text-white">{data.efficiency}%</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${data.efficiency}%` }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: data.color }} // Dynamic color based on weather impact
                                />
                            </div>
                            <p className="text-sm text-slate-400">{data.impact}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

const EfficiencyMetricsView = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Efficiency Metrics</h2>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CircularProgress value={85} max={100} title="Solar Efficiency" color="#eab308" />
                <CircularProgress value={78} max={100} title="Wind Efficiency" color="#3b82f6" />
                <CircularProgress value={92} max={100} title="Hydro Efficiency" color="#22c55e" />
                <CircularProgress value={65} max={100} title="Bio-Energy Efficiency" color="#ef4444" />
            </div>


            {/* Target Efficiency Comparison using Progress Bars */}
            <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Efficiency Target Comparison</h3>
                <div className="space-y-4">
                    {['Solar', 'Wind', 'Hydro', 'Bio-Energy'].map((source, index) => {
                        const targetEfficiency = [95, 85, 95, 80][index];
                        const currentEfficiency = [85, 78, 92, 65][index];
                        const progress = (currentEfficiency / targetEfficiency) * 100;

                        return (
                            <div key={source} className="space-y-2">
                                <div className="flex justify-between">
                                    <span>{source} Target</span>
                                    <span className="font-bold text-lg">{targetEfficiency}%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full">
                                    <div
                                        style={{ width: `${progress}%` }}
                                        className={`h-full ${progress >= 100 ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export const GenerateEnergy = () => {
    const [selectedView, setSelectedView] = useState('overview');

    const [predictions, setPredictions] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await fetch('https://127.0.0.1:5000/predict/range');
                if (!response.ok) {
                    throw new Error('Failed to fetch predictions');
                }
                const data = await response.json();
                if (data.success) {
                    setPredictions(data.predictions);
                    setDateRange(data.date_range);
                } else {
                    throw new Error('API returned unsuccessful response');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching predictions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPredictions();
    }, []);

    const renderPieChart = () => {
        if (isLoading) {
            return (
                <div className="bg-slate-800 p-6 rounded-lg flex items-center justify-center h-[300px]">
                    <div className="text-slate-400">Loading predictions...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-slate-800 p-6 rounded-lg flex items-center justify-center h-[300px]">
                    <div className="text-red-400">Error: {error}</div>
                </div>
            );
        }

        if (!predictions) {
            return (
                <div className="bg-slate-800 p-6 rounded-lg flex items-center justify-center h-[300px]">
                    <div className="text-slate-400">No prediction data available</div>
                </div>
            );
        }

        const pieChartSeries = [
            predictions.Bioenergy,
            predictions.Coal,
            predictions.Gas,
            predictions.Hydro,
            predictions.Nuclear,
            predictions["Other Fossil"],
            predictions["Other Renewables"],
            predictions.Solar,
            predictions.Wind
        ];

        return (
            <div className="bg-slate-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Total Generation Predictions</h2>
                <ReactApexChart
                    options={pieChartOptions}
                    series={pieChartSeries}
                    type="pie"
                    height={300}
                />
                {dateRange && (
                    <div className="mt-4 text-sm text-slate-400 text-center">
                        Predictions for period: {dateRange.start} to {dateRange.end}
                    </div>
                )}
            </div>
        );
    };

    const lineChartOptions = {
        chart: {
            id: 'hourly-generation',
            toolbar: { show: false },
            background: '#1e293b', // Solid background color (dark blue-gray)
        },
        xaxis: {
            categories: mockData.hourlyGeneration.map((d) => `${d.hour}:00`),
            labels: {
                style: {
                    colors: '#F5F5DC', // Beige color for x-axis labels
                    fontSize: '12px', // Optional: Customize font size
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#F5F5DC', // Beige color for y-axis labels
                    fontSize: '12px', // Optional: Customize font size
                },
            },
        },
        stroke: {
            curve: 'smooth',
        },
        colors: ['#f59e0b', '#3b82f6', '#22c55e', '#a855f7', '#ef4444', '#10b981', '#f97316', '#6366f1', '#14b8a6'], // Line colors
        legend: {
            position: 'top',
            labels: {
                colors: '#F5F5DC', // Beige color for legend labels
            },
        },
        tooltip: {
            theme: 'dark', // Dark theme for the tooltip
            style: {
                fontSize: '14px', // Optional: Customize tooltip font size
            },
            marker: {
                fillColors: ['#f59e0b', '#3b82f6', '#22c55e', '#a855f7', '#ef4444', '#10b981', '#f97316', '#6366f1', '#14b8a6'], // Marker colors
            },
            x: {
                format: 'HH:mm', // Format x-axis values in the tooltip
            },
            y: {
                formatter: (val) => `${val} MW`, // Format y-axis values with a suffix
            },
        },
        markers: {
            size: 5, // Marker size for data points
            hover: {
                size: 7, // Size of marker on hover
                fillColor: '#ffffff', // White fill color for hover marker
                strokeColor: '#000000', // Optional: Black stroke for hover marker
                strokeWidth: 2, // Stroke width for hover marker
            },
        },
    };


    const lineChartSeries = [
        { name: 'Solar', data: mockData.hourlyGeneration.map((d) => d.solar) },
        { name: 'Wind', data: mockData.hourlyGeneration.map((d) => d.wind) },
        { name: 'Hydro', data: mockData.hourlyGeneration.map((d) => d.hydro) },
        { name: 'Bioenergy', data: mockData.hourlyGeneration.map((d) => d.bioenergy) },
        { name: 'Coal', data: mockData.hourlyGeneration.map((d) => d.coal) },
        { name: 'Gas', data: mockData.hourlyGeneration.map((d) => d.gas) },
        { name: 'Nuclear', data: mockData.hourlyGeneration.map((d) => d.nuclear) },
        { name: 'Other Fossils', data: mockData.hourlyGeneration.map((d) => d.otherFossils) },
        { name: 'Other Renewables', data: mockData.hourlyGeneration.map((d) => d.otherRenewables) },
    ];



    const renderSelectedView = () => {
        switch (selectedView) {
            case 'weather':
                return <WeatherImpactView />;
            case 'efficiency':
                return <EfficiencyMetricsView />;
            default:
                return (
                    <>
                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Total Generation</h2>
                            {renderPieChart()}
                        </div>

                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Hourly Generation</h2>
                            <ReactApexChart
                                options={lineChartOptions}
                                series={lineChartSeries}
                                type="line"
                                height={300}
                            />
                        </div>
                    </>
                );
        }
    };


    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-6" >
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Power Generation Dashboard
                    </h1>
                    <select
                        value={selectedView}
                        onChange={(e) => setSelectedView(e.target.value)}
                        className="bg-slate-800 text-slate-100 p-2 rounded-lg border border-slate-700"
                    >
                        <option value="overview">Overview</option>
                        <option value="weather">Weather Impact</option>
                        <option value="efficiency">Efficiency Metrics</option>
                    </select>
                </div>

                {renderSelectedView()}

                {/* Pie Chart */}
                {/* <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Total Generation</h2>
                    <ReactApexChart
                        options={pieChartOptions}
                        series={pieChartSeries}
                        type="pie"
                        height={300}
                    />
                </div> */}

            </div>
            <div className="max-w-7xl mx-auto space-y-8">



                {/* Hourly Generation */}
                {/* <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Hourly Generation</h2>
                    <HourlyBarChart data={mockData.hourlyGeneration} />
                </div> */}
                {/* Line Chart */}
                {/* <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Hourly Generation</h2>
                    <ReactApexChart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        height={300}
                    />
                </div> */}

                {/* Plant Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
                    {['Solar', 'Wind', 'Hydro', 'Bio-Energy'].map((plant, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-800 p-6 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">{plant} Plant</h3>
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span>Current Output</span>
                                    <span className="font-semibold">{Math.floor(Math.random() * 500 + 500)} MW</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Efficiency</span>
                                    <span className="font-semibold">{Math.floor(Math.random() * 20 + 80)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Status</span>
                                    <span className="text-green-400">Operational</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default GenerateEnergy;