
import { Link } from "react-router-dom";
import { Button, MenuListItem, Separator } from "react95";

function Navigation() {
  return (
    <>
      <MenuListItem>
        <Link to={"/quizpage"} className="w-full">
          <Button fullWidth role="img" aria-label="📝">
            <span className="flex items- justify-between w-full">
              📝 Yeni Quiz Başla
            </span>
          </Button>
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Button
          role="img"
          aria-label="🚀"
          onClick={() => window.location.reload()}
          fullWidth
        >
          <span className="flex items- justify-between w-full">
            🚀 Uygulamayı Yenile
          </span>
        </Button>{" "}
      </MenuListItem>
      <Separator />
      <MenuListItem>
        <Link to={"/"} className="w-full">
          <Button fullWidth role="img" aria-label="📝">
            <span className="flex items- justify-between w-full">
            🏠 Anasayfa
            </span>
          </Button>
        </Link>
      </MenuListItem>
    </>
  );
}

export default Navigation;
