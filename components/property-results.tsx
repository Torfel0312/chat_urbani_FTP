"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Bed, Bath, Car, Zap } from "lucide-react"

interface Property {
  id: number
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  parking: number
  area: number
  image: string
  matchScore: number
  status: "immediate" | "green" | "blueprint"
  amenities: string[]
  developer: string
  deliveryDate: string
  totalUnits: number
  availableUnits: number
  pricePerM2: number
  orientation: string
  floor: string
  hoa: number
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Edificio Panorama Las Condes",
    price: 4200,
    location: "Av. Apoquindo 4501, Las Condes",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 68,
    image: "/placeholder.svg?height=400&width=600",
    matchScore: 96,
    status: "immediate",
    amenities: ["Gimnasio", "Piscina", "Sala de eventos", "Seguridad 24/7", "Quincho", "Sala de juegos"],
    developer: "Inmobiliaria Aconcagua",
    deliveryDate: "Inmediata",
    totalUnits: 120,
    availableUnits: 8,
    pricePerM2: 61.8,
    orientation: "Norte",
    floor: "Piso 12",
    hoa: 85000,
  },
  {
    id: 2,
    title: "Condominio Verde Ñuñoa",
    price: 3800,
    location: "José Pedro Alessandri 1234, Ñuñoa",
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    area: 85,
    image: "/placeholder.svg?height=400&width=600",
    matchScore: 89,
    status: "green",
    amenities: ["Áreas verdes", "Juegos infantiles", "Quincho", "Bodega", "Bicicletero"],
    developer: "Constructora Habitat",
    deliveryDate: "Marzo 2025",
    totalUnits: 64,
    availableUnits: 12,
    pricePerM2: 44.7,
    orientation: "Oriente",
    floor: "Piso 3",
    hoa: 65000,
  },
  {
    id: 3,
    title: "Residencial Premium Providencia",
    price: 5200,
    location: "Av. Providencia 2890, Providencia",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 95,
    image: "/placeholder.svg?height=400&width=600",
    matchScore: 78,
    status: "blueprint",
    amenities: ["Terraza panorámica", "Coworking", "Pet-friendly", "Carga eléctrica", "Concierge"],
    developer: "Grupo Inmobiliario Cordillera",
    deliveryDate: "Septiembre 2025",
    totalUnits: 88,
    availableUnits: 24,
    pricePerM2: 54.7,
    orientation: "Poniente",
    floor: "Piso 8",
    hoa: 95000,
  },
]

interface PropertyResultsProps {
  userProfile: any
  onSchedule: () => void
}

export function PropertyResults({ userProfile, onSchedule }: PropertyResultsProps) {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)
  const [likedProperties, setLikedProperties] = useState<number[]>([])

  const currentProperty = mockProperties[currentPropertyIndex]

  const handleLike = () => {
    setLikedProperties([...likedProperties, currentProperty.id])
    nextProperty()
  }

  const handlePass = () => {
    nextProperty()
  }

  const nextProperty = () => {
    if (currentPropertyIndex < mockProperties.length - 1) {
      setCurrentPropertyIndex(currentPropertyIndex + 1)
    } else {
      setCurrentPropertyIndex(0)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "immediate":
        return "bg-green-500"
      case "green":
        return "bg-blue-500"
      case "blueprint":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "immediate":
        return "Entrega Inmediata"
      case "green":
        return "En Verde"
      case "blueprint":
        return "En Blanco"
      default:
        return "Disponible"
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 75) return "text-green-600 bg-green-100"
    return "text-orange-600 bg-orange-100"
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Propiedades Recomendadas</h2>
        <p className="text-gray-600">Basado en tu perfil y preferencias</p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative">
              <img
                src={currentProperty.image || "/placeholder.svg"}
                alt={currentProperty.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getStatusColor(currentProperty.status)} text-white`}>
                  {getStatusText(currentProperty.status)}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={`${getMatchColor(currentProperty.matchScore)} font-bold`}>
                  {currentProperty.matchScore}% Match
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentProperty.title}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{currentProperty.location}</span>
              </div>

              <div className="text-2xl font-bold text-green-600 mb-4">${currentProperty.price.toLocaleString()}</div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <Bed className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <span className="text-sm font-medium">{currentProperty.bedrooms}</span>
                  <div className="text-xs text-gray-500">Dorm.</div>
                </div>
                <div className="text-center">
                  <Bath className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <span className="text-sm font-medium">{currentProperty.bathrooms}</span>
                  <div className="text-xs text-gray-500">Baños</div>
                </div>
                <div className="text-center">
                  <Car className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <span className="text-sm font-medium">{currentProperty.parking}</span>
                  <div className="text-xs text-gray-500">Est.</div>
                </div>
                <div className="text-center">
                  <Zap className="h-5 w-5 mx-auto mb-1 text-gray-500" />
                  <span className="text-sm font-medium">{currentProperty.area}m²</span>
                  <div className="text-xs text-gray-500">Área</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProperty.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Información del Proyecto</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Constructora:</span> {currentProperty.developer}
                  </div>
                  <div>
                    <span className="font-medium">Entrega:</span> {currentProperty.deliveryDate}
                  </div>
                  <div>
                    <span className="font-medium">Disponibles:</span> {currentProperty.availableUnits}/
                    {currentProperty.totalUnits}
                  </div>
                  <div>
                    <span className="font-medium">UF/m²:</span> {currentProperty.pricePerM2}
                  </div>
                  <div>
                    <span className="font-medium">Orientación:</span> {currentProperty.orientation}
                  </div>
                  <div>
                    <span className="font-medium">Gastos comunes:</span> ${currentProperty.hoa.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handlePass}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 border-red-200 hover:bg-red-50"
            >
              <X className="h-6 w-6 text-red-500" />
            </Button>
            <Button
              onClick={handleLike}
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 border-green-200 hover:bg-green-50"
            >
              <Heart className="h-6 w-6 text-green-500" />
            </Button>
          </div>

          {likedProperties.includes(currentProperty.id) && (
            <div className="mt-4 text-center">
              <Button onClick={onSchedule} className="bg-green-600 hover:bg-green-700">
                Agendar Visita
              </Button>
            </div>
          )}
        </div>
      </div>

      {likedProperties.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Propiedades de tu interés ({likedProperties.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProperties
              .filter((property) => likedProperties.includes(property.id))
              .map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-1">{property.title}</h4>
                    <p className="text-blue-600 font-bold">${property.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
