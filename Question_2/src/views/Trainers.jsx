import React, { useEffect, useState } from 'react';
import  TrainerCard  from "../components/TrainerCard.jsx";

export default function Trainers() {
    return(
        <div className="Trainers">
            <div className="row m-0">
                <TrainerCard />
            </div>
        </div>
    )
}