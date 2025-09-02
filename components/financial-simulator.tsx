"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"

interface FinancialSimulatorProps {
  userProfile: any
}

export function FinancialSimulator({ userProfile }: FinancialSimulatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(userProfile.monthlyIncome[0] || 80000)
  const [availableSavings, setAvailableSavings] = useState(userProfile.savings[0] || 50000)
  const [propertyPrice, setPropertyPrice] = useState(userProfile.budget[0] || 300000)
  const [results, setResults] = useState<any>(null)

  const calculateFinancing = () => {
    const maxDividend = monthlyIncome * 0.28 // 28% del ingreso (más realista)
    const minDownPayment = propertyPrice * 0.2 // 20% pie mínimo
    const loanAmount = propertyPrice - minDownPayment
    const monthlyRate = 0.042 / 12 // 4.2% anual (tasa actual mercado)
    const months = 25 * 12 // 25 años

    // Gastos adicionales
    const notaryFees = propertyPrice * 0.012 // 1.2% gastos notariales
    const insurance = loanAmount * 0.0024 // 0.24% seguro desgravamen anual
    const fireInsurance = propertyPrice * 0.0003 // 0.03% seguro incendio anual

    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalMonthlyPayment = monthlyPayment + (insurance + fireInsurance) / 12

    const qualifies = totalMonthlyPayment <= maxDividend && availableSavings >= minDownPayment + notaryFees
    const totalInitialCost = minDownPayment + notaryFees

    setResults({
      maxDividend,
      minDownPayment,
      monthlyPayment: totalMonthlyPayment,
      qualifies,
      affordablePrice: qualifies
        ? propertyPrice
        : (maxDividend / monthlyRate) * (1 - Math.pow(1 + monthlyRate, -months)) + availableSavings,
      savingsNeeded: Math.max(0, totalInitialCost - availableSavings),
      incomeNeeded: Math.max(0, totalMonthlyPayment / 0.28 - monthlyIncome),
      notaryFees,
      insurance: (insurance + fireInsurance) / 12,
      totalInitialCost,
      loanAmount,
      interestRate: 4.2,
    })
  }

  useEffect(() => {
    calculateFinancing()
  }, [monthlyIncome, availableSavings, propertyPrice])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simulador Financiero</h2>
        <p className="text-gray-600">Descubre tu capacidad de compra y opciones de financiamiento</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Información Financiera
            </CardTitle>
            <CardDescription>Ingresa tus datos para calcular tu capacidad de compra</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">Ingreso Mensual Líquido</Label>
              <Input
                id="income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                placeholder="Ej: 80000"
              />
            </div>

            <div>
              <Label htmlFor="savings">Ahorro Disponible para Pie</Label>
              <Input
                id="savings"
                type="number"
                value={availableSavings}
                onChange={(e) => setAvailableSavings(Number(e.target.value))}
                placeholder="Ej: 50000"
              />
            </div>

            <div>
              <Label htmlFor="price">Precio de la Propiedad</Label>
              <Input
                id="price"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                placeholder="Ej: 300000"
              />
            </div>

            <Button onClick={calculateFinancing} className="w-full">
              Calcular Financiamiento
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {results.qualifies ? (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                )}
                Resultado del Análisis
              </CardTitle>
              <CardDescription>
                {results.qualifies
                  ? "¡Felicitaciones! Calificas para esta propiedad"
                  : "Necesitas ajustar algunos parámetros"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm text-gray-600">Dividendo Máximo</div>
                  <div className="text-lg font-bold text-green-600">${results.maxDividend.toLocaleString()}</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm text-gray-600">Pie Mínimo</div>
                  <div className="text-lg font-bold text-green-600">${results.minDownPayment.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Dividendo Mensual</span>
                    <span className={results.monthlyPayment <= results.maxDividend ? "text-green-600" : "text-red-600"}>
                      ${results.monthlyPayment.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(results.monthlyPayment / results.maxDividend) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ahorro vs Pie Requerido</span>
                    <span className={availableSavings >= results.minDownPayment ? "text-green-600" : "text-red-600"}>
                      ${availableSavings.toLocaleString()} / ${results.minDownPayment.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(availableSavings / results.minDownPayment) * 100} className="h-2" />
                </div>
              </div>

              {!results.qualifies && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Para calificar necesitas:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    {results.savingsNeeded > 0 && (
                      <li>• Ahorrar ${results.savingsNeeded.toLocaleString()} adicionales</li>
                    )}
                    {results.incomeNeeded > 0 && (
                      <li>• Aumentar ingresos en ${results.incomeNeeded.toLocaleString()}</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Precio Máximo Recomendado</h4>
                <div className="text-2xl font-bold text-green-600">
                  ${Math.floor(results.affordablePrice).toLocaleString()}
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Detalle de Costos</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Crédito hipotecario:</span>
                    <span className="font-medium">${results.loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasa de interés:</span>
                    <span className="font-medium">{results.interestRate}% anual</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gastos notariales:</span>
                    <span className="font-medium">${results.notaryFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seguros mensuales:</span>
                    <span className="font-medium">${Math.round(results.insurance).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Badge className="mb-2">Tasa de Interés</Badge>
            <div className="text-2xl font-bold text-green-600">4.5%</div>
            <div className="text-sm text-gray-600">Anual promedio</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Badge className="mb-2">Plazo</Badge>
            <div className="text-2xl font-bold text-green-600">25 años</div>
            <div className="text-sm text-gray-600">Máximo recomendado</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Badge className="mb-2">Pie Mínimo</Badge>
            <div className="text-2xl font-bold text-orange-600">20%</div>
            <div className="text-sm text-gray-600">Del valor propiedad</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
