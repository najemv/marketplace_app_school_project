import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Category, OfferPreview } from "../../../types";
import fetcher from "../../../utils/fetcher";
import OfferCard from "./OfferCard";


export const ListOfOffers = () => {
  const {id} = useParams();
  console.log(id);
  const cat_id = parseInt(id!);
  console.log(cat_id);
  let name: string;
  let offers: OfferPreview[];

  // Get all offers or offer in single category
  if (!cat_id) {
    const { data, error } = useSWR(`http://localhost:4000/offer`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    offers = data.data;
    name = "All offers";
  } else {
    const { data, error } = useSWR(`http://localhost:4000/category/${cat_id}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    offers = data.data.offers;
    name = data.data.name;
  }

  return (
    <main className="mx-10">
      <h1>{name}</h1>
      <div>
        {offers.map((offer) => <OfferCard key={offer.id} {...offer}/>)}
      </div>
    </main>
  );
};

export default ListOfOffers;