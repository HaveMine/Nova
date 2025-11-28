import React from 'react';
import AIChat from './AIChat';
import { Sale, Purchase, Finance } from '../lib/mockData';

interface AIInsightsDashboardProps {
    inventoryData: any[];
    radarData: any;
    sales: Sale[];
    purchases: Purchase[];
    finances: Finance[];
    currentSession: any;
    onSendMessage: (text: string, sender: 'user' | 'bot', image?: string | null) => void;
    sessions: any[];
}

export const AIInsightsDashboard: React.FC<AIInsightsDashboardProps> = ({
    inventoryData,
    radarData,
    sales,
    purchases,
    finances,
    currentSession,
    onSendMessage,
    sessions,
}) => {
    return (
        <AIChat
            inventoryData={inventoryData}
            radarData={radarData}
            sales={sales}
            purchases={purchases}
            finances={finances}
            currentSession={currentSession}
            onSendMessage={onSendMessage}
            sessions={sessions}
        />
    );
};

export default AIInsightsDashboard;
