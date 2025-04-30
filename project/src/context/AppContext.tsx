import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Farmer, Crop, Livestock, Transaction, CalendarEvent, Notification } from '../types';
import { 
  farmers as initialFarmers, 
  crops as initialCrops, 
  livestock as initialLivestock,
  transactions as initialTransactions,
  calendarEvents as initialCalendarEvents,
  notifications as initialNotifications
} from '../data/mockData';

interface AppContextType {
  farmers: Farmer[];
  crops: Crop[];
  livestock: Livestock[];
  transactions: Transaction[];
  calendarEvents: CalendarEvent[];
  notifications: Notification[];
  selectedFarmerId: string | null;
  setSelectedFarmerId: (id: string | null) => void;
  addFarmer: (farmer: Omit<Farmer, 'id'>) => void;
  updateFarmer: (farmer: Farmer) => void;
  deleteFarmer: (id: string) => void;
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (crop: Crop) => void;
  deleteCrop: (id: string) => void;
  addLivestock: (livestock: Omit<Livestock, 'id'>) => void;
  updateLivestock: (livestock: Livestock) => void;
  deleteLivestock: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [livestock, setLivestock] = useState<Livestock[]>(initialLivestock);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);

  const addFarmer = (farmer: Omit<Farmer, 'id'>) => {
    const newFarmer = {
      ...farmer,
      id: Date.now().toString(),
    };
    setFarmers([...farmers, newFarmer]);
  };

  const updateFarmer = (updatedFarmer: Farmer) => {
    setFarmers(farmers.map(farmer => 
      farmer.id === updatedFarmer.id ? updatedFarmer : farmer
    ));
  };

  const deleteFarmer = (id: string) => {
    setFarmers(farmers.filter(farmer => farmer.id !== id));
  };

  const addCrop = (crop: Omit<Crop, 'id'>) => {
    const newCrop = {
      ...crop,
      id: Date.now().toString(),
    };
    setCrops([...crops, newCrop]);
  };

  const updateCrop = (updatedCrop: Crop) => {
    setCrops(crops.map(crop => 
      crop.id === updatedCrop.id ? updatedCrop : crop
    ));
  };

  const deleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
  };

  const addLivestock = (livestock: Omit<Livestock, 'id'>) => {
    const newLivestock = {
      ...livestock,
      id: Date.now().toString(),
    };
    setLivestock(prev => [...prev, newLivestock]);
  };

  const updateLivestock = (updatedLivestock: Livestock) => {
    setLivestock(livestock.map(item => 
      item.id === updatedLivestock.id ? updatedLivestock : item
    ));
  };

  const deleteLivestock = (id: string) => {
    setLivestock(livestock.filter(item => item.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setCalendarEvents([...calendarEvents, newEvent]);
  };

  const updateCalendarEvent = (updatedEvent: CalendarEvent) => {
    setCalendarEvents(calendarEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(calendarEvents.filter(event => event.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const value = {
    farmers,
    crops,
    livestock,
    transactions,
    calendarEvents,
    notifications,
    selectedFarmerId,
    setSelectedFarmerId,
    addFarmer,
    updateFarmer,
    deleteFarmer,
    addCrop,
    updateCrop,
    deleteCrop,
    addLivestock,
    updateLivestock,
    deleteLivestock,
    addTransaction,
    deleteTransaction,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    markNotificationAsRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};