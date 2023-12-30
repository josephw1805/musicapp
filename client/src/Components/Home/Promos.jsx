import { FiUser } from "react-icons/fi";

function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Discography
          </h1>
          <div className="text-text text-xs xl:text-base leading-6 xl:leading-8 max-h-48 xl:max-h-96 overflow-y-scroll scrollbar-hide">
            <table
              className="text-text text-xs xl:text-base leading-6 xl:leading-8 max-h-48 xl:max-h-96 overflow-y-scroll"
              style={{ textAlign: "center", width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Label</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td>Begin...</td>
                  <td>24 February 2003</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>2nd</td>
                  <td>Cyndi Loves You</td>
                  <td>26 March 2004</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>3rd</td>
                  <td>Honey</td>
                  <td>18 February 2005</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Shining 2005</td>
                  <td>26 July 2005</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>4th</td>
                  <td>Cyndi With U</td>
                  <td>27 December 2005</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>5th</td>
                  <td>Magic Cyndi</td>
                  <td>30 April 2007</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>6th</td>
                  <td>Fly! Cyndi</td>
                  <td>30 November 2007</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Red Cyndi</td>
                  <td>29 February 2008</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Beautiful Days</td>
                  <td>13 November 2009</td>
                  <td>Avex Taiwan</td>
                </tr>
                <tr>
                  <td>7th</td>
                  <td>Heart2Heart</td>
                  <td>4 December 2009</td>
                  <td>Gold Typhoon</td>
                </tr>
                <tr>
                  <td>8th</td>
                  <td>Sticky</td>
                  <td>27 May 2011</td>
                  <td>Gold Typhoon</td>
                </tr>
                <tr>
                  <td>9th</td>
                  <td>Love? Or Not?</td>
                  <td>30 November 2012</td>
                  <td>Universal Music Taiwan</td>
                </tr>
                <tr>
                  <td>10th</td>
                  <td>The 10th Cyndi</td>
                  <td>25 July 2014</td>
                  <td>Universal Music Taiwan</td>
                </tr>
                <tr>
                  <td>11th</td>
                  <td>Cyndi Wants Or Not?</td>
                  <td>4 December 2015</td>
                  <td>Universal Music Taiwan</td>
                </tr>
                <tr>
                  <td>12th</td>
                  <td>CYNDILOVES2SING</td>
                  <td>7 December 2018</td>
                  <td>Universal Music Taiwan</td>
                </tr>
                <tr>
                  <td></td>
                  <td>My! Cyndi!</td>
                  <td>5 September 2020</td>
                  <td>Universal Music Taiwan</td>
                </tr>
                <tr>
                  <td>13th</td>
                  <td>BITE BACK</td>
                  <td>12 October 2023</td>
                  <td>Sony Music Taiwan</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 md:text-lg text-sm mb-4">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold">
              320 Kbps
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md font-bold">
              <FiUser /> 2M
            </div>
          </div>
        </div>
        <div>
          <img
            src="assets/promo.png"
            alt="promo"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Promos;
