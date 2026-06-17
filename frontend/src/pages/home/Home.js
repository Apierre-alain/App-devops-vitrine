import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="home">
            <div className="home-header">
                <h1>RET'INFO</h1>
                <div className="home-buttons">
                    <button onClick={() => navigate('/login')}>Se connecter</button>
                    <button onClick={() => navigate('/register')}>S'inscrire</button>
                </div>
            </div>
            <div className="home-body">
                <h1 className="title-body">Ret'info</h1>
                <p>Partez l'esprit tranquille sans rien n'oublier.</p>
                <p>Listez, respirez</p>
            </div>
        </div>
    );
}

export default Home;