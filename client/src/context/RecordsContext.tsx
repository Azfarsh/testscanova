import { createContext, useContext, useState } from 'react';
import { MedicalRecord } from '../types';

type RecordsContextType = {
  records: MedicalRecord[];
  addRecord: (record: MedicalRecord) => void;
  removeRecord: (id: string) => void; // optional
};

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  const addRecord = (record: MedicalRecord) => {
    setRecords((prev) => [...prev, record]);
  };

  const removeRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord, removeRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};

// export const useRecords = () => {
//   const context = useContext(RecordsContext);
//   if (!context) throw new Error('useRecords must be used within a RecordsProvider');
//   return context;
// };
