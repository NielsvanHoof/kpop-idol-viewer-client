import FeaturesSection from "@/components/index/featureSection";
import HeroSection from "@/components/index/heroSection";
import NotificationsDemo from "@/components/index/notifications";
import SearchBar from "@/components/index/searchBar";
import Showcase from "@/components/index/showCase";
import SocialMediaFeed from "@/components/index/socialMediaFeed";
import EventsSection from "@/components/index/upcomingEvents";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <FeaturesSection />
      <Showcase />
      <EventsSection />
      <NotificationsDemo />
      <SocialMediaFeed />
    </div>
  );
}
