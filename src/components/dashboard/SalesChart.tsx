'use client';

import { FaCircle } from 'react-icons/fa';

const data = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6000 },
  { name: 'Jun', ventas: 5500 },
  { name: 'Jul', ventas: 7000 }
];

export function SalesChart() {
  const maxVentas = Math.max(...data.map((d) => d.ventas)); // Máximo valor para normalizar
  const chartHeight = 300; // Altura del SVG
  const chartWidth = 600; // Ancho del SVG
  const padding = 50; // Espaciado para los ejes

  const normalizeY = (value: number) => (chartHeight - padding) * (value / maxVentas) + padding / 2;

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Ventas Mensuales</h2>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-3xl">
        {/* Grid horizontal */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={padding}
            x2={chartWidth - padding}
            y1={normalizeY((maxVentas / 5) * i)}
            y2={normalizeY((maxVentas / 5) * i)}
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />
        ))}

        {/* Grid vertical */}
        {data.map((_, i) => (
          <line
            key={i}
            x1={padding + (i * (chartWidth - 2 * padding)) / (data.length - 1)}
            x2={padding + (i * (chartWidth - 2 * padding)) / (data.length - 1)}
            y1={padding / 2}
            y2={chartHeight - padding / 2}
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />
        ))}

        {/* Ejes */}
        <line x1={padding} x2={padding} y1={padding / 2} y2={chartHeight - padding / 2} stroke="#374151" />
        <line
          x1={padding}
          x2={chartWidth - padding}
          y1={chartHeight - padding / 2}
          y2={chartHeight - padding / 2}
          stroke="#374151"
        />

        {/* Etiquetas Y */}
        {Array.from({ length: 5 }).map((_, i) => (
          <text key={i} x={padding - 10} y={normalizeY((maxVentas / 5) * i)} textAnchor="end" fontSize="10" fill="#374151">
            {(maxVentas / 5) * i}
          </text>
        ))}

        {/* Etiquetas X */}
        {data.map((d, i) => (
          <text
            key={d.name}
            x={padding + (i * (chartWidth - 2 * padding)) / (data.length - 1)}
            y={chartHeight - padding / 4}
            textAnchor="middle"
            fontSize="10"
            fill="#374151"
          >
            {d.name}
          </text>
        ))}

        {/* Línea del gráfico */}
        <polyline
          fill="none"
          stroke="#8884d8"
          strokeWidth="2"
          points={data
            .map((d, i) => `${padding + (i * (chartWidth - 2 * padding)) / (data.length - 1)},${normalizeY(d.ventas)}`)
            .join(' ')}
        />

        {/* Puntos del gráfico */}
        {data.map((d, i) => (
          <circle
            key={d.name}
            cx={padding + (i * (chartWidth - 2 * padding)) / (data.length - 1)}
            cy={normalizeY(d.ventas)}
            r="4"
            fill="#8884d8"
          />
        ))}
      </svg>

      {/* Leyenda */}
      <div className="flex items-center gap-2 mt-4">
        <FaCircle className="text-purple-500" />
        <span className="text-sm text-gray-600">Ventas</span>
      </div>
    </div>
  );
}
