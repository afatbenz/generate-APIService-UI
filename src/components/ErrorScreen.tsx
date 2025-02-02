import { Frown, ArrowLeft } from 'lucide-react';

  interface ErrorScreenProps {
    message: string;
    handleReset: () => void;
  }
  
const ErrorScreen = ({ handleReset, message }: ErrorScreenProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-[scale_0.5s_ease-out]">
                    <Frown className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">API Project Generated Failed!</h2>
                  <p className="text-gray-400">{message}</p>
                  <p className="text-gray-400">But don't worry you can try again later</p>
                </div>
  
                <div className="space-y-4 w-full">
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Create Another API
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ErrorScreen;