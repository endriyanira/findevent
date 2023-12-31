import Image from "next/image";
import useSWR from "swr";
import { Inter } from "next/font/google";
import Button from "@/components/Button/Button";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/service/constants";
import { DATA_SORT_BY, EVENTS_CATEGORIES } from "@/constants/events";
import EventCard from "@/components/EventCard/EventCard";
import Select from "@/components/Select/Select";
import { useUser } from "@/store/user/useUser";
import { useRouter } from "next/router";
import DotsLoading from "@/components/DotsLoading/DotsLoading";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [isMaxData, setIsMaxData] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("title");
  const changePage = useUser.use.changePage()
  const loadingChangePage =useUser.use.loadingChangePage()
  const changePageSuccess = useUser.use.changePageSuccess()
  const router = useRouter();

  const fetchEvents = async (url: string) => {
  const response = await axios({
      method: "GET",
      url: url,
    });
    if (response.data.length !== 5) {
      setIsMaxData(true);
    }
    setEventsData([...eventsData, ...response.data]);
    return response.data;
  };

  const handleChangeCategory = (categoryName: string) => {
    setEventsData([]);
    setCurrentPage(1);
    setSelectedCategory(categoryName);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventsData([]);
    setCurrentPage(1);
    setSortBy(e.target.value);
  };

  const { error, isLoading } = useSWR(
    `${BASE_URL}/events/?_page=${currentPage}&_limit=${5}&_sort=${sortBy}&_order=asc&category_like=${
      selectedCategory === "All" ? "" : selectedCategory
    }`,
    fetchEvents,
    {
      revalidateOnFocus: false,
    }
  );

  const handleDirectDetailPage = (eventId:number) => {
    changePage()
    setTimeout(()=>{
      changePageSuccess()
      router.push(`/user/events/${eventId}`)
    },3000)
  }

  if (error) return <div>Something Error...</div>;

  return (
    <>
			<Head>
				<title>Sealand</title>
				<meta name="sealand" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
      <Layout>
        <main
          className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
        >
          <div className="events-page-wrapper flex flex-col justify-center items-center bg-white">
            <EventsHeading />
            <div className=" w-full flex flex-row gap-2 justify-center items-center p-2 border-b md:h-[100px] ">
              {EVENTS_CATEGORIES.map((category) =>
                category.name === selectedCategory ? (
                  <Button
                    key={`key:${category.name}`}
                    small
                    active
                    primary
                    type="button"
                    label={category.name}
                    onClick={() => handleChangeCategory(category.name)}
                  />
                ) : (
                  <Button
                    key={`key:${category.name}`}
                    small
                    secondary
                    type="button"
                    label={category.name}
                    onClick={() => handleChangeCategory(category.name)}
                  />
                )
              )}
            </div>
            {loadingChangePage ? 
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex justify-center items-center">
              <DotsLoading />
            </div> 
            :
            <>
              {eventsData.length !== 0 && (
                <div className="selectSortBy flex justify-center items-center w-[300px]">
                  <Select data={DATA_SORT_BY} onChange={(e) => handleChangeSortBy(e)} />
                </div>
              )}

              <div className="md:px-[200px] justify-center">
                {eventsData.length === 0 && <div>Empty Data</div>}
                {isLoading ? (
                  <div>loading...</div>
                ) : (
                  <div className="events-list-wrapper md:grid md:grid-cols-3  md:justify-between md:gap-6 py-4">
                    {eventsData.map((event: any, index: number) => (
                      <EventCard
                        key={String(`key:${index}`)}
                        event={event}
                        handleDirectDetailPage={handleDirectDetailPage}
                      />
                    ))}
                  </div>
                )}

                {!isMaxData && (
                  <Button
                    secondary
                    label="More"
                    type="button"
                    onClick={handleLoadMore}
                  />
                )}
              </div>
            </>
            }
          </div>
          
        </main>

      </Layout>
    </>
  );
}

const EventsHeading = () => {
  return (
    <div className="events-hero-heading-wrapper bg-white">
      <Image
        className="w-[400px] h-[150px] md:w-[100vw] md:h-[500px] object-cover md:object-cover"
        alt="world-theme-park"
        src={
          "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1440/540/75/dam/disney-world/admission/WDW_SWGE_1440x358.png"
        }
        width={2000}
        height={500}
      />
    </div>
  );
};
