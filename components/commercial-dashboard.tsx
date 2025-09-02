"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, Calendar, DollarSign, Phone, Mail } from "lucide-react"

const mockClients = [
  {
    id: 1,
    name: "María González Pérez",
    email: "maria.gonzalez@gmail.com",
    phone: "+56 9 8765 4321",
    matchScore: 96,
    status: "ready",
    budget: 4200,
    monthlyIncome: 2800000,
    savings: 1200000,
    preferredProperty: "Edificio Panorama Las Condes",
    lastContact: "2024-01-12",
    financialStatus: "approved",
    leadSource: "Google Ads",
    visitScheduled: "2024-01-15 15:00",
    familySize: "2 personas",
    currentSituation: "Arriendo actual $800.000",
    priority: "alta",
  },
  {
    id: 2,
    name: "Carlos Rodríguez Silva",
    email: "c.rodriguez@empresa.cl",
    phone: "+56 9 9876 5432",
    matchScore: 89,
    status: "needs_credit",
    budget: 3800,
    monthlyIncome: 2200000,
    savings: 650000,
    preferredProperty: "Condominio Verde Ñuñoa",
    lastContact: "2024-01-11",
    financialStatus: "pending_documents",
    leadSource: "Facebook",
    visitScheduled: null,
    familySize: "4 personas",
    currentSituation: "Casa familiar pequeña",
    priority: "media",
  },
  {
    id: 3,
    name: "Ana Silva Morales",
    email: "ana.silva@consultora.cl",
    phone: "+56 9 7654 3210",
    matchScore: 78,
    status: "evaluating",
    budget: 5200,
    monthlyIncome: 3500000,
    savings: 800000,
    preferredProperty: "Residencial Premium Providencia",
    lastContact: "2024-01-10",
    financialStatus: "reviewing",
    leadSource: "Referido",
    visitScheduled: "2024-01-16 11:00",
    familySize: "3 personas",
    currentSituation: "Inversionista",
    priority: "baja",
  },
]

const kpis = [
  {
    title: "Leads Generados",
    value: "247",
    change: "+18%",
    icon: Users,
    color: "text-green-600",
    detail: "Este mes vs anterior",
  },
  {
    title: "Conversión a Visita",
    value: "42%",
    change: "+8%",
    icon: Calendar,
    color: "text-green-600",
    detail: "104 visitas de 247 leads",
  },
  {
    title: "Aprobación Bancaria",
    value: "84%",
    change: "+12%",
    icon: DollarSign,
    color: "text-purple-600",
    detail: "68 de 81 evaluaciones",
  },
  {
    title: "Ventas Cerradas",
    value: "31",
    change: "+23%",
    icon: TrendingUp,
    color: "text-orange-600",
    detail: "$12.8M en ventas",
  },
]

export function CommercialDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500"
      case "needs_credit":
        return "bg-orange-500"
      case "evaluating":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Listo para Comprar"
      case "needs_credit":
        return "Necesita Crédito"
      case "evaluating":
        return "En Evaluación"
      default:
        return "Nuevo"
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 75) return "text-green-600 bg-green-100"
    return "text-orange-600 bg-orange-100"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Comercial</h2>
          <p className="text-gray-600">Gestión de leads y seguimiento de ventas</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="ready">Listos</SelectItem>
              <SelectItem value="needs_credit">Necesitan Crédito</SelectItem>
              <SelectItem value="evaluating">En Evaluación</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Buscar cliente..." className="w-64" />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm text-green-600">{kpi.change} vs mes anterior</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funnel de Ventas */}
      <Card>
        <CardHeader>
          <CardTitle>Embudo de Ventas</CardTitle>
          <CardDescription>Estado actual del proceso comercial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Leads Generados</span>
                <span>156 (100%)</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Visitas Agendadas</span>
                <span>53 (34%)</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Evaluación Financiera</span>
                <span>41 (26%)</span>
              </div>
              <Progress value={26} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Aprobación Bancaria</span>
                <span>32 (21%)</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Ventas Cerradas</span>
                <span>23 (15%)</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Potenciales</CardTitle>
          <CardDescription>Leads ordenados por prioridad y viabilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <Badge className={`${getStatusColor(client.status)} text-white`}>
                        {getStatusText(client.status)}
                      </Badge>
                      <Badge className={`${getMatchColor(client.matchScore)} font-bold`}>
                        {client.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {client.phone}
                      </div>
                      <div>
                        <span className="font-medium">Ingreso:</span> ${(client.monthlyIncome / 1000).toFixed(0)}K
                      </div>
                      <div>
                        <span className="font-medium">Ahorro:</span> ${(client.savings / 1000).toFixed(0)}K
                      </div>
                      <div>
                        <span className="font-medium">Familia:</span> {client.familySize}
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500">
                      <div>Fuente: {client.leadSource}</div>
                      <div>Situación: {client.currentSituation}</div>
                      <div>
                        Prioridad:{" "}
                        <span
                          className={`font-medium ${client.priority === "alta" ? "text-red-600" : client.priority === "media" ? "text-orange-600" : "text-green-600"}`}
                        >
                          {client.priority}
                        </span>
                      </div>
                    </div>

                    {client.visitScheduled && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">
                        Visita agendada: {client.visitScheduled}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm">Ver Perfil</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
