import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronUp, 
  ChevronDown,
  MoreVertical,
  RefreshCw,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

interface DataItem {
  id: string;
  name: string;
  email: string;
  role: 'UMKM' | 'Driver' | 'User';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalOrders: number;
  rating: number;
}

type SortField = 'name' | 'joinDate' | 'totalOrders' | 'rating';
type SortOrder = 'asc' | 'desc';

export function ManajemenData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const mockData: DataItem[] = [
    { id: '1', name: 'Tahu Gejrot Raos', email: 'tahu.raos@gmail.com', role: 'UMKM', status: 'active', joinDate: '2024-01-15', totalOrders: 456, rating: 4.9 },
    { id: '2', name: 'Budi Santoso', email: 'budi.driver@gmail.com', role: 'Driver', status: 'active', joinDate: '2024-02-20', totalOrders: 234, rating: 5.0 },
    { id: '3', name: 'Siti Nurhaliza', email: 'siti@gmail.com', role: 'User', status: 'active', joinDate: '2024-03-10', totalOrders: 28, rating: 0 },
    { id: '4', name: 'Kopi Bogor Asli', email: 'kopi.bogor@gmail.com', role: 'UMKM', status: 'active', joinDate: '2024-01-22', totalOrders: 389, rating: 4.8 },
    { id: '5', name: 'Ahmad Fauzi', email: 'ahmad.driver@gmail.com', role: 'Driver', status: 'inactive', joinDate: '2024-04-05', totalOrders: 212, rating: 4.9 },
    { id: '6', name: 'Rina Wijaya', email: 'rina@gmail.com', role: 'User', status: 'active', joinDate: '2024-05-12', totalOrders: 18, rating: 0 },
    { id: '7', name: 'Batik Bogor Heritage', email: 'batik@gmail.com', role: 'UMKM', status: 'pending', joinDate: '2024-06-01', totalOrders: 0, rating: 0 },
    { id: '8', name: 'Dedi Hermawan', email: 'dedi.driver@gmail.com', role: 'Driver', status: 'active', joinDate: '2024-03-15', totalOrders: 198, rating: 4.8 },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredData = mockData
    .filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || item.role === filterRole;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      
      if (sortField === 'joinDate') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: { bg: '#4CAF50', text: '#FFFFFF' },
      inactive: { bg: '#858585', text: '#FFFFFF' },
      pending: { bg: '#FF9800', text: '#FFFFFF' }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <Badge style={{ backgroundColor: style.bg, color: style.text }}>
        {status === 'active' ? 'Aktif' : status === 'inactive' ? 'Nonaktif' : 'Pending'}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      UMKM: '#FF8D28',
      Driver: '#2196F3',
      User: '#4CAF50'
    };
    const color = colors[role as keyof typeof colors];
    return (
      <Badge variant="outline" style={{ borderColor: color, color: color }}>
        {role}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ color: '#2F4858' }}>Manajemen Data Pengguna</h3>
            <p className="body-3 mt-2" style={{ color: '#858585' }}>
              Kelola data UMKM, Driver, dan Pengguna dalam satu dashboard
            </p>
          </div>
          <Button style={{ backgroundColor: '#FF8D28' }}>
            <Download size={16} className="mr-2" />
            Export Data
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Total UMKM', value: 342, color: '#FF8D28', change: '+18' },
          { label: 'Total Driver', value: 156, color: '#2196F3', change: '+12' },
          { label: 'Total User', value: 12847, color: '#4CAF50', change: '+342' },
          { label: 'Pending Approval', value: 23, color: '#FF9800', change: '-5' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="hover-scale">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
                  <Badge
                    variant="outline"
                    style={{
                      fontSize: '10px',
                      backgroundColor: stat.change.startsWith('+') ? '#C8E6C920' : '#FFE0B220',
                      color: stat.change.startsWith('+') ? '#4CAF50' : '#FF9800',
                      borderColor: stat.change.startsWith('+') ? '#4CAF50' : '#FF9800'
                    }}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="body-3 mb-1" style={{ color: '#858585', fontSize: '11px' }}>
                  {stat.label}
                </p>
                <h3 style={{ color: stat.color }}>{stat.value.toLocaleString('id-ID')}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: '#858585' }} />
                <Input
                  placeholder="Cari berdasarkan nama atau email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="UMKM">UMKM</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh Button */}
              <Button variant="outline" size="icon">
                <RefreshCw size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        Nama
                        {sortField === 'name' && (
                          sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <button
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                        onClick={() => handleSort('joinDate')}
                      >
                        Tanggal Bergabung
                        {sortField === 'joinDate' && (
                          sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                        onClick={() => handleSort('totalOrders')}
                      >
                        Orders
                        {sortField === 'totalOrders' && (
                          sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                        onClick={() => handleSort('rating')}
                      >
                        Rating
                        {sortField === 'rating' && (
                          sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>
                        <p className="body-3" style={{ color: '#2F4858', fontWeight: 600 }}>
                          {item.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                          {item.email}
                        </p>
                      </TableCell>
                      <TableCell>{getRoleBadge(item.role)}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                          {new Date(item.joinDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="body-3" style={{ color: '#FF8D28', fontWeight: 600 }}>
                          {item.totalOrders}
                        </p>
                      </TableCell>
                      <TableCell>
                        {item.role !== 'User' && item.rating > 0 && (
                          <p className="body-3" style={{ color: '#FFB800', fontWeight: 600 }}>
                            ⭐ {item.rating.toFixed(1)}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye size={14} className="mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 size={14} className="mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t flex items-center justify-between">
              <p className="body-3" style={{ color: '#858585', fontSize: '12px' }}>
                Menampilkan {filteredData.length} dari {mockData.length} data
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm" style={{ backgroundColor: '#FF8D28', color: '#FFFFFF' }}>2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
