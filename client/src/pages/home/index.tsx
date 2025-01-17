import { Helmet } from "react-helmet";
import Hero from "../../components/home/hero";
import Features from "../../components/home/features";
import Reviews from "../../components/home/reviews";
import Perks from "../../components/home/perks";
import Looks from "../../components/home/looks";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Toucan - Connecting You, Effortlessly and Vibrantly!</title>
      </Helmet>
      <Hero />
      <Perks />
      <Features />
      <Looks />
      <Reviews />
    </div>
  );
};

export default Home;
