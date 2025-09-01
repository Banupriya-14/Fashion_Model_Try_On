
import React from 'react';

interface ResultDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingMessages = [
  "Warming up the virtual studio...",
  "Draping the fabric on the model...",
  "Adjusting the lighting...",
  "Finding the perfect pose...",
  "Rendering the final look...",
  "Almost ready for the runway...",
];

const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % LoadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 rounded-lg p-8 animate-pulse">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-indigo-600 text-center">{LoadingMessages[messageIndex]}</p>
    </div>
  );
};


const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white p-8 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-700">Your generated image will appear here</h3>
        <p className="mt-1 text-sm text-gray-400">Upload an outfit and click "Place on Model" to start.</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-700 bg-red-50 p-8 rounded-lg border border-red-200">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold">Generation Failed</h3>
        <p className="mt-1 text-sm">{message}</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, isLoading, error }) => {
  return (
    <div className="aspect-square w-full border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-inner bg-gray-100">
      {isLoading && <LoadingState />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && generatedImage && (
        <img src={generatedImage} alt="Generated model" className="object-contain h-full w-full" />
      )}
      {!isLoading && !error && !generatedImage && <Placeholder />}
    </div>
  );
};
