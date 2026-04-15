import Navigation from '@/components/wedding/Navigation';
import Hero from '@/components/wedding/Hero';
import OurStory from '@/components/wedding/OurStory';
import WeddingDetails from '@/components/wedding/WeddingDetails';
import Schedule from '@/components/wedding/Schedule';
import SeatingPlan from '@/components/wedding/SeatingPlan';
import RSVP from '@/components/wedding/RSVP';
import Travel from '@/components/wedding/Travel';
import Gallery from '@/components/wedding/Gallery';
import FAQ from '@/components/wedding/FAQ';
import Footer from '@/components/wedding/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <OurStory />
      <WeddingDetails />
      <Schedule />
      <SeatingPlan />
      <RSVP />
      <Travel />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  );
}
