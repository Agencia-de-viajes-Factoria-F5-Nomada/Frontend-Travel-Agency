import { useParams } from "react-router-dom";

function TripDetailPage() {
  const { id } = useParams();
  return <h1>Trip Detail Page - ID: {id}</h1>;
}

export default TripDetailPage;
