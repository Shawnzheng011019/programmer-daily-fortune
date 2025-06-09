import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            🔮 Programmer Fortune
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-mono">
            Your daily dose of coding destiny
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 pulse-animation"></span>
              Powered by Stars & Weather
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 pulse-animation"></span>
              One Fortune Per Day
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
