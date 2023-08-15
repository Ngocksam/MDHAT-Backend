const express = require('express');
const app = express();
app.use(express.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
});

app.post('/login', (req, res) => {
  // Récupérez les informations d'identification de l'utilisateur à partir du corps de la requête
  const { username, password } = req.body;

  // Vérifiez les informations d'identification de l'utilisateur dans la base de données
  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results) => {
      if (error) {
        // Gérez les erreurs de connexion à la base de données
        res.status(500).json({ error: 'Database error' });
      } else if (results.length > 0) {
        // Si un utilisateur correspondant aux informations d'identification fournies est trouvé, renvoyez un jeton d'authentification
        res.json({ token: 'fake-token' });
      } else {
        // Si aucun utilisateur ne correspond aux informations d'identification fournies, renvoyez une erreur
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  );
});

app.get('/admin', (req, res) => {
  // Exécutez une requête SQL pour récupérer les données des administrateurs
  connection.query('SELECT * FROM admin', (error, results) => {
    if (error) {
      // Gérez les erreurs de connexion à la base de données
      res.status(500).json({ error: 'Database error' });
    } else {
      // Renvoyez les données des administrateurs
      res.json(results);
    }
  });
});

app.get('/users', (req, res) => {
  // Exécutez une requête SQL pour récupérer les données des utilisateurs
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      // Gérez les erreurs de connexion à la base de données
      res.status(500).json({ error: 'Database error' });
    } else {
      // Renvoyez les données des utilisateurs
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('Backend listening on port 3000');
});
