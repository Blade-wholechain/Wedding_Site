import { useGuest } from '@/context/GuestContext';
import AccessGate from '@/components/wedding/AccessGate';
import Navigation from '@/components/wedding/Navigation';
import Hero from '@/components/wedding/Hero';
import Schedule from '@/components/wedding/Schedule';
import DressCode from '@/components/wedding/DressCode';
import Ceremoniemeesters from '@/components/wedding/Ceremoniemeesters';
import SeatingPlan from '@/components/wedding/SeatingPlan';
import AddressParking from '@/components/wedding/AddressParking';
import RSVP from '@/components/wedding/RSVP';
import Travel from '@/components/wedding/Travel';
import Gallery from '@/components/wedding/Gallery';
import FAQ from '@/components/wedding/FAQ';
import Footer from '@/components/wedding/Footer';

export default function Index() {
  const { guestType } = useGuest();

  if (!guestType) {
    return <AccessGate />;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navigation />
      <Hero />
      <Schedule />
      <DressCode />
      <Ceremoniemeesters />
      {guestType === 'day' && <SeatingPlan />}
      <AddressParking />
      <RSVP />
      <Travel />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  );
}
