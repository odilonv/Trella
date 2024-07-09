const { exec, spawn } = require('child_process');

// Fonction pour exécuter une commande shell et renvoyer une promesse
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur: ${stderr}`);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Fonction pour démarrer un processus en arrière-plan
const spawnProcess = (command, args) => {
  const child = spawn(command, args, { stdio: 'inherit', shell: true });
  child.on('error', (error) => {
    console.error(`Erreur lors du démarrage du processus: ${error.message}`);
  });
  return child;
};

const startServer = async () => {
  try {
    console.log('Démarrage des conteneurs Docker...');
    await execCommand('docker-compose up -d');

    console.log('Attente de 2 secondes pour que MySQL démarre...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Démarrage du serveur Node.js...');
    const serverProcess = spawnProcess('node', ['backend/Server.js']);

    console.log('Récupération de l\'ID du conteneur MySQL...');
    const containerId = await execCommand('docker ps -q -f name=weloot-db-1');
    if (!containerId) {
      throw new Error('Le conteneur MySQL n\'a pas été trouvé');
    }

    console.log('Configuration de MySQL...');
    await execCommand(`docker exec -i ${containerId} mysql -u root -padmin -e "SET GLOBAL log_bin_trust_function_creators = 1;"`);

    console.log('Le serveur est en cours d\'exécution.');

    // Attendre que le processus du serveur se termine (facultatif)
    serverProcess.on('close', (code) => {
      console.log(`Le serveur Node.js s'est arrêté avec le code ${code}`);
    });

  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
  }
};

startServer();
