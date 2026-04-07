import React, { useEffect, useState } from 'react';
import './JokeGenerator.css'; // Assuming you have some CSS for animations

const JokeGenerator: React.FC = () => {
    const [joke, setJoke] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(true);

    const fetchJoke = async () => {
        setLoading(true);
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();
        setJoke(data.joke || `${data.setup} - ${data.delivery}`);
        setLoading(false);
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="joke-container">
            {loading ? <p>Loading...</p> : <p className="joke">{joke}</p>}
            <button onClick={fetchJoke}>Get Another Joke</button>
        </div>
    );
};

export default JokeGenerator;