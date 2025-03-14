import Navbar from "../components/Navbar";
import GameList from "../components/GameList";
import Footer from "../components/Footer";

const GameTopupPage = () => {
  return (
    <div className="min-h-screen bg-black-theme text-theme">
      <Navbar />
      <div className="container mx-auto max-w-[1200px] px-6">
        <GameList />
      </div>
      <Footer />
    </div>
  );
};

export default GameTopupPage;
