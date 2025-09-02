"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function UrbaniHero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 min-h-[600px] flex items-center justify-center">
      {/* Geometric patterns background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-green-400 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-green-400 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-green-400 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-green-400 rotate-12"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Cyber Day Banner */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg transform -rotate-3 shadow-xl">
            <div className="text-white font-bold text-xl">URBANI CYBER DAY</div>
            <div className="text-white text-lg">Descubre nuestros MEJORES DESCUENTOS 🦉</div>
            <div className="text-white text-sm">¡APROVECHA!</div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4">¡Bienvenidos a Urbani!</h1>
        <p className="text-xl mb-8">Vive e invierte con propósito.</p>

        {/* Search filters */}
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="1. Tipo Propiedad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="departamento">Departamento</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="2. Comuna" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="las-condes">Las Condes</SelectItem>
                  <SelectItem value="providencia">Providencia</SelectItem>
                  <SelectItem value="nunoa">Ñuñoa</SelectItem>
                  <SelectItem value="vitacura">Vitacura</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="3. Subsidio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ds1">DS1</SelectItem>
                  <SelectItem value="ds19">DS19</SelectItem>
                  <SelectItem value="ds49">DS49</SelectItem>
                  <SelectItem value="sin-subsidio">Sin subsidio</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
            Descubre tu Match Perfecto
          </Button>
        </div>
      </div>
    </div>
  )
}
