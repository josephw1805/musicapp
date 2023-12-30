// import { FaEdit } from "react-icons/fa";
// import Uploader from "../../../Components/Uploader";
// import { Input, Message, Select } from "../../../Components/UsedInput";
// import SideBar from "../SideBar";
// import { MdDelete } from "react-icons/md";
// import { HiPlusCircle } from "react-icons/hi";
// import { ImUpload } from "react-icons/im";
// import ArtistModal from "../../../Components/Modals/ArtistModal";
// import { useEffect, useState } from "react";

// const AddSong = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [artist, setArtist] = useState(null);

//   useEffect(() => {
//     if (!modalOpen) {
//       setArtist();
//     }
//   }, [modalOpen]);

//   return (
//     <SideBar>
//       <ArtistModal
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         artist={artist}
//       />
//       <div className="flex flex-col gap-6">
//         <h2 className="text-xl font-bold">Create Song</h2>
//         <div className="wfull grid md:grid-cols-2 gap-6">
//           <Input
//             label="Song Title"
//             placeholder="Enter song title here"
//             type="text"
//             bg
//           />
//           <Input
//             label="Song Genre"
//             placeholder="Enter song genre here"
//             type="text"
//             bg
//           />
//         </div>

//         <div className="wfull grid md:grid-cols-2 gap-6">
//           <Input
//             label="Song Language"
//             placeholder="Enter language here"
//             type="text"
//             bg
//           />
//           <Input
//             label="Year of Release"
//             placeholder="Enter song released year here"
//             type="text"
//             bg
//           />
//         </div>

//         {/* IMAGES */}
//         <div className="w-full grid md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-2">
//             <label className="text-bolder font-semibold text-sm">
//               Background Image
//             </label>
//             <Uploader />
//             <div className="w-32 h-32 p-2 bg-main border border-border rounded">
//               <img
//                 src="/assets/songbackground.png"
//                 alt="bgimage"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-bolder font-semibold text-sm">
//               Title Image
//             </label>
//             <Uploader />
//             <div className="w-32 h-32 p-2 bg-main border border-border rounded">
//               <img
//                 src="/assets/promo.png"
//                 alt="bgimage"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         <Message label="Description" placeholder="Make it short and sweet" />

//         {/* ALBUM */}
//         <div className="text-sm w-full">
//           <Select label="Album" options={AlbumsData} />
//         </div>

//         {/* Song Video */}
//         <div className="flex flex-col gap-2 ">
//           <label className="text-bolder font-semibold text-sm">
//             Song Video
//           </label>
//           <Uploader />
//         </div>

//         {/* Artist */}
//         <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
//           <div className="flex-colo mt-2 w-full gap-2">
//             <button className="w-full flex-colo p-4 bg-dray transitions border-subMain border-2 text-subMain rounded hover:bg-subMain hover:text-white">
//               <MdDelete /> Delete Artist
//             </button>
//             <button
//               onClick={() => {
//                 setArtist(
//                   UsersData.filter((user) => user.fullName === "Cyndi Wang")[0]
//                 );
//                 setModalOpen(true);
//               }}
//               className="w-full flex-colo p-4 bg-dray transitions border-2 border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white"
//             >
//               <FaEdit /> Edit Artist
//             </button>
//             <button
//               onClick={() => setModalOpen(true)}
//               className="w-full flex-colo p-4 bg-dray transitions border-2 border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white"
//             >
//               <HiPlusCircle /> Add Artist
//             </button>
//           </div>
//           <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
//             {UsersData.filter((user) => user.fullName === "Cyndi Wang").map(
//               (user, i) => (
//                 <div
//                   key={i}
//                   className=" p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
//                 >
//                   <img
//                     src={user?.image ?? "/assets/artist.png"}
//                     alt={user.fullName}
//                     className="w-full h-64 object-cover rounded mb-4"
//                   />
//                   <p>{user.fullName}</p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>

//         {/* SUBMIT */}

//         <button className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded">
//           <ImUpload /> Publish Song
//         </button>
//       </div>
//     </SideBar>
//   );
// };

// export default AddSong;
