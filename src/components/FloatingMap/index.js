import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import "./FloatingMap.css";
import IndiaMap from "./IndiaMap";
import * as XLSX from 'xlsx';
const FloatingMap = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [stateName, setStateName] = useState("");
    const toggleWindow = () => {
        setIsOpen(!isOpen);
    };

    const openWindow = () => {
        setIsOpen(true);
    };

    const ExcelDownload = (jsonData, fileName = 'predictions.xlsx') => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, fileName);
      };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === "startDate") {
            setStartDate(value);
        } else if (name === "endDate") {
            setEndDate(value);
        }
    };

    const handlePredict = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        console.log(`${process.env.ML_BACKEND_URL}/predict/range`);
        console.log(startDate);
        console.log(endDate);
        try {
            const response = await fetch(`http://127.0.0.1:5001/predict/range`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start_date: startDate,
                    end_date: endDate,
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(data.predictions);
                ExcelDownload(data.predictions);
            } else {
                alert("Failed to fetch prediction. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while predicting.");
        }
    };

    return (
        <div
            className={`floating-window ${isOpen ? "open" : ""}`}
            onClick={!isOpen ? openWindow : () => {}}
        >
            <div>
                {isOpen ? (
                    <div className="flex">
                        <button
                            onClick={toggleWindow}
                            className="fixed top-[5rem] left-[10rem] flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-700 backdrop-blur-sm border border-slate-700 shadow-lg transition-all duration-200 hover:scale-105 group z-50"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-200 group-hover:text-white transition-colors" />
                        </button>
                        <div className="content flex">
                            <div className="w-1/2">
                                <IndiaMap enabled={true} setStateName={setStateName}/>
                            </div>
                        </div>
                        <div className="absolute top-[10%] right-[10%] p-6 bg-white shadow-lg rounded-md w-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Predict Demand and Generation Needed
                            </h2>
                            <form className="space-y-4" onSubmit={handlePredict}>
                                <div>
                                    <label
                                        htmlFor="startDate"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={startDate}
                                        onChange={handleDateChange}
                                        className="w-full text-black mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="endDate"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={endDate}
                                        onChange={handleDateChange}
                                        className="w-full mt-1 px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600 predict-button"
                                >
                                    Predict & Download
                                </button>
                            </form>
                            <div className="text-black">Selected State: {stateName}</div>
                            {prediction && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Energy Required: {prediction.energyRequired}
                                    </h3>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        Energy Generation Through:
                                    </h4>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        <li>Solar Energy: {prediction.solarEnergy}</li>
                                        <li>Wind Energy: {prediction.windEnergy}</li>
                                        <li>Hydro Energy: {prediction.hydroEnergy}</li>
                                        <li>Coal Energy: {prediction.coalEnergy}</li>
                                    </ul>
                                </div>
                            )}
                            
                        </div>

                    </div>
                ) : (
                    <IndiaMap enabled={false} />
                )}
            </div>
        </div>
    );
};

export default FloatingMap;