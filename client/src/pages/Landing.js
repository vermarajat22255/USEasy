import React from 'react';
import main from '../assets/images/main-alternative.svg'
import Wrapper from '../assets/wrappers/LandingPage.js';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>job <span>Tracking</span> app</h1>
                    <p>
                        I'm baby vibecession photo booth cold-pressed, pickled affogato DIY artisan taxidermy. Knausgaard irony flexitarian distillery food truck. Heirloom tumblr typewriter humblebrag, praxis iPhone PBR&B pabst DSA seitan polaroid vice art party gochujang. Cold-pressed man bun cronut affogato, mukbang chicharrones keytar air plant skateboard taxidermy hammock food truck post-ironic scenester small batch. Man braid slow-carb trust fund sustainable, four dollar toast praxis waistcoat gastropub crucifix brunch tbh blue bottle jianbing. Vexillologist put a bird on it shabby chic, humblebrag ascot dreamcatcher twee 8-bit.
                    </p>
                    <Link to="/register" className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={ main } alt='US EASY' className='img main-img' />
            </div>
        </Wrapper>

    )
}
export default Landing
