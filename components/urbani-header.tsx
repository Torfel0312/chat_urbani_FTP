"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react"

export function UrbaniHeader() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>Cochrane 635, of. 903 Torre B, Edificio Centro Plaza, Concepción</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>+1 285 5967</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>contacto@urbani.cl</span>
            </div>
            <div className="flex space-x-2">
              <Instagram className="h-4 w-4" />
              <Linkedin className="h-4 w-4" />
              <Facebook className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">urbani.</div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:text-green-400">
              PROYECTOS
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              PROPIEDADES
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              SUBSIDIOS
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              INVERSIONISTAS
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              ¿CÓMO FUNCIONA?
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              BLOG
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              NOSOTROS
            </Button>
            <Button variant="ghost" className="text-white hover:text-green-400">
              CONTACTO
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-white text-white">
              Empresa B
            </Badge>
            <Badge variant="outline" className="border-white text-white">
              Certificada
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
