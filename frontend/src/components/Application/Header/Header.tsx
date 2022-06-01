import { useRecoilValue } from "recoil";
import { loginDataAtom } from "../../../state/atom";
import { CreateOfferButton } from "./CreateOfferbutton";
import {HeaderItem} from "./HeaderItem";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserInfo from "./UserInfo";

export const Header = () => {
  const loginData = useRecoilValue(loginDataAtom);
  return (
    <header className="sticky top-0 z-50 bg-space-cadet h-20 flex justify-between items-center">
      <Logo/>
      <Searchbar/>
      <div>
        {loginData.isLoggedIn &&
        <ul className="flex text-mint-cream items-center">
          <CreateOfferButton />
          <UserInfo nickname={loginData.nickname} />
        </ul>
        }
        {!loginData.isLoggedIn &&
        <ul className="flex text-mint-cream">
          <HeaderItem text="Login" linkTo="/login"/>
          <HeaderItem text="Register" linkTo="/register"/>
        </ul>
        }
          
      </div>
    </header>
  );
};

export default Header;
