import { Loader2 } from 'lucide-react';
interface Endpoint {
  path: string;
  requestBody: string;
}
  
interface FormData {
  serviceName: string;
  endpoints: Endpoint[];
  framework: 'express' | 'hapi' | 'go';
}

const LoadingScreen = ({formData}: {formData: FormData}) => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-400 rounded-full animate-pulse" />
            <Loader2 className="w-12 h-12 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Generating Your API Project</h2>
            <p className="text-gray-400">Please wait while we set up your {formData.serviceName} service</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full animate-[loading_2s_ease-in-out_infinite]" />
            </div>
            <div className="text-sm text-gray-500">This may take a few moments...</div>
          </div>
        </div>
    </div>
    )
}

export default LoadingScreen;