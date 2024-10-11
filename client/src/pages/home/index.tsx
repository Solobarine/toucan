import { Helmet } from "react-helmet";
import Hero from "../../components/home/hero";
import Features from "../../components/home/features";
import Benefits from "../../components/home/benefits";
import Reviews from "../../components/home/reviews";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 min-h-screen">
      <Helmet>
        <title>Toucan - Connecting You, Effortlessly and Vibrantly!</title>
      </Helmet>
      <Hero />
      <Features />
      <Benefits />
      <Reviews />
    </div>
  );
};

export default Home;
