import React from 'react';
import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import Badge from '../ui/Badge';

const UpcomingEvents: React.FC = () => {
  const { calendarEvents, farmers } = useAppContext();

  const today = new Date();
  const upcomingEvents = calendarEvents
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const getFarmerName = (farmerId: string) => {
    const farmer = farmers.find(f => f.id === farmerId);
    return farmer ? farmer.name : 'Unknown Farmer';
  };

  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case 'planting':
        return 'success';
      case 'harvesting':
        return 'info';
      case 'vaccination':
        return 'warning';
      case 'meeting':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card title="Upcoming Events">
      {upcomingEvents.length === 0 ? (
        <p className="text-sm text-gray-500">No upcoming events</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {upcomingEvents.map(event => (
            <li key={event.id} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{getFarmerName(event.farmerId)}</p>
                </div>
                <div className="flex items-center">
                  <Badge variant={getEventBadgeVariant(event.type)}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  <span className="ml-2 text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {event.description && (
                <p className="mt-1 text-xs text-gray-500">{event.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default UpcomingEvents;