import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (data, i, users, OnEditFunction) => {
  return (
    <tr key={i}>
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={data?.image ?? "/assets/artist.png"}
                alt={data?.fullName}
              />
            </div>
          </td>
          <td className={`${Text} truncate`}>{data?.fullName}</td>
          <td className={`${Text}`}>{data?.createdAt ?? "12, Dec 2023"}</td>
          <td className={`${Text}`}>{data?.email}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button className="bg-subMain text-white rounded flex-colo  w-6 h-6">
              <MdDelete />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className={`${Text}`}>{data?.title}</td>
          <td className={`${Text}`}>{data?.genre}</td>
          <td className={`${Text}`}>{data?.releaseDate}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => OnEditFunction(data)}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded pl-1 px-2"
            >
              Edit <FaEdit className="text-green-500" />
            </button>
            <button className="bg-subMain text-white rounded flex-colo  w-6 h-6">
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

function Table({ data, users, OnEditFunction }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full scrollbar-hide">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Full Name
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Title
                </th>
                <th scope="col" className={`${Head}`}>
                  Genre
                </th>
                <th scope="col" className={`${Head}`}>
                  Release Date
                </th>
              </>
            )}

            <th></th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, i) => Rows(data, i, users, OnEditFunction))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
