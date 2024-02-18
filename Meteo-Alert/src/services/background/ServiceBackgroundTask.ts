import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import NotificationService from '../notification/NotificationService';
import Lieu from '../../models/valueObject/Lieu';
import Utilisateur from '../../models/entities/Utilisateur';

const BACKGROUND_FETCH_TASK = 'background-fetch';

class ServiceBackgroundTask {
  static async registerBackgroundFetchAsync(lieuxFavoris: ReadonlyArray<Readonly<Lieu>>, utilisateur: Utilisateur) {
    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
      const now = Date.now();
      console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
      
      await NotificationService.sendNotificationsWithConditions(lieuxFavoris, utilisateur);
      console.log("LA NOTIF !");
      
      return BackgroundFetch.BackgroundFetchResult.NewData;
    });

    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 1, // 1 minutes  pour les tests => TODO changer pour 30 min
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
}

export default ServiceBackgroundTask;
