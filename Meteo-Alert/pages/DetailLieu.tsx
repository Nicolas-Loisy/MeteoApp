import React from 'react';
import { View } from 'react-native';
import LayoutTemplate from '../components/organisms/LayoutTemplate';
import { useTranslation } from 'react-i18next';

const DetailLieu = () => {
  const { t } = useTranslation();

  return (
    <LayoutTemplate>
      <View>
      </View>
    </LayoutTemplate>
  );
};

export default DetailLieu;
