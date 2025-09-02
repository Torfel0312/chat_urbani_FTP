"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Target, Zap, Download } from "lucide-react"
import jsPDF from "jspdf"

interface LabScenario {
  id: string
  title: string
  description: string
  userProfile: {
    name: string
    age: number
    income: number
    savings: number
    familySize: string
    currentSituation: string
  }
  results: {
    matchedProperties: number
    financialViability: string
    timeToDecision: string
    conversionProbability: number
  }
  metrics: {
    leadScore: number
    engagementLevel: string
    touchpoints: number
    roi: string
  }
}

const labScenarios: LabScenario[] = [
  {
    id: "scenario-1",
    title: "Caso de Estudio: Joven Profesional",
    description: "Profesional de 28 años buscando su primera vivienda",
    userProfile: {
      name: "María González",
      age: 28,
      income: 2800000,
      savings: 1200000,
      familySize: "2 personas (pareja)",
      currentSituation: "Arriendo $800.000/mes en Providencia",
    },
    results: {
      matchedProperties: 3,
      financialViability: "Aprobado",
      timeToDecision: "7 días",
      conversionProbability: 96,
    },
    metrics: {
      leadScore: 96,
      engagementLevel: "Alto",
      touchpoints: 8,
      roi: "340%",
    },
  },
  {
    id: "scenario-2",
    title: "Caso de Estudio: Familia en Crecimiento",
    description: "Familia de 4 integrantes buscando mayor espacio",
    userProfile: {
      name: "Carlos Rodríguez",
      age: 35,
      income: 2200000,
      savings: 650000,
      familySize: "4 personas (2 hijos)",
      currentSituation: "Casa propia pequeña en Maipú",
    },
    results: {
      matchedProperties: 2,
      financialViability: "Requiere ajustes",
      timeToDecision: "14 días",
      conversionProbability: 78,
    },
    metrics: {
      leadScore: 89,
      engagementLevel: "Medio-Alto",
      touchpoints: 12,
      roi: "280%",
    },
  },
]

interface LabScenariosProps {
  onSelectScenario: (scenario: LabScenario) => void
}

export function LabScenarios({ onSelectScenario }: LabScenariosProps) {
  const generatePDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(20)
    doc.setTextColor(124, 179, 66) // Verde Urbani
    doc.text("URBANI - Laboratorio de Casos de Estudio", 20, 30)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Análisis de Performance y ROI", 20, 40)
    doc.text(`Generado el: ${new Date().toLocaleDateString("es-CL")}`, 20, 50)

    // Métricas Generales
    doc.setFontSize(16)
    doc.setTextColor(124, 179, 66)
    doc.text("Métricas Generales de Performance", 20, 70)

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text("• Precisión de Match: 92%", 25, 85)
    doc.text("• Reducción de Tiempo: 65%", 25, 95)
    doc.text("• ROI Promedio: 310%", 25, 105)
    doc.text("• Satisfacción Cliente: 87%", 25, 115)

    // Casos de Estudio
    let yPosition = 135

    labScenarios.forEach((scenario, index) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }

      doc.setFontSize(14)
      doc.setTextColor(124, 179, 66)
      doc.text(`Caso ${index + 1}: ${scenario.title}`, 20, yPosition)

      yPosition += 10
      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(`Cliente: ${scenario.userProfile.name}`, 25, yPosition)

      yPosition += 8
      doc.text(`Edad: ${scenario.userProfile.age} años`, 25, yPosition)

      yPosition += 8
      doc.text(`Ingreso: $${(scenario.userProfile.income / 1000).toFixed(0)}K`, 25, yPosition)

      yPosition += 8
      doc.text(`Ahorro: $${(scenario.userProfile.savings / 1000).toFixed(0)}K`, 25, yPosition)

      yPosition += 8
      doc.text(`Situación: ${scenario.userProfile.currentSituation}`, 25, yPosition)

      yPosition += 12
      doc.setTextColor(124, 179, 66)
      doc.text("Resultados:", 25, yPosition)

      yPosition += 8
      doc.setTextColor(0, 0, 0)
      doc.text(`• Propiedades Matched: ${scenario.results.matchedProperties}`, 30, yPosition)

      yPosition += 8
      doc.text(`• Viabilidad Financiera: ${scenario.results.financialViability}`, 30, yPosition)

      yPosition += 8
      doc.text(`• Tiempo a Decisión: ${scenario.results.timeToDecision}`, 30, yPosition)

      yPosition += 8
      doc.text(`• Probabilidad de Conversión: ${scenario.results.conversionProbability}%`, 30, yPosition)

      yPosition += 8
      doc.text(`• ROI: ${scenario.metrics.roi}`, 30, yPosition)

      yPosition += 20
    })

    // Comparativa
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 30
    }

    doc.setFontSize(16)
    doc.setTextColor(124, 179, 66)
    doc.text("Comparativa: Proceso Tradicional vs Urbani", 20, yPosition)

    yPosition += 20
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Tiempo de Respuesta:", 25, yPosition)
    yPosition += 8
    doc.setFontSize(10)
    doc.text("• Tradicional: 48-72 horas", 30, yPosition)
    yPosition += 6
    doc.text("• Urbani: 5-10 minutos (85% reducción)", 30, yPosition)

    yPosition += 15
    doc.setFontSize(12)
    doc.text("Tasa de Conversión:", 25, yPosition)
    yPosition += 8
    doc.setFontSize(10)
    doc.text("• Tradicional: 12-18%", 30, yPosition)
    yPosition += 6
    doc.text("• Urbani: 34-42% (180% mejora)", 30, yPosition)

    yPosition += 15
    doc.setFontSize(12)
    doc.text("Costo por Lead:", 25, yPosition)
    yPosition += 8
    doc.setFontSize(10)
    doc.text("• Tradicional: $45.000", 30, yPosition)
    yPosition += 6
    doc.text("• Urbani: $18.000 (60% reducción)", 30, yPosition)

    // Footer
    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(`Página ${i} de ${pageCount}`, 20, 285)
      doc.text("Urbani - Plataforma Inmobiliaria Inteligente", 120, 285)
    }

    doc.save("urbani-laboratorio-casos-estudio.pdf")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Laboratorio de Casos de Estudio</h2>
          <p className="text-gray-600">Ejemplos reales de cómo Urbani optimiza el proceso comercial</p>
        </div>
        <Button onClick={generatePDF} className="bg-green-600 hover:bg-green-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
      </div>

      {/* Métricas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <div className="text-sm text-gray-600">Precisión de Match</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">65%</div>
            <div className="text-sm text-gray-600">Reducción Tiempo</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">310%</div>
            <div className="text-sm text-gray-600">ROI Promedio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-gray-600">Satisfacción Cliente</div>
          </CardContent>
        </Card>
      </div>

      {/* Casos de Estudio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {labScenarios.map((scenario) => (
          <Card key={scenario.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {scenario.title}
                <Badge
                  className={`${scenario.results.conversionProbability >= 90 ? "bg-green-500" : "bg-blue-500"} text-white`}
                >
                  {scenario.results.conversionProbability}% Conversión
                </Badge>
              </CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Perfil del Usuario */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Perfil del Cliente</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Nombre:</span> {scenario.userProfile.name}
                  </div>
                  <div>
                    <span className="font-medium">Edad:</span> {scenario.userProfile.age} años
                  </div>
                  <div>
                    <span className="font-medium">Ingreso:</span> ${(scenario.userProfile.income / 1000).toFixed(0)}K
                  </div>
                  <div>
                    <span className="font-medium">Ahorro:</span> ${(scenario.userProfile.savings / 1000).toFixed(0)}K
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Familia:</span> {scenario.userProfile.familySize}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Situación:</span> {scenario.userProfile.currentSituation}
                  </div>
                </div>
              </div>

              {/* Resultados */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Resultados del Proceso</h4>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Propiedades Matched</span>
                  <Badge variant="outline">{scenario.results.matchedProperties} propiedades</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Viabilidad Financiera</span>
                  <Badge
                    className={
                      scenario.results.financialViability === "Aprobado"
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white"
                    }
                  >
                    {scenario.results.financialViability}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Tiempo a Decisión</span>
                  <span className="text-sm font-medium">{scenario.results.timeToDecision}</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Probabilidad de Conversión</span>
                    <span className="font-medium">{scenario.results.conversionProbability}%</span>
                  </div>
                  <Progress value={scenario.results.conversionProbability} className="h-2" />
                </div>
              </div>

              {/* Métricas */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-3">Métricas de Performance</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Lead Score:</span>
                    <span className="font-medium text-green-700">{scenario.metrics.leadScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement:</span>
                    <span className="font-medium text-green-700">{scenario.metrics.engagementLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Touchpoints:</span>
                    <span className="font-medium text-green-700">{scenario.metrics.touchpoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-medium text-green-700">{scenario.metrics.roi}</span>
                  </div>
                </div>
              </div>

              <Button onClick={() => onSelectScenario(scenario)} className="w-full bg-green-600 hover:bg-green-700">
                Simular Este Caso
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparativa */}
      <Card>
        <CardHeader>
          <CardTitle>Comparativa: Proceso Tradicional vs Urbani</CardTitle>
          <CardDescription>Impacto medible en el proceso comercial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-4">Tiempo de Respuesta</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Tradicional: 48-72 horas</div>
                <div className="text-sm text-red-600">↓ 85% reducción</div>
                <div className="text-lg font-bold text-green-600">Urbani: 5-10 minutos</div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-4">Tasa de Conversión</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Tradicional: 12-18%</div>
                <div className="text-sm text-green-600">↑ 180% mejora</div>
                <div className="text-lg font-bold text-green-600">Urbani: 34-42%</div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-4">Costo por Lead</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Tradicional: $45.000</div>
                <div className="text-sm text-green-600">↓ 60% reducción</div>
                <div className="text-lg font-bold text-green-600">Urbani: $18.000</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
