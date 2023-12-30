import { FaEdit } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (song, i, onDeleteHandler, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={song?.titleImage}
            alt={song?.nama}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{song?.name}</td>
      <td className={`${Text}`}>{song?.album}</td>
      <td className={`${Text}`}>{song?.genre}</td>
      <td className={`${Text}`}>{song?.year}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
              to={`/edit/${song?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded pl-1 px-2"
            >
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(song._id)}
              className="bg-subMain text-white rounded flex-colo  w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <Link
            to={`/song/${song._id}`}
            className="bg-subMain text-white rounded flex-colo  w-6 h-6"
          >
            <GoEye />
          </Link>
        )}
      </td>
    </tr>
  );
};

function Table({ data, admin, onDeleteHandler }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full scrollbar-hide">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Album
            </th>
            <th scope="col" className={`${Head}`}>
              Genre
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((song, i) => Rows(song, i, onDeleteHandler, admin))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
