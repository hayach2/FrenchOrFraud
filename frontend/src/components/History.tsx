import React, { useEffect, useState } from 'react';
import { getHistory } from '../requests';

interface HistoryEntry {
  status: boolean;
  createdAt: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  useEffect(() => {getHistory().then(data => setHistory(data));}, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">History</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-300 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="py-2 px-4 bg-gray-300 text-left text-sm font-medium text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
              {history.map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                  {entry.status == true ? <td className="py-2 px-4 text-sm text-green-900">Won</td> :
                   <td className="py-2 px-4 text-sm text-red-900">Lost</td> }
                  <td className="py-2 px-4 text-sm text-gray-900">{new Date(entry.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
