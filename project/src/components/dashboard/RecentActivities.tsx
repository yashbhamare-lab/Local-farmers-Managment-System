import React from 'react';
import Card from '../ui/Card';
import { CalendarEvent, Notification } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { CalendarDays } from 'lucide-react';

const RecentActivities: React.FC = () => {
  const { calendarEvents, notifications, farmers } = useAppContext();

  const getRecentActivities = () => {
    const events = calendarEvents.map(event => ({
      ...event,
      type: 'event',
      date: new Date(event.date),
    }));

    const notifs = notifications.map(notification => ({
      ...notification,
      type: 'notification',
      date: new Date(notification.date),
    }));

    return [...events, ...notifs]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  };

  const activities = getRecentActivities();

  const getFarmerName = (farmerId: string) => {
    const farmer = farmers.find(f => f.id === farmerId);
    return farmer ? farmer.name : 'Unknown Farmer';
  };

  const getActivityIcon = (activity: any) => {
    if (activity.type === 'event') {
      return <CalendarDays className="h-5 w-5 text-green-600" />;
    }

    switch (activity.type) {
      case 'info':
        return <div className="h-2 w-2 rounded-full bg-blue-500"></div>;
      case 'warning':
        return <div className="h-2 w-2 rounded-full bg-amber-500"></div>;
      case 'success':
        return <div className="h-2 w-2 rounded-full bg-green-500"></div>;
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-red-500"></div>;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500"></div>;
    }
  };

  return (
    <Card title="Recent Activities">
      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity: any, activityIdx: number) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-100">
                      {getActivityIcon(activity)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        {activity.type === 'event' ? activity.title : activity.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getFarmerName(activity.farmerId)}
                      </p>
                    </div>
                    <div className="text-right text-xs whitespace-nowrap text-gray-500">
                      {activity.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default RecentActivities;