import React from 'react';

function PageWrapper({ children }) {
  return (
    <div className='w-[95vw] mx-auto mt-20 mb-10 lg:w-[60vw] lg:ml-96'>
      {children}
    </div>
  );
}

export default PageWrapper;
