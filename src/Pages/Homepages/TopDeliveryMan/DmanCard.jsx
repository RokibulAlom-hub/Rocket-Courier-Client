const DmanCard = ({ man, id }) => {
  return (
    <div
      key={man._id}
      className="bg-accent text-white rounded-lg shadow-lg   transition-transform transform "
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={man.photoURL}
          alt={man.name}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="p-2 space-y-4">
        <h2 className="text-2xl font-semibold uppercase">{man.name}</h2>
        <p className="text-md  ">
          Parcels Delivered: <span className="font-bold">{man.delivered}</span>
        </p>
        <p className="text-md  ">
          Average Rating:{" "}
          <span className="font-bold">{Math.round(man.averageReveiw)}</span>
        </p>
      </div>
    </div>
  );
};

export default DmanCard;
