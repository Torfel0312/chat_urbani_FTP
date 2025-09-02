"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react"

export function ScheduleBooking() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isBooked, setIsBooked] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const availableDates = [
    { date: "2024-01-15", day: "Lun", dayNum: "15" },
    { date: "2024-01-16", day: "Mar", dayNum: "16" },
    { date: "2024-01-17", day: "Mié", dayNum: "17" },
    { date: "2024-01-18", day: "Jue", dayNum: "18" },
    { date: "2024-01-19", day: "Vie", dayNum: "19" },
    { date: "2024-01-22", day: "Lun", dayNum: "22" },
    { date: "2024-01-23", day: "Mar", dayNum: "23" },
  ]

  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

  const handleBooking = () => {
    if (selectedDate && selectedTime && formData.name && formData.email && formData.phone) {
      setIsBooked(true)
    }
  }

  if (isBooked) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Visita Agendada!</h2>
            <p className="text-gray-600 mb-6">
              Tu visita ha sido confirmada para el {selectedDate} a las {selectedTime}
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-green-800 mb-2">Detalles de la visita:</h3>
              <div className="text-sm text-green-700 space-y-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {selectedDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {selectedTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Las Condes, Santiago
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Recibirás una confirmación por email y WhatsApp con todos los detalles.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Agenda tu Visita</h2>
        <p className="text-gray-600">Selecciona el día y hora que mejor te acomode</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Info */}
        <Card>
          <CardHeader>
            <CardTitle>Propiedad Seleccionada</CardTitle>
            <CardDescription>Moderno Departamento en Las Condes</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Propiedad"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Las Condes, Santiago</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">$320.000</div>
              <div className="flex space-x-2">
                <Badge>2 Dorm</Badge>
                <Badge>2 Baños</Badge>
                <Badge>1 Est</Badge>
                <Badge>65m²</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Completa tus datos para confirmar la visita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <Label htmlFor="message">Mensaje (Opcional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="¿Alguna pregunta específica sobre la propiedad?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selection */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Selecciona una Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date.date}
                variant={selectedDate === date.date ? "default" : "outline"}
                onClick={() => setSelectedDate(date.date)}
                className="flex flex-col p-4 h-auto"
              >
                <span className="text-xs">{date.day}</span>
                <span className="text-lg font-bold">{date.dayNum}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Selecciona una Hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="p-3"
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirm Button */}
      {selectedDate && selectedTime && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleBooking}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8"
            disabled={!formData.name || !formData.email || !formData.phone}
          >
            Confirmar Visita
          </Button>
        </div>
      )}
    </div>
  )
}
