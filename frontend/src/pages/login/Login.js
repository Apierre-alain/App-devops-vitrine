import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import './Login.css';

function Login() {
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
          const response = await api.post('/users/login', {
            login: email,
            password
          });
          const { token, user } = response.data;
          if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
          } else {
            setError('Réponse serveur invalide');
          }
        } catch (err) {
            // Gérer les différents types d'erreurs
            if (err.response) {
              // Le serveur a répondu avec un code d'erreur
              setError(err.response.data?.error || 'Email ou mot de passe incorrect');
            } else if (err.request) {
                // La requête a été envoyée mais pas de réponse
                setError('Impossible de contacter le serveur');
            } else {
                // Erreur lors de la configuration de la requête
                setError('Erreur lors de la connexion');
            }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="login">
        <div className="login-splash"></div>
        <div className="login-form">
          <Link to="/">DevOps</Link>
          <h1>Connexion</h1>
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
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
          <p>Pas de compte ? <Link to="/register">Créer un compte</Link></p>
        </div>
      </div>
    );
}   

export default Login;