import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/dashboard/StatCard';
import FarmerList from '../components/dashboard/FarmerList';
import RecentActivities from '../components/dashboard/RecentActivities';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import FinancialSummary from '../components/dashboard/FinancialSummary';
import { useAppContext } from '../context/AppContext';
import { Users, Wheat, ClipboardList, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { farmers, crops, livestock, transactions } = useAppContext();

  const activeFarmers = farmers.filter(f => f.status === 'active').length;
  const totalCrops = crops.length;
  const totalLivestock = livestock.reduce((total, item) => total + item.quantity, 0);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the FarmTrack management system!</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Active Farmers"
          value={activeFarmers}
          icon={<Users size={24} />}
          change={{ value: '12', isPositive: true }}
        />
        <StatCard
          title="Total Crops"
          value={totalCrops}
          icon={<Wheat size={24} />}
          change={{ value: '8', isPositive: true }}
        />
        <StatCard
          title="Livestock Count"
          value={totalLivestock}
          icon={<ClipboardList size={24} />}
          change={{ value: '5', isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          change={{ value: '15', isPositive: true }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <FarmerList />
            <FinancialSummary />
          </div>
        </div>
        <div className="space-y-6">
          <UpcomingEvents />
          <RecentActivities />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;