import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AlbumsData } from "../Data/AlbumsData";
import { FaAngleDown, FaCheck } from "react-icons/fa";

const YearData = [
  { title: "Sort By Year" },
  { title: "2003 - 2007" },
  { title: "2008 - 2012" },
  { title: "2013 - 2017" },
  { title: "2018 - 2023" },
];

const GenreData = [
  { title: "Sort By Genre" },
  { title: "Electronic, Pop" },
  { title: "Pop" },
  { title: "Electronic, Rock, Pop" },
];

const RatesData = [
  { title: "Sort By Rating" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

function Filters() {
  const [album, setAlbum] = useState({ title: "All" });
  const [year, setYear] = useState(YearData[0]);
  const [genre, setGenre] = useState(GenreData[0]);
  const [rate, setRate] = useState(RatesData[0]);

  const Filter = [
    {
      value: album,
      onChange: setAlbum,
      items: AlbumsData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: genre,
      onChange: setGenre,
      items: GenreData,
    },
    {
      value: rate,
      onChange: setRate,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FaAngleDown className="w-4 h-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full mt-1 py-1 text-base border border-gray-800 text-dryGray bg-white rounded-md overflow-auto shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {item.items.map((item, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {item.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
