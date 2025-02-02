import React, { useState } from 'react';
import { Code2, Send, Server, Loader2, CheckCircle2, ArrowLeft, FolderOpen, Plus, Trash2, AlertCircle } from 'lucide-react';

interface Endpoint {
  path: string;
  requestBody: string;
}

interface FormData {
  serviceName: string;
  endpoints: Endpoint[];
  framework: 'express' | 'hapi' | 'go';
}

const defaultRequestBody = JSON.stringify({
  "username": "myname",
  "email": "myname@email.com",
  "nested": {
    "field": "value"
  }
}, null, 2);

function App() {
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    endpoints: [{ path: '', requestBody: defaultRequestBody }],
    framework: 'express'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [projectPath, setProjectPath] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      // Simulate receiving project path from backend
      setProjectPath(`/projects/${formData.serviceName}`);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error generating API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      serviceName: '',
      endpoints: [{ path: '', requestBody: defaultRequestBody }],
      framework: 'express'
    });
  };

  const addEndpoint = () => {
    if (formData.endpoints.length < 5) {
      setFormData({
        ...formData,
        endpoints: [...formData.endpoints, { path: '', requestBody: defaultRequestBody }]
      });
    }
  };

  const removeEndpoint = (index: number) => {
    if (formData.endpoints.length > 1) {
      setFormData({
        ...formData,
        endpoints: formData.endpoints.filter((_, i) => i !== index)
      });
    }
  };

  const updateEndpoint = (index: number, field: keyof Endpoint, value: string) => {
    const newEndpoints = [...formData.endpoints];
    newEndpoints[index] = { ...newEndpoints[index], [field]: value };
    setFormData({ ...formData, endpoints: newEndpoints });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-[scale_0.5s_ease-out]">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">API Project Generated Successfully!</h2>
                <p className="text-gray-400">Your {formData.serviceName} service with {formData.endpoints.length} endpoint{formData.endpoints.length > 1 ? 's' : ''} is ready to use</p>
              </div>

              <div className="w-full p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-mono text-gray-300">{projectPath}</span>
                </div>
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

  if (isLoading) {
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
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Server className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">RESTful API Generator</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Service Name
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                placeholder="e.g., user-service"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">
                  Endpoints
                  <span className="text-red-400 ml-1">*</span>
                </label>
                {formData.endpoints.length < 5 && (
                  <button
                    type="button"
                    onClick={addEndpoint}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Endpoint
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {formData.endpoints.map((endpoint, index) => (
                  <div key={index} className="bg-gray-700/50 p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-300">Endpoint {index + 1}</h3>
                      {formData.endpoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEndpoint(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={endpoint.path}
                      onChange={(e) => updateEndpoint(index, 'path', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                      placeholder="e.g., /api/users"
                      required
                    />

                    <div className="relative">
                      <Code2 className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                      <textarea
                        value={endpoint.requestBody}
                        onChange={(e) => updateEndpoint(index, 'requestBody', e.target.value)}
                        className="w-full px-4 py-2 pl-10 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition font-mono text-sm"
                        rows={6}
                        placeholder="Enter JSON request body"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {formData.endpoints.length === 5 && (
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Maximum number of endpoints reached (5)
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Framework
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'express', label: 'Node.js Express' },
                  { value: 'hapi', label: 'Node.js Hapi' },
                  { value: 'go', label: 'Go' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, framework: option.value as FormData['framework'] })}
                    className={`p-4 rounded-lg border ${
                      formData.framework === option.value
                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                        : 'border-gray-600 hover:border-gray-500'
                    } transition-all duration-200`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isLoading ? 'Generating...' : 'Generate API Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;