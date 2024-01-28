import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Title from './Title';
import { t } from 'i18next';

interface TimeAgoTextProps {
  lastUpdateDate?: Date; // Date d'actualisation dynamique
  fontSize?: number;
}

const TimeAgoText: React.FC<TimeAgoTextProps> = ({ lastUpdateDate, fontSize = 20 }) => {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now !== undefined && lastUpdateDate !== undefined ) {
        const diffInMs = now.getTime() - lastUpdateDate.getTime();
        const diffInMin = Math.floor(diffInMs / (1000 * 60));
        console.log(diffInMin);
        setElapsedMinutes(diffInMin);
      }

    }, 60000);
  
    return () => clearInterval(intervalId);
  }, [lastUpdateDate]);
  

  return (
    <View style={styles.container}>
      <Title text={elapsedMinutes === 1 ? t("TimeAgoText.timeAgo", {elapsedMinutes}) : t("TimeAgoText.timeAgo_plurial", {elapsedMinutes})} fontSize={fontSize} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 5,
    }
});  

export default TimeAgoText;
