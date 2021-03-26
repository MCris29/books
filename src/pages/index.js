import React from "react";
import Slider from "@/components/Slider";
import CardInf from "@/components/CardInf";
import Categories from "@/components/Categories";
import CarouselCards from "@/components/CarouselCards";

export default function Home() {
    return (
        <div>
            <Slider/>
            <CardInf/>
            <Categories/>
            <CarouselCards/>
        </div>
    );
}
