import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div id="book-a-table">
                <section id="book-a-table" className="book-a-table">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title">
                            <h2>Sign In</h2>
                            <p>Come to the tasty side</p>
                        </div>
                        <form action="forms/book-a-table.php" className="php-email-form" >
                            <div className="form-row">
                                <div className="col-lg-6 col-md-6 form-group">
                                    <input type="text" name="username" className="form-control" id="username" placeholder="Your Username" data-rule="minlen:4" data-msg="Please enter at least 4 chars" autocomplete="off" />
                                    <div className="validate" />
                                </div>
                                <div className="col-lg-6 col-md-6 form-group">
                                    <input type="text" name="password" className="form-control" id="password" placeholder="Your Password" data-rule="minlen:4" data-msg="Please enter at least 4 chars" autocomplete="off" />
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="loading">Loading</div>
                                <div className="error-message" />
                                <div className="sent-message">Your booking request was sent. We will call back or send an Email to confirm your reservation. Thank you!</div>
                            </div>
                            <div className="text-center">
                                <button type="submit">
                                    Sign In
                                    </button>
                            </div>
                            <p></p>
                            <div className="text-center">
                                <Link to="/signup">
                                    <button type="submit">
                                        Want to join to the tasty side? Sign Up
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
}