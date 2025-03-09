import React, { useState } from 'react';
import { ethers } from 'ethers';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import NetworkGraph from './NetworkGraph';



const EthereumVis = () => {
    const [powerPlantForm, setPowerPlantForm] = useState({
        plantName: '',
        city: '',
        plantType: '',
        year: '',
        powerGenerated: ''
    });

    const [consumerForm, setConsumerForm] = useState({
        name: '',
        year: '',
        energyConsumption: ''
    });

    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_year",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_energyConsumption",
                    "type": "uint256"
                }
            ],
            "name": "addConsumer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_plantName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_city",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_plantType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_year",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_powerGenerated",
                    "type": "uint256"
                }
            ],
            "name": "addPowerPlant",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "energyConsumption",
                    "type": "uint256"
                }
            ],
            "name": "ConsumerAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "plantName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "city",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "plantType",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "powerGenerated",
                    "type": "uint256"
                }
            ],
            "name": "PowerPlantAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "consumers",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "energyConsumption",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalConsumers",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTotalPowerPlants",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "listAll",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "plantName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "city",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "plantType",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "year",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "powerGenerated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct PowerPlantConsumerRegistry.PowerPlant[]",
                    "name": "",
                    "type": "tuple[]"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "year",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "energyConsumption",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct PowerPlantConsumerRegistry.Consumer[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "powerPlants",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "plantName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "city",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "plantType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "year",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "powerGenerated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = "0xc1a7bb8a8c4c22a9f39fee2594addf4dc27e9b19"; // Replace with your deployed contract address
    const [graphData, setGraphData] = useState({ powerPlants: [], consumers: [] });
    const viewAll = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABI, provider);
                const [plants, consumers] = await contract.listAll();

                setGraphData({
                    powerPlants: plants,
                    consumers: consumers
                });
                console.log("Power Plants:", plants);
                console.log("Consumers:", consumers);
            } else {
                console.log("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addPowerPlant = async (e) => {
        e.preventDefault();
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const tx = await contract.addPowerPlant(
                    powerPlantForm.plantName,
                    powerPlantForm.city,
                    powerPlantForm.plantType,
                    BigInt(powerPlantForm.year),
                    BigInt(powerPlantForm.powerGenerated)
                );
                await tx.wait();
                alert("Power Plant added successfully!");
                setPowerPlantForm({
                    plantName: '',
                    city: '',
                    plantType: '',
                    year: '',
                    powerGenerated: ''
                });
            } else {
                alert("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding power plant: " + error.message);
        }
    };

    const addConsumer = async (e) => {
        e.preventDefault();
        try {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const tx = await contract.addConsumer(
                    consumerForm.name,
                    BigInt(consumerForm.year),
                    BigInt(consumerForm.energyConsumption)
                );
                await tx.wait();
                alert("Consumer added successfully!");
                setConsumerForm({
                    name: '',
                    year: '',
                    energyConsumption: ''
                });
            } else {
                alert("Please install MetaMask!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding consumer: " + error.message);
        }
    };

    const handlePowerPlantChange = (e) => {
        setPowerPlantForm({ ...powerPlantForm, [e.target.name]: e.target.value });
    };

    const handleConsumerChange = (e) => {
        setConsumerForm({ ...consumerForm, [e.target.name]: e.target.value });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div className=" p-7 gap-10 flex">
                <div className="w-96 p-4 rounded bg-black bg-opacity-50 border border-gray-700">
                    <div className="mb-4">
                        <h1 className="text-xl text-white font-bold">Power Plant & Consumer Registry</h1>
                        <button onClick={viewAll} className="mt-2 bg-[#2D31AC]  hover:bg-blue-900 text-white px-3 py-1 text-sm rounded">
                            View All Data
                        </button>
                    </div>

                    {/* Power Plant Form */}
                    <div className="mb-4">
                        <h3 className="text-white font-semibold mb-2">Add Power Plant</h3>
                        <form className="space-y-2">
                            <input
                                type="text"
                                name="plantName"
                                placeholder="Plant Name"
                                value={powerPlantForm.plantName}
                                onChange={handlePowerPlantChange}
                                className="w-full p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={powerPlantForm.city}
                                    onChange={handlePowerPlantChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                                <input
                                    type="text"
                                    name="plantType"
                                    placeholder="Type"
                                    value={powerPlantForm.plantType}
                                    onChange={handlePowerPlantChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    value={powerPlantForm.year}
                                    onChange={handlePowerPlantChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                                <input
                                    type="number"
                                    name="powerGenerated"
                                    placeholder="Power Generated"
                                    value={powerPlantForm.powerGenerated}
                                    onChange={handlePowerPlantChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                            </div>
                            <button
                                onClick={(e) => {addPowerPlant(e);}}
                                className="w-full bg-[#2D31AC] font-semibold	  text-white px-3 py-1.5 rounded text-sm"
                            >
                                Add Power Plant
                            </button>
                        </form>
                    </div>

                    {/* Consumer Form */}
                    <div>
                        <h3 className="text-white font-semibold mb-2">Add Consumer</h3>
                        <form className="space-y-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Consumer Name"
                                value={consumerForm.name}
                                onChange={handleConsumerChange}
                                className="w-full p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="year"
                                    placeholder="Year"
                                    value={consumerForm.year}
                                    onChange={handleConsumerChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                                <input
                                    type="number"
                                    name="energyConsumption"
                                    placeholder="Energy Consumption"
                                    value={consumerForm.energyConsumption}
                                    onChange={handleConsumerChange}
                                    className="flex-1 p-1.5 text-sm bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                                />
                            </div>
                            <button
                                onClick={(e) => {addConsumer(e)}}
                                className="w-full bg-[#2D31AC] font-semibold  text-white px-3 py-1.5 rounded text-sm"
                            >
                                Add Consumer
                            </button>
                        </form>
                    </div>
                </div>

                {/* Space for graph */}
                <div className="flex-1">
                    <NetworkGraph
                        powerPlants={graphData.powerPlants}
                        consumers={graphData.consumers}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default EthereumVis
