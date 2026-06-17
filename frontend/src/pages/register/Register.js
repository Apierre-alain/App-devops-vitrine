import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/users/register', {
                login: email,
                password
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur d\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <div className="register-splash"></div>
            <div className="register-form">
                <Link to="/">DevOps</Link>
                <h1>Inscription</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <label htmlFor="password">Mot de passe: </label>
                    <div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>
                           {loading ? 'Inscription...' : 'S\'inscrire'}
                        </button>
                    </div>
                </form>
                <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
            </div>
        </div>
    );
}

export default Register;