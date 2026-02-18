# Mately Tasks

Ce projet constitue la partie Frontend du test technique. Il s'agit d'un prototype d'application mobile permettant de suivre en temps réel l'évolution de tâches collaboratives.

## Aperçu des fonctionnalités

* **Affichage dynamique :** Liste des tâches fluide gérée via une `FlatList` optimisée.
* **Synchronisation:** Polling intelligent toutes les 5 secondes pour récupérer les nouvelles tâches.
* **Simulation :** Bouton d'action permettant de déclencher le simulateur.
* **UX/UI:** Génération dynamique d'avatars utilisateurs et badges de couleurs selon le statut de la tâche (Todo, In Progress, Done).

≈

## Architecture et Choix Techniques

Le projet est développé avec **React Native (Expo)** et **TypeScript** (mode strict) pour garantir la robustesse du code. L'architecture a été pensée de manière modulaire :

```
src/
├── api/          # Configuration Axios et isolation des appels réseau
├── components/   # Composants UI réutilisables
├── hooks/        # Logique métier et cycle de vie
├── models/       # Interfaces TypeScript pour le typage des données
└── App.tsx       # Point d'entrée
```

## Spécification 
Pour répondre à la contrainte "Pas de fetch redondant si pas de nouvelle tâche" et "Ajout sans recharger toute la liste", le polling a été optimisé de façon à ce que:

- Utilisation d'un useRef pour stocker la date (createdAt) de la dernière tâche reçue. Les appels API suivants n'utilisent que cette date comme paramètre after pour ne télécharger que les nouveautés.

- Les nouvelles tâches sont ajoutées à l'état existant via setTasks(prev => [...prev, ...newTasks]), évitant ainsi le re render complet de l'interface.

## Installation et Lancement
1. Cloner le projet et installer les dépendances :

```Bash
git clone git@github.com:Mately-tasks/Frontend.git
cd Frontend
npm install
```
2. Configuration de l'URL de l'API :
Ouvrez le fichier `src/api/taskService.ts`.

- Si vous testez sur un Simulateur iOS (Mac), vous pouvez utiliser : http://localhost:3000.

- Si vous testez sur un Téléphone Physique via Expo Go, vous DEVEZ remplacer l'URL par l'adresse IP locale de votre ordinateur (ex: http://192.168.1.X:3000). Assurez-vous que l'ordinateur et le téléphone sont sur le même réseau Wi-Fi.

3. Lancer l'application :

```Bash
npx expo start -c
```
Appuyez sur `i` pour ouvrir le simulateur iOS, ou scannez le QR Code avec l'application Expo Go de votre smartphone.