import { Routes, Route } from 'react-router-dom';
import PageShell from './components/PageShell';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Auth from './pages/Auth';
import BookService from './pages/BookService';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function Shell({ children }) { return <PageShell>{children}</PageShell>; }
function NotFound() { return <main className="container-page py-28 text-center"><p className="text-sm font-bold uppercase tracking-widest text-brand">404</p><h1 className="mt-3 text-5xl">This page is off the map.</h1><a className="btn-primary mt-7" href="/">Back home</a></main>; }
export default function App() { return <Routes><Route path="/login" element={<Auth/>}/><Route path="/signup" element={<Auth signup/>}/><Route path="/" element={<Shell><Home/></Shell>}/><Route path="/services" element={<Shell><Services/></Shell>}/><Route path="/services/:id" element={<Shell><ServiceDetails/></Shell>}/><Route path="/book/:serviceId" element={<Shell><ProtectedRoute><BookService/></ProtectedRoute></Shell>}/><Route path="/my-bookings" element={<Shell><ProtectedRoute><MyBookings/></ProtectedRoute></Shell>}/><Route path="/profile" element={<Shell><ProtectedRoute><Profile/></ProtectedRoute></Shell>}/><Route path="/admin" element={<Shell><ProtectedRoute admin><Admin/></ProtectedRoute></Shell>}/><Route path="*" element={<Shell><NotFound/></Shell>}/></Routes>; }
