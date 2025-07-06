"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface RelogioDigitalProps {
  showSeconds?: boolean
  showDate?: boolean
  className?: string
}

export function RelogioDigital({ showSeconds = true, showDate = true, className }: RelogioDigitalProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
    }
    return date.toLocaleTimeString("pt-BR", options)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center ${className}`}
    >
      <div className="flex items-center justify-center mb-2">
        <Clock className="w-6 h-6 mr-2 text-blue-600" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Horário Atual</span>
      </div>

      <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-2">
        {formatTime(currentTime)}
      </div>

      {showDate && (
        <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 capitalize">
          {formatDate(currentTime)}
        </div>
      )}
    </motion.div>
  )
}
