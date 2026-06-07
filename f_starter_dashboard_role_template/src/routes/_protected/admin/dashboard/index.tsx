import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  BookOpen,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Activity,
  BarChart2,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { useCoursesStore } from '@/stores/courses-store'
import { authService } from '@/services/auth-service'
import type { User } from '@/types/user'
import * as React from 'react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const growthIndicator = (value: number) => {
  if (value > 0) {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <TrendingUp className="h-3 w-3 mr-1" /> +{value}%
      </Badge>
    )
  } else if (value < 0) {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
        <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> {value}%
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">0%</Badge>
    )
  }
}

export const Route = createFileRoute('/_protected/admin/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminDashboard />
}

function AdminDashboard() {
  const { courses, transactions } = useCoursesStore()
  const [instructors, setInstructors] = React.useState<User[]>([])

  React.useEffect(() => {
    authService.getInstructors().then(setInstructors).catch(console.error)
  }, [])

  // Calculate live statistics
  const totalCourses = courses.length
  const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.status === 'Reçu' ? tx.amount : 0), 0)
  const totalInstructors = instructors.length
  const pendingInstructors = instructors.filter(i => i.status === 'en_attente').length
  const approvedInstructors = instructors.filter(i => i.status === 'approuve').length

  // Calculate earnings per instructor
  const instructorEarnings = React.useMemo(() => {
    const map: Record<string, { name: string; email: string; amount: number; courseCount: number; status: string }> = {}

    // Seed all instructors
    instructors.forEach((inst) => {
      const instId = String(inst.id || inst.email)
      map[instId] = {
        name: inst.name,
        email: inst.email,
        amount: 0,
        courseCount: 0,
        status: inst.status || 'approuve'
      }
    })

    // Fallback for default instructor if not in list
    if (!map['1']) {
      map['1'] = { name: 'Fabienne Dizy Olliveaud', email: 'fabienne@test.com', amount: 0, courseCount: 0, status: 'approuve' }
    }

    // Count courses per instructor
    courses.forEach((c) => {
      const instId = c.instructorId || '1'
      if (map[instId]) {
        map[instId].courseCount += 1
      }
    })

    // Accumulate transaction amounts
    transactions.forEach((tx) => {
      if (tx.status !== 'Reçu') return
      const course = courses.find((c) => c.id === tx.courseId || c.title === tx.courseTitle)
      const instId = course?.instructorId || '1'
      if (map[instId]) {
        map[instId].amount += tx.amount
      }
    })

    return Object.values(map)
  }, [courses, transactions, instructors])
  
  // Count courses by level
  const levelsCount = courses.reduce((acc: Record<string, number>, c) => {
    acc[c.level] = (acc[c.level] || 0) + 1
    return acc
  }, { 'Débutant': 0, 'Intermédiaire': 0, 'Avancé': 0 })

  const formationsByLevel = Object.entries(levelsCount).map(([level, count]) => ({
    level,
    count,
  }))

  const mockData = {
    overview: {
      totalUsers: 142 + transactions.length, // simulate based on transactions
      totalFormations: totalCourses,
      totalRevenue: totalRevenue,
      totalCertifications: 28,
      userGrowth: 15,
      formationGrowth: courses.length > 3 ? 20 : 0,
      revenueGrowth: 25,
      revenueByMonth: [
        { month: 'Mars', total: Math.round(totalRevenue * 0.2) },
        { month: 'Avril', total: Math.round(totalRevenue * 0.35) },
        { month: 'Mai', total: Math.round(totalRevenue * 0.45) },
      ],
      formationsByLevel,
      mostActiveDays: [
        { day: 'Lun', count: 42 },
        { day: 'Mar', count: 58 },
        { day: 'Mer', count: 64 },
        { day: 'Jeu', count: 72 },
        { day: 'Ven', count: 55 },
        { day: 'Sam', count: 21 },
        { day: 'Dim', count: 18 },
      ],
      questionsByDifficulty: [
        { difficulty: 'Facile', value: 12 },
        { difficulty: 'Moyen', value: 18 },
        { difficulty: 'Difficile', value: 5 },
      ],
    },
    finances: {
      totalRevenue: totalRevenue,
      revenueThisMonth: Math.round(totalRevenue * 0.45),
      revenueLastMonth: Math.round(totalRevenue * 0.35),
      averagePayment: transactions.length > 0 ? totalRevenue / transactions.length : 0,
      partialPayments: 2,
      revenueByMonth: [
        { month: 'Mars', total: Math.round(totalRevenue * 0.2) },
        { month: 'Avril', total: Math.round(totalRevenue * 0.35) },
        { month: 'Mai', total: Math.round(totalRevenue * 0.45) },
      ],
    },
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Tableau de bord administrateur
        </h1>
        <p className="text-muted-foreground">
          Visualisez et analysez les performances de votre plateforme de
          formation
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilisateurs totaux
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.overview.totalUsers.toLocaleString()}
                </div>
                <div className="flex items-center pt-1">
                  {growthIndicator(mockData.overview.userGrowth)}
                  <span className="text-xs text-muted-foreground ml-2">
                    vs mois précédent
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Formations totales
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.overview.totalFormations}
                </div>
                <div className="flex items-center pt-1">
                  {growthIndicator(mockData.overview.formationGrowth)}
                  <span className="text-xs text-muted-foreground ml-2">
                    vs mois précédent
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenus totaux
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.overview.totalRevenue.toLocaleString()}€
                </div>
                <div className="flex items-center pt-1">
                  {growthIndicator(mockData.overview.revenueGrowth)}
                  <span className="text-xs text-muted-foreground ml-2">
                    vs mois précédent
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Formateurs inscrits
                </CardTitle>
                <Users className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalInstructors}
                </div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground gap-1.5 flex-wrap">
                  {pendingInstructors > 0 ? (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-0 py-0 px-1.5 text-[10px]">
                      {pendingInstructors} en attente
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-400 py-0 px-1.5 text-[10px]">
                      0 en attente
                    </Badge>
                  )}
                  <span>• {approvedInstructors} approuvés</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certifications totales
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.overview.totalCertifications}
                </div>
                <p className="text-xs text-muted-foreground">
                  Toutes certifications
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
                <CardDescription>
                  Évolution des revenus sur les derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockData.overview.revenueByMonth}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Revenus (€)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formations par niveau</CardTitle>
                <CardDescription>
                  Distribution des formations selon leur niveau
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockData.overview.formationsByLevel}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        fill="#8884d8"
                        name="Nombre de formations"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Jours les plus actifs</CardTitle>
                <CardDescription>
                  Activité par jour de la semaine
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockData.overview.mostActiveDays}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        fill="#82ca9d"
                        name="Nombre d'activités"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions par difficulté</CardTitle>
                <CardDescription>
                  Distribution des questions par niveau de difficulté
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={mockData.overview.questionsByDifficulty}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="difficulty"
                        label={(entry: any) => {
                          const { difficulty, percent } = entry
                          return `${difficulty}: ${(percent * 100).toFixed(0)}%`
                        }}
                      >
                        {mockData.overview.questionsByDifficulty.map(
                          (_entry: any, index: any) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ),
                        )}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Finances Tab */}
        <TabsContent value="finances" className="space-y-6">
          {/* Financial Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenus totaux
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.finances.totalRevenue.toLocaleString()}€
                </div>
                <p className="text-xs text-muted-foreground">
                  {growthIndicator(mockData.overview.revenueGrowth)}
                  <span className="ml-2">vs mois précédent</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenus ce mois
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.finances.revenueThisMonth.toLocaleString()}€
                </div>
                <p className="text-xs text-muted-foreground">
                  {(
                    (mockData.finances.revenueThisMonth /
                      mockData.finances.revenueLastMonth -
                      1) *
                    100
                  ).toFixed(1)}
                  % vs mois dernier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paiement moyen
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.finances.averagePayment.toFixed(2)}€
                </div>
                <p className="text-xs text-muted-foreground">Par transaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paiements partiels
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockData.finances.partialPayments}
                </div>
                <p className="text-xs text-muted-foreground">
                  En attente de régularisation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
              <CardDescription>Revenus mensuels sur la période</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockData.finances.revenueByMonth}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}€`} />
                    <Tooltip formatter={(value) => [`${value}€`, `Revenus`]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      name="Revenus"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance des Formateurs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Performance & Gains des Formateurs</CardTitle>
              <CardDescription>
                Répartition des formations et revenus générés par enseignant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Formateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-center">Formations</TableHead>
                      <TableHead className="text-center">Statut Compte</TableHead>
                      <TableHead className="text-right">Revenus Générés</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instructorEarnings.map((inst, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{inst.name}</TableCell>
                        <TableCell>{inst.email}</TableCell>
                        <TableCell className="text-center">{inst.courseCount}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={cn(
                              inst.status === 'approuve'
                                ? 'bg-green-100 text-green-800'
                                : inst.status === 'suspendu'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800',
                              'border-0'
                            )}
                          >
                            {inst.status === 'approuve'
                              ? 'Actif'
                              : inst.status === 'suspendu'
                                ? 'Suspendu'
                                : 'En attente'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-indigo-600">
                          {inst.amount.toLocaleString()}€
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
