import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign, 
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCards = [
  {
    title: 'Активные проекты',
    value: '24',
    change: '+12%',
    icon: <Building2 className="w-6 h-6" />,
    color: 'bg-blue-500',
  },
  {
    title: 'Всего клиентов',
    value: '156',
    change: '+8%',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-500',
  },
  {
    title: 'Общий доход',
    value: '42.5М ₽',
    change: '+23%',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'bg-purple-500',
  },
  {
    title: 'Завершено проектов',
    value: '89',
    change: '+15%',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: 'bg-orange-500',
  },
];

const monthlyData = [
  { name: 'Янв', revenue: 4000, projects: 12 },
  { name: 'Фев', revenue: 3000, projects: 15 },
  { name: 'Мар', revenue: 5000, projects: 18 },
  { name: 'Апр', revenue: 4500, projects: 14 },
  { name: 'Май', revenue: 6000, projects: 20 },
  { name: 'Июн', revenue: 5500, projects: 24 },
];

const projectStatusData = [
  { name: 'В работе', value: 24, color: '#3b82f6' },
  { name: 'На паузе', value: 5, color: '#f59e0b' },
  { name: 'Завершены', value: 89, color: '#10b981' },
  { name: 'Отменены', value: 3, color: '#ef4444' },
];

const recentProjects = [
  { id: 1, name: 'ЖК "Солнечный"', client: 'ООО "Инвест"', status: 'В работе', progress: 75, deadline: '2024-12-15' },
  { id: 2, name: 'Торговый центр "Гранд"', client: 'ИП Петров', status: 'В работе', progress: 45, deadline: '2025-02-20' },
  { id: 3, name: 'Офисное здание "Бизнес Парк"', client: 'АО "РемСтрой"', status: 'На паузе', progress: 30, deadline: '2025-01-10' },
  { id: 4, name: 'Частный дом', client: 'Иванов И.И.', status: 'В работе', progress: 90, deadline: '2024-11-30' },
];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Добро пожаловать в СтройCRM</h1>
        <p className="text-gray-600">Обзор ваших проектов и показателей</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-green-600 text-sm">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Доход и проекты по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Доход (тыс. ₽)" />
                <Line type="monotone" dataKey="projects" stroke="#10b981" strokeWidth={2} name="Проекты" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статус проектов</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Недавние проекты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {project.deadline}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'В работе'
                          ? 'bg-blue-100 text-blue-700'
                          : project.status === 'На паузе'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
