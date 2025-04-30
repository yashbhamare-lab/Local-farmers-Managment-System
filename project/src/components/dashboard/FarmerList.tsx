import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

const FarmerList: React.FC = () => {
  const { farmers } = useAppContext();

  return (
    <Card title="Recent Farmers">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farm Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.slice(0, 5).map((farmer) => (
              <tr key={farmer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={farmer.image} alt={farmer.name} />
                    </div>
                    <div className="ml-4">
                      <Link to={`/farmers/${farmer.id}`} className="text-sm font-medium text-gray-900 hover:text-green-700">
                        {farmer.name}
                      </Link>
                      <div className="text-sm text-gray-500">{farmer.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {farmer.farmSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant={farmer.status === 'active' ? 'success' : 'danger'}
                  >
                    {farmer.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(farmer.joinedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {farmers.length > 5 && (
          <div className="px-6 py-4 border-t border-gray-100">
            <Link to="/farmers" className="text-sm font-medium text-green-700 hover:text-green-800">
              View all farmers
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FarmerList;