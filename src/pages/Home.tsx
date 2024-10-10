import { MenuList } from "react95";
import Navigation from "../components/Navigation";

function Home() {
  return (
    <MenuList>
      <div className="w-[280px] py-3 flex flex-col justify-center">
        <Navigation />
      </div>
    </MenuList>
  );
}

export default Home;
