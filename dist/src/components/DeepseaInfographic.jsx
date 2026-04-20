import React from 'react';

export default function DeepseaInfographic() {
  return (
    <div className="min-h-screen bg-[#00A8FF] flex flex-col items-center justify-center p-8">
      {/* Top Typography Section */}
      <div className="text-center mb-12 max-w-4xl">
        <p className="text-sm text-cyan-200 mb-4 tracking-wide">
          领域安全 • 全域监测
        </p>
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          深海资源与安全通道
        </h1>
        <p className="text-xl text-cyan-200 mb-6 leading-relaxed">
          深海资源勘探与通道控制正在成为国家级战略资产。
        </p>
        <p className="text-base text-cyan-200 leading-relaxed max-w-3xl mx-auto">
          深海安全可视化呈现资源梯度、海底通道与防护网络，帮助理解海洋领域的控制权分布和防御态势。
        </p>
      </div>

      {/* Content Card */}
      <div className="relative w-full max-w-5xl h-96 rounded-3xl border border-cyan-400/60 bg-gradient-to-b from-[#001122] to-black shadow-[0_0_100px_rgba(0,243,255,0.4)] overflow-hidden">
        {/* Bioluminescent Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-16 w-1 h-1 bg-cyan-400 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-20 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-16 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-24 left-2/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-32 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-28 left-1/4 w-1 h-1 bg-cyan-300 rounded-full opacity-70 animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-36 right-2/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute bottom-20 left-12 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-16 right-16 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '4.5s'}}></div>
          <div className="absolute bottom-24 left-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '5s'}}></div>
          <div className="absolute bottom-28 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '5.5s'}}></div>
        </div>

        {/* Trapezoidal Passage Entrance Shadow */}
        <svg
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-24"
          viewBox="0 0 192 96"
        >
          <defs>
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M 38 0 L 154 0 L 192 96 L 0 96 Z"
            fill="url(#shadowGradient)"
            opacity="0.95"
          />
        </svg>
      </div>
    </div>
  );
}