import Layout from "../Layout/Layout";
import Head from "../Components/Head";

function AboutUs() {
  const artistURL = "https://artist-app-omega.vercel.app/";

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Cyndi Wang
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Cyndi Wang, born on September 5, 1982, in Hsinchu County,
                  Taiwan Province, is a popular Mandopop singer and actress from
                  Taiwan. She graduated from Huagang Art School in Taipei.
                </p>
                <br />
                <p>
                  In 2003, Cyndi Wang released her debut album "Cyndi Begin" and
                  officially debuted as a singer. She gained recognition through
                  the idol drama "Westside Story". In 2004, she released her
                  second album "Love You" with the title track becoming a hit.
                  She also starred in the idol drama "The Wedding Dress" which
                  became the highest-rated drama in Taiwan that year. In 2005,
                  she released her third album "Honey" and earned the nickname
                  "Sweetheart Queen" for her sweet vocals and cheerful dance
                  moves. She also released her fourth album "Cyndi With U" with
                  the hit song "Curly Eyelashes". In 2006, she starred in the
                  idol drama "Smiling Pasta" which became the highest-rated
                  drama in Taiwan. In 2007, she released her fifth album "Magic
                  Cyndi" and her sixth album "Fly Cyndi". In 2009, she released
                  her seventh album "Heart to Heart".
                </p>
                <br />
                <p>
                  In 2011, Cyndi Wang's eighth album "Sticky Sticky" entered the
                  G-music annual TOP10 chart. She also won the Best Actress
                  award in the 6th Huading Awards for her performance in the
                  idol drama "Love, Now". In 2012, she released her ninth album
                  "Love or Not". In 2014, she released her tenth album "The 10th
                  Cyndi Wang". In 2015, she released her eleventh album "Wants
                  Or Not".
                </p>
                <br />
                <p>
                  In 2018, Cyndi Wang won the Female Champion of the Chinese Top
                  Five Music Charts with her twelfth album "CYNDILOVES2SING".
                  She also won the Most Popular Female Singer award at the 2019
                  Hito Pop Music Awards for the same album. In 2022, she
                  participated in the Mango TV variety show "The Big Band 3" and
                  won the annual championship. In 2023, she released her
                  thirteenth album "BITE BACK".
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <button
                  onClick={() => window.open(artistURL, "_blank")}
                  className="p-8 bg-subMain border border-subMain hover:bg-transparent rounded-lg"
                >
                  <span className="text-3xl block font-extrabold uppercase">
                    Artist
                  </span>
                  <p className="mb-0 text-text leading-7 my-2 text-sm">
                    Click to see more about Cyndi Wang
                  </p>
                </button>
                {/* TODO: Click to go to Shop App */}
                <button className="p-8 bg-subMain border border-subMain hover:bg-transparent rounded-lg">
                  <span className="text-3xl block font-extrabold uppercase">
                    Shop
                  </span>
                  <p className="mb-0 text-text leading-7 my-2 text-sm">
                    Click to purchase albums
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="assets/about.png"
                alt="about"
                className="w-full xl:block hidden rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
