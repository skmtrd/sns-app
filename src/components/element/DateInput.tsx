import { useState } from 'react';

const DateInput = () => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <div className='flex flex-col items-start space-y-2'>
      <input
        type='date'
        id='dateInput'
        value={date}
        onChange={(e) => handleDateChange(e.target.value)}
        className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
};

export default DateInput;
