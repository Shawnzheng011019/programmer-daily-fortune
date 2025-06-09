import React from 'react'

const FortuneDisplay = ({ fortune, onReset }) => {
  const getZodiacEmoji = (sign) => {
    const emojis = {
      aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
      leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
      sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
    }
    return emojis[sign] || '⭐'
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getBugCountColor = (count) => {
    if (count <= 2) return 'text-green-400'
    if (count <= 5) return 'text-yellow-400'
    if (count <= 8) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="fortune-card rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-2">
            Your Programming Fortune
          </h2>
          <div className="flex items-center justify-center space-x-4 text-lg">
            <span className="flex items-center">
              {getZodiacEmoji(fortune.zodiacSign)}
              <span className="ml-2 capitalize">{fortune.zodiacSign}</span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="capitalize">{fortune.element} Element</span>
          </div>
          {fortune.message && (
            <p className="text-yellow-400 mt-4 font-semibold">{fortune.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="code-block p-4">
              <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                💼 Work Recommendations
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Should work overtime:</span>
                  <span className={fortune.shouldOvertime ? 'text-green-400' : 'text-red-400'}>
                    {fortune.shouldOvertime ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Expected bugs today:</span>
                  <span className={getBugCountColor(fortune.expectedBugs)}>
                    🐛 {fortune.expectedBugs}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Productivity score:</span>
                  <span className={getScoreColor(fortune.productivityScore)}>
                    📊 {fortune.productivityScore}%
                  </span>
                </div>
              </div>
            </div>

            <div className="code-block p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                💻 Code Quality
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quality score:</span>
                  <span className={getScoreColor(fortune.codeQualityScore)}>
                    ⭐ {fortune.codeQualityScore}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Lucky language:</span>
                  <span className="text-blue-400">
                    🚀 {fortune.luckyLanguage}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="code-block p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                📝 Commit Guidance
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {fortune.commitAdvice}
              </p>
            </div>

            <div className="code-block p-4">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                📚 Learning Focus
              </h3>
              <p className="text-gray-300">
                Today is perfect for studying: <span className="text-cyan-300 font-semibold">{fortune.learningRecommendation}</span>
              </p>
            </div>

            <div className="code-block p-4">
              <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center">
                🌤️ Weather Influence
              </h3>
              <p className="text-gray-300 capitalize">
                Current weather: <span className="text-orange-300">{fortune.weatherInfluence}</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Weather patterns affect your coding energy and bug probability
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            🔄 Check Another Day
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Remember: This is for entertainment only. Trust your skills, not the stars! 😄
          </p>
        </div>
      </div>
    </div>
  )
}

export default FortuneDisplay
