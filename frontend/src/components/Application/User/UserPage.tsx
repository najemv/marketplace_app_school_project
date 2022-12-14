import {Link, useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";
import {User} from "../../../types";
import fetcher from "../../../utils/fetcher";
import OfferCard from "../Offers/OfferCard";
import backArrow from '../../../../public/assets/left-arrow.svg';
import userPhoto from '../../../../../backend/static/user-photos/default-avatar-profile-icon.jpg';
import { useRecoilValue } from "recoil";
import { loginDataAtom } from "../../../state/atom";

export const UserPage = () => {
  const navigate = useNavigate();
  const {name} = useParams();
  const loginData = useRecoilValue(loginDataAtom);

  const {data, error} = useSWR(`http://localhost:4000/user/${name}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user: User = data.data;
  const photo = (user.profilePicture) ? user.profilePicture : userPhoto;
  
  return (
    <div className="m-2 lg:m-5 flex flex-col lg:flex-row">
      <div className="lg:w-1/4">
        <div onClick={() => navigate(-1)} className="h-8 w-8 ring ring-space-cadet rounded mb-2 hover:bg-gray-400">
          <img src={backArrow} alt="Return button"/>
        </div>
        <div className="flex mx-4 lg:flex-col">
          <div className="flex justify-center mb-4 w-1/3 lg:w-full">
            <div className="object-contain">
              <img className="rounded-full allign-middle" src={photo} alt="User Photo"/>
            </div>
          </div>
          <div className="ml-8">
            <p className="text-xl font-bold">Nickname: {user.nickname.toString().toUpperCase()}</p>
            <p>Email: {user.email}</p>
            <p>Registered: {new Date(user.createdAt).toDateString()}</p>
            <p>About me: {user.description}</p>
            {(loginData.isLoggedIn && loginData.nickname == user.nickname) &&
                <Link to="edit">
                    <button
                        className="btn mt-10 inline-block px-6 py-2 border-2 border-imperial-red text-imperial-red font-medium text-3xl leading-tight uppercase rounded hover:bg-medium-candy-apple-red focus:text-mint-cream hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                        Edit profile
                    </button>
                </Link>
            }
          </div>
        </div>
      </div>
      <div className="lg:w-3/4 2xl:flex 2xl:flex-wrap">
        <p className="text-2xl w-full lg:h-10">{user.offers.length > 0 ? "Offers:" : "No offers"}</p>
        {user.offers.map((offer) => <OfferCard key={offer.id} {...offer} />)}
      </div>
    </div>
  );
};


export default UserPage;
