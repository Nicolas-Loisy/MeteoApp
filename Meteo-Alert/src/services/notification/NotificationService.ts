import * as Notifications from 'expo-notifications';
import { t } from 'i18next';
import Lieu from '../../models/valueObject/Lieu';
import Utilisateur from '../../models/entities/Utilisateur';

class NotificationService {
  static async sendNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: { seconds: 2 }, // Envoyer la notification 2 secondes après l'appel de la fonction (modifiable selon vos besoins)
    });
  }

  static async sendNotificationsWithConditions(lieuxFavoris: ReadonlyArray<Readonly<Lieu>>, utilisateur: Utilisateur) {
    const notificationsPromises = [];

    for (const lieu of lieuxFavoris) {
      await lieu.updateMeteo(utilisateur.getReglageApp().getSystemeMesure());
      const evenements = lieu.checkEvenements(); // Récupérer les événements pour ce lieu
      if (evenements !== null) {
        // Traiter les événements pour ce lieu
        for (const [evenement, estPresent] of Object.entries(evenements)) {
          if (estPresent) {
            console.log(`L'événement ${evenement} est présent pour le lieu ${lieu.nom}`);
            notificationsPromises.push(this.sendNotification(`${t('NotificationService.notif.title')} - ${lieu.nom}`, t(`NotificationService.notif.body.${evenement}`)));
          }
        }
      } else {
        console.error(`Impossible de récupérer les événements pour le lieu ${lieu.nom}`);
      }
    }

    // Attendre que toutes les notifications soient envoyées
    await Promise.all(notificationsPromises);
  }
}

export default NotificationService;
