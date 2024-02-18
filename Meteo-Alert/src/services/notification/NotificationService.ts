import * as Notifications from 'expo-notifications';

// Fonction pour envoyer une notification avec un contenu personnalisé
async function sendNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: 2 }, // Envoyer la notification 2 secondes après l'appel de la fonction (modifiable selon vos besoins)
  });
}

export async function sendNotificationsWithConditions() {
  const currentDate = new Date();

  await sendNotification("Bonjour!", "C'est le matin.");
  

}