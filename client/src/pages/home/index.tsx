import { Helmet } from "react-helmet";
import Hero from "../../components/home/hero";
import Features from "../../components/home/features";
import Reviews from "../../components/home/reviews";
import Perks from "../../components/home/perks";
import Looks from "../../components/home/looks";

const Home = () => {
  return (
    <div className="min-h-screen min-w-full overflow-y-hidden">
      <Helmet>
        <title>Toucan - Bringing People Together</title>
        <meta
          name="description"
          content="Experience the next generation of social networking with Toucan. Connect, share, and thrive in our vibrant online community."
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main>
        <Hero />
        <Features />
        <Looks />
        <Perks />
        <Reviews />
      </main>
    </div>
  );
};

export default Home;
