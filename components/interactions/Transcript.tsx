'use client'

interface TranscriptMessage {
  role: 'ava' | 'prospect'
  text: string
  timestamp?: string
}

interface TranscriptProps {
  transcript: string
  className?: string
}

export default function Transcript({ transcript, className = '' }: TranscriptProps) {
  // Parse transcript - assuming format like:
  // "Ava: Hello, how are you?\nProspect: I'm doing well, thanks!"
  // or JSON format with structured messages
  
  const parseTranscript = (text: string): TranscriptMessage[] => {
    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(text)
      if (Array.isArray(parsed)) {
        return parsed.map((msg: any) => ({
          role: msg.role === 'assistant' || msg.role === 'ava' ? 'ava' : 'prospect',
          text: msg.content || msg.text || '',
          timestamp: msg.timestamp,
        }))
      }
    } catch {
      // Not JSON, parse as plain text
    }

    // Parse plain text format
    const lines = text.split('\n').filter(line => line.trim())
    const messages: TranscriptMessage[] = []

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase()
      if (lowerLine.startsWith('ava:') || lowerLine.startsWith('assistant:')) {
        messages.push({
          role: 'ava',
          text: line.replace(/^(ava|assistant):\s*/i, '').trim(),
        })
      } else if (lowerLine.startsWith('prospect:') || lowerLine.startsWith('user:')) {
        messages.push({
          role: 'prospect',
          text: line.replace(/^(prospect|user):\s*/i, '').trim(),
        })
      } else if (messages.length > 0) {
        // Continue previous message if no role indicator
        messages[messages.length - 1].text += ' ' + line.trim()
      } else {
        // Default to prospect if no role indicator
        messages.push({
          role: 'prospect',
          text: line.trim(),
        })
      }
    })

    return messages
  }

  const messages = parseTranscript(transcript)

  if (messages.length === 0) {
    return (
      <div className={`text-white-pure/70 font-body ${className}`}>
        <p>No transcript available.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'ava' ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-lg ${
              message.role === 'ava'
                ? 'bg-blue-deep/50 text-teal-primary'
                : 'bg-blue-deep text-white-pure'
            }`}
          >
            <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
            {message.timestamp && (
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}


