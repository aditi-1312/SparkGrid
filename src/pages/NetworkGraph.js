import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';

const NetworkGraph = ({ powerPlants }) => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  const isHydroPowerPlant = (type) => {
    return type.toLowerCase().includes('hydro');
  };

  const createOptimizedEdges = (nodes) => {
    const edges = [];
    const connected = new Set();

    // Ensure each node has at least 2 connections
    nodes.forEach((_, nodeIndex) => {
      let connections = 0;
      const possibleConnections = [];

      // Find all possible connections for this node
      nodes.forEach((_, targetIndex) => {
        if (nodeIndex !== targetIndex) {
          possibleConnections.push(targetIndex);
        }
      });

      // Shuffle possible connections to randomize the selection
      for (let i = possibleConnections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [possibleConnections[i], possibleConnections[j]] = [possibleConnections[j], possibleConnections[i]];
      }

      // Add edges until we have at least 2 connections
      possibleConnections.forEach(targetIndex => {
        if (connections < 2) {
          const edgeKey1 = `${nodeIndex}-${targetIndex}`;
          const edgeKey2 = `${targetIndex}-${nodeIndex}`;

          if (!connected.has(edgeKey1) && !connected.has(edgeKey2)) {
            edges.push({
              from: nodeIndex,
              to: targetIndex,
              color: {
                color: '#7FFF00',
                highlight: '#32CD32',
                hover: '#32CD32',
                opacity: 0.8
              },
              width: 3,
              length: 250,
              arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
              }
            });
            connected.add(edgeKey1);
            connected.add(edgeKey2);
            connections++;
          }
        }
      });
    });

    return edges;
  };

  useEffect(() => {
    if (!powerPlants?.length) return;

    // Process nodes with enhanced coloring
    const nodes = powerPlants.map((plant, index) => ({
      id: index,
      label: plant[0],
      title: `${plant[0]}\nCity: ${plant[1]}\nPower: ${plant[4]}MW`,
      color: {
        background: isHydroPowerPlant(plant[2]) ? '#3B4CCA' : '#33DFFF',
        border: '#ffffff',
        highlight: {
          background: isHydroPowerPlant(plant[2]) ? '#4A5FE8' : '#66EBFF',
          border: '#ffffff'
        },
        hover: {
          background: isHydroPowerPlant(plant[2]) ? '#2D31AC' : '#0FD3FF',
          border: '#ffffff'
        }
      },
      size: Math.sqrt(Number(plant[4])) + 15,
      font: {
        color: '#FFFFFF',
        size: 16,
        face: 'Arial',
        strokeWidth: 2,
        strokeColor: '#000000'
      },
    }));

    const edges = createOptimizedEdges(nodes);
    setGraph({ nodes, edges });
  }, [powerPlants]);

  const options = {
    nodes: {
      shape: 'dot',
      scaling: {
        min: 15,
        max: 45,
      },
      font: {
        size: 16,
        face: 'Arial',
        strokeWidth: 2,
        strokeColor: '#000000'
      },
      borderWidth: 2,
      shadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.6)',
        size: 10,
        x: 5,
        y: 5
      }
    },
    edges: {
      background: {
        enabled: true,
        color: '#ffffff'
      },
      width: 3,
      smooth: {
        type: 'dynamic',
        forceDirection: 'none',
        roundness: 0.5
      },
      shadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.3)',
        size: 10,
        x: 5,
        y: 5
      }
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 200,
        fit: true
      },
      barnesHut: {
        gravitationalConstant: -3000,
        centralGravity: 0.3,
        springLength: 200,
        springConstant: 0.05,
        damping: 0.09,
      },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      zoomView: true,
      dragView: true,
      dragNodes: true,
    },
    height: '600px',
    background: 'transparent',
  };

  const events = {
    select: function (event) {
      const { nodes, edges } = event;
    },
  };

  return (
    <div className="w-full border border-gray-700 rounded-lg overflow-hidden bg-opacity-50">
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    </div>
  );
};

export default NetworkGraph;