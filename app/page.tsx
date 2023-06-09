import Other from "./home/Other";
import Tech from "./home/Tech";
import Travel from "./home/Travel";
import Trending from "./home/Trending";

export default function Home() {
  return (
    <main className="pt-5">
      <Trending />
      <div>
        <Tech />
        <Travel />
        <Other />
      </div>
    </main>
  );
}
