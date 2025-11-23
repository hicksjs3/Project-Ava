'use client'

interface AcousticSignatureProps {
  className?: string
}

export default function AcousticSignature({ className = '' }: AcousticSignatureProps) {
  // Generate random waveform bars for visual effect
  const bars = Array.from({ length: 50 }, () => Math.random() * 100)

  return (
    <div className={`flex items-end justify-center gap-1 h-16 ${className}`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-teal-primary rounded-t transition-all duration-75"
          style={{
            width: '3px',
            height: `${height}%`,
            minHeight: '4px',
            animation: `waveform ${1 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}


