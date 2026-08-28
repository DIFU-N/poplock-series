"use client";
import Footer from "@/components/atoms/Footer";
import Header from "@/components/atoms/Header";
// import ForYou from "@/components/molecules/ForYou";
import BestWeekly from "@/components/molecules/home/BestWeekly";
import HotShows from "@/components/molecules/home/HotShows";
import MustHavs from "@/components/molecules/home/MustHav";
// import useStore from "@/utils/store/store";
// import { useBearStore } from "@/utils/store/zustand-hooks/useBearStore";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { useEffect } from "react";

export default function Home() {
  // const bears = useStore(useBearStore, (state) => state.bears);
  // const addOne = useStore(useBearStore, (state) => state.addABear);
  // const getValues = useShowStore();

  // useEffect(() => {
  //   getValues.execute();
  //   console.log("okay let me check this", getValues.data);
  // }, [getValues, getValues.data]);
  return (
    <div>
      <div>
        <Header />
        {/* <ForYou /> */}
        <HotShows />
        <BestWeekly />
        <MustHavs />
        <Footer />
      </div>
    </div>
  );
}
