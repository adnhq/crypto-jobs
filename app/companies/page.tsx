import CompanyCard from "@/components/CompanyCard";
import { Righteous } from "next/font/google";

const righteous_font = Righteous({ subsets: ["latin"], weight: "400"});

function Page() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 mt-36 mb-20">
      <div className="space-y-4 mb-10">
        <h1 className={`font-bold text-primary text-4xl ${righteous_font.className}`}>
          Featured crypto startups
        </h1>
        <p className="text-lg text-muted-foreground font-normal">
          Explore our featured startups to learn more about them and their
          exciting job opportunities. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Quasi provident quod amet aliquid vel, placeat dicta
          ab aspernatur ex blanditiis architecto atque, accusamus veritatis
          itaque? Architecto nam vitae alias doloremque!
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {[...Array(11)].map((_, id) => (
          <CompanyCard key={id} id={id} />
        ))}
      </div>
    </main>
  );
}

export default Page;
