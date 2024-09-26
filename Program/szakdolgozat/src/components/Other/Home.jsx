import React from 'react';
import "./Home.css";
import fitjim from "../../resource/logo.jpg"

export function Home() {
  return (
    <>
    <div>
        <h2>Üdvözöl a Fitnesz Felszerelések Webáruháza!</h2>
        <p>Itt megtalálod a legjobb edzőtermi felszereléseket!</p>
        <div className="container">
            <img src={fitjim} alt="Logo" className="centered-image" />
        </div>
    </div>
    </>
  );
};
