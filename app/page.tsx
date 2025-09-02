"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, BarChart3 } from "lucide-react"
import { PropertyResults } from "@/components/property-results"
import { FinancialSimulator } from "@/components/financial-simulator"
import { ScheduleBooking } from "@/components/schedule-booking"
import { CommercialDashboard } from "@/components/commercial-dashboard"
import { Chatbot } from "@/components/chatbot"
import { LabScenarios } from "@/components/lab-scenarios"
import { UrbaniHeader } from "@/components/urbani-header"
import { UrbaniHero } from "@/components/urbani-hero"

interface UserProfile {
  purchaseType: string
  propertyType: string
  familySize: string
  location: string
  budget: number[]
  savings: number[]
  monthlyIncome: number[]
}

export default function UrbaniApp() {
  const [currentStep, setCurrentStep] = useState("welcome")
  const [userProfile, setUserProfile] = useState<UserProfile>({
    purchaseType: "",
    propertyType: "",
    familySize: "",
    location: "",
    budget: [300000],
    savings: [50000],
    monthlyIncome: [80000],
  })

  const [selectedScenario, setSelectedScenario] = useState<any>(null)

  const handleProfileSubmit = () => {
    setCurrentStep("results")
  }

  const handleScenarioSelect = (scenario: any) => {
    setUserProfile({
      purchaseType: "vivir",
      propertyType: "departamento",
      familySize: scenario.userProfile.familySize,
      location: "Las Condes",
      budget: [scenario.userProfile.income * 1.5],
      savings: [scenario.userProfile.savings],
      monthlyIncome: [scenario.userProfile.income],
    })
    setSelectedScenario(scenario)
    setCurrentStep("results")
  }

  const renderWelcomeScreen = () => (
    <div className="min-h-screen bg-gray-900">
      <UrbaniHeader />
      <UrbaniHero />

      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">Perfilado Inteligente</CardTitle>
              <CardDescription className="text-center">
                Responde algunas preguntas para encontrar tu propiedad perfecta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">¿Qué tipo de compra realizarás?</Label>
                <RadioGroup
                  value={userProfile.purchaseType}
                  onValueChange={(value) => setUserProfile({ ...userProfile, purchaseType: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vivir" id="vivir" />
                    <Label htmlFor="vivir">Para vivir</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="invertir" id="invertir" />
                    <Label htmlFor="invertir">Para invertir</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">Tipo de vivienda</Label>
                <Select
                  value={userProfile.propertyType}
                  onValueChange={(value) => setUserProfile({ ...userProfile, propertyType: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecciona el tipo de propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Composición familiar</Label>
                <Select
                  value={userProfile.familySize}
                  onValueChange={(value) => setUserProfile({ ...userProfile, familySize: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Cantidad de integrantes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="3-4">3-4 personas</SelectItem>
                    <SelectItem value="5+">5+ personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Preferencia de ubicación</Label>
                <Input
                  placeholder="Ej: Las Condes, Providencia, Ñuñoa"
                  value={userProfile.location}
                  onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  Presupuesto aproximado: ${userProfile.budget[0].toLocaleString()}
                </Label>
                <Slider
                  value={userProfile.budget}
                  onValueChange={(value) => setUserProfile({ ...userProfile, budget: value })}
                  max={1000000}
                  min={100000}
                  step={10000}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  Ahorro disponible: ${userProfile.savings[0].toLocaleString()}
                </Label>
                <Slider
                  value={userProfile.savings}
                  onValueChange={(value) => setUserProfile({ ...userProfile, savings: value })}
                  max={200000}
                  min={10000}
                  step={5000}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium">
                  Ingreso mensual: ${userProfile.monthlyIncome[0].toLocaleString()}
                </Label>
                <Slider
                  value={userProfile.monthlyIncome}
                  onValueChange={(value) => setUserProfile({ ...userProfile, monthlyIncome: value })}
                  max={200000}
                  min={30000}
                  step={5000}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleProfileSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                disabled={!userProfile.purchaseType || !userProfile.propertyType}
              >
                Encontrar Mi Hogar Ideal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderNavigation = () => (
    <nav className="bg-gray-900 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-white">urbani.</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={currentStep === "results" ? "default" : "ghost"}
              onClick={() => setCurrentStep("results")}
              className="text-white hover:text-green-400"
            >
              Propiedades
            </Button>
            <Button
              variant={currentStep === "simulator" ? "default" : "ghost"}
              onClick={() => setCurrentStep("simulator")}
              className="text-white hover:text-green-400"
            >
              Simulador
            </Button>
            <Button
              variant={currentStep === "schedule" ? "default" : "ghost"}
              onClick={() => setCurrentStep("schedule")}
              className="text-white hover:text-green-400"
            >
              Agendar
            </Button>
            <Button
              variant={currentStep === "dashboard" ? "default" : "ghost"}
              onClick={() => setCurrentStep("dashboard")}
              className="text-white hover:text-green-400"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={currentStep === "lab" ? "default" : "ghost"}
              onClick={() => setCurrentStep("lab")}
              className="text-white hover:text-green-400"
            >
              Laboratorio
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )

  if (currentStep === "welcome") {
    return (
      <>
        {renderWelcomeScreen()}
        <Chatbot />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentStep === "results" && (
          <PropertyResults userProfile={userProfile} onSchedule={() => setCurrentStep("schedule")} />
        )}
        {currentStep === "simulator" && <FinancialSimulator userProfile={userProfile} />}
        {currentStep === "schedule" && <ScheduleBooking />}
        {currentStep === "dashboard" && <CommercialDashboard />}
        {currentStep === "lab" && <LabScenarios onSelectScenario={handleScenarioSelect} />}
      </main>
      <Chatbot />
    </div>
  )
}
