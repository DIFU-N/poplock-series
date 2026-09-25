"use client";
import Footer from "@/app/components/atoms/Footer";
import Header from "@/app/components/atoms/Header";
import BestWeekly from "@/app/components/molecules/home/BestWeekly";
import HotShows from "@/app/components/molecules/home/HotShows";
import MustHavs from "@/app/components/molecules/home/MustHav";

export default function Home() {
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
