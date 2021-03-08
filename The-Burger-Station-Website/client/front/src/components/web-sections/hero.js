import React from "react";

export default function Hero() {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
                <div className="row">
                    <div className="col-lg-8">
                        <h1>Welcome to <span>Burger Station</span></h1>
                        <h2>Better cows = better burgers</h2>
                    </div>
                    <div className="col-lg-4 d-flex align-items-center justify-content-center" data-aos="zoom-in" data-aos-delay={200}>
                        <a href="https://www.youtube.com/watch?v=WpQQw6JG_lU" className="venobox play-btn" data-vbtype="video" data-autoplay="true" />
                    </div>
                </div>
            </div>
        </section >

    );
}