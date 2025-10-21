'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, Mail, Phone, Loader2, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Database } from '@/types/database';

type Booking = Database['public']['Tables']['bookings']['Row'] & {
  services: Database['public']['Tables']['services']['Row'];
};

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>(
    'all'
  );

  useEffect(() => {
    const auth = sessionStorage.getItem('dashboard_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      let query = supabase
        .from('bookings')
        .select('*, services(*)')
        .order('appointment_datetime', { ascending: true });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [filter, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      sessionStorage.setItem('dashboard_auth', 'authenticated');
      setIsAuthenticated(true);
      toast.success('Login successful');
      fetchBookings();
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  async function updateBookingStatus(bookingId: string, newStatus: string) {
    try {
      const { error } = await (supabase
        .from('bookings') as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 w-full max-w-md glass-effect">
          <h1 className="text-3xl font-bold mb-6 text-center gradient-text">Admin Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter admin password"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'secondary',
      confirmed: 'default',
      completed: 'outline',
      cancelled: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'secondary'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const upcomingBookings = bookings.filter(
    (b) => new Date(b.appointment_datetime) >= new Date() && b.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.appointment_datetime) < new Date() || b.status === 'cancelled'
  );

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage your bookings and appointments</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 glass-effect">
            <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </Card>
          <Card className="p-6 glass-effect">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-500">
              {bookings.filter((b) => b.status === 'pending').length}
            </p>
          </Card>
          <Card className="p-6 glass-effect">
            <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-emerald-500">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </p>
          </Card>
          <Card className="p-6 glass-effect">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-blue-500">
              {bookings.filter((b) => b.status === 'completed').length}
            </p>
          </Card>
        </div>

        <Card className="p-6 glass-effect mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Bookings</h2>
            <Select
              value={filter}
              onValueChange={(value: any) => setFilter(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <>
              {upcomingBookings.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reference</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-mono text-sm">
                              {booking.booking_reference}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{booking.patient_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {booking.main_concern.substring(0, 40)}...
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{booking.services.name}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(booking.appointment_datetime), 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {format(new Date(booking.appointment_datetime), 'h:mm a')}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  <a
                                    href={`mailto:${booking.patient_email}`}
                                    className="hover:text-emerald-400"
                                  >
                                    {booking.patient_email}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <a
                                    href={`tel:${booking.patient_phone}`}
                                    className="hover:text-emerald-400"
                                  >
                                    {booking.patient_phone}
                                  </a>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <Select
                                value={booking.status}
                                onValueChange={(value) => updateBookingStatus(booking.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {pastBookings.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reference</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastBookings.map((booking) => (
                          <TableRow key={booking.id} className="opacity-60">
                            <TableCell className="font-mono text-sm">
                              {booking.booking_reference}
                            </TableCell>
                            <TableCell>{booking.patient_name}</TableCell>
                            <TableCell>{booking.services.name}</TableCell>
                            <TableCell>
                              {format(new Date(booking.appointment_datetime), 'MMM dd, yyyy h:mm a')}
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bookings found</p>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
