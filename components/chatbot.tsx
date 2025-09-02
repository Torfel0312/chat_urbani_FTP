"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de Urbani. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickResponses = [
    "¿Cómo funciona el financiamiento?",
    "¿Qué documentos necesito?",
    "¿Cuánto demora el proceso?",
    "¿Qué precios manejan?",
    "¿En qué ubicaciones tienen?",
    "¿Puedo agendar una visita?",
  ]

  const botResponses: { [key: string]: string } = {
    financiamiento:
      "En Urbani trabajamos con 12 bancos para conseguirte las mejores condiciones. Típicamente necesitas un pie del 20% y que el dividendo no supere el 28% de tus ingresos. Nuestro simulador te muestra en tiempo real si calificas. ¿Te gustaría que calculemos tu capacidad de compra?",
    documentos:
      "Para la evaluación necesitas: últimas 3 liquidaciones de sueldo, certificado AFP (últimos 12 meses), cartola bancaria (3 meses), y cédula de identidad. Si eres independiente, también declaración de renta. ¿Tienes alguna situación particular?",
    tiempo:
      "Con Urbani el proceso es mucho más rápido: Match de propiedades en 5 minutos, pre-aprobación bancaria en 24-48 horas, y cierre en 30-35 días vs 60-90 días del proceso tradicional. ¿En qué etapa te encuentras?",
    visita:
      "¡Perfecto! Nuestro sistema de agenda inteligente te permite ver horarios disponibles en tiempo real. Una vez que encuentres una propiedad de tu interés, puedes agendar directamente. ¿Ya tienes alguna propiedad en mente?",
    precios:
      "Los precios en nuestra plataforma van desde UF 2.800 hasta UF 8.500, con opciones en Las Condes, Providencia, Ñuñoa, y más comunas. El precio promedio es UF 4.200. ¿Cuál es tu rango de presupuesto?",
    ubicacion:
      "Tenemos propiedades en las mejores ubicaciones: Las Condes (desde UF 4.200), Providencia (desde UF 3.800), Ñuñoa (desde UF 3.200), y Vitacura (desde UF 5.500). ¿Qué zona te interesa más?",
    default:
      "Entiendo tu consulta. Nuestros asesores especializados pueden ayudarte de manera personalizada. Tenemos disponibilidad inmediata. ¿Prefieres que te llamen ahora o agendamos una videollamada?",
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      let botResponse = botResponses.default

      if (inputMessage.toLowerCase().includes("financiamiento") || inputMessage.toLowerCase().includes("crédito")) {
        botResponse = botResponses.financiamiento
      } else if (inputMessage.toLowerCase().includes("documento")) {
        botResponse = botResponses.documentos
      } else if (inputMessage.toLowerCase().includes("tiempo") || inputMessage.toLowerCase().includes("demora")) {
        botResponse = botResponses.tiempo
      } else if (inputMessage.toLowerCase().includes("visita") || inputMessage.toLowerCase().includes("agendar")) {
        botResponse = botResponses.visita
      } else if (
        inputMessage.toLowerCase().includes("precio") ||
        inputMessage.toLowerCase().includes("costo") ||
        inputMessage.toLowerCase().includes("valor")
      ) {
        botResponse = botResponses.precios
      } else if (
        inputMessage.toLowerCase().includes("ubicación") ||
        inputMessage.toLowerCase().includes("zona") ||
        inputMessage.toLowerCase().includes("comuna")
      ) {
        botResponse = botResponses.ubicacion
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handleQuickResponse = (response: string) => {
    setInputMessage(response)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Bot className="h-5 w-5 mr-2 text-green-600" />
            Asistente Urbani
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          En línea
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-green-600" />}
                  {message.sender === "user" && <User className="h-4 w-4 mt-0.5" />}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Responses */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
            <div className="space-y-1">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-xs h-8"
                  onClick={() => handleQuickResponse(response)}
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
