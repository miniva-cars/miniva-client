import { memo } from 'react';
import { ImageStyle, Platform, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FlashList } from '@shopify/flash-list';

import { Image, ImageCarousel, Paper, Spacer, Typography } from '@components/common';
import { RouteNames } from '@navigation';
import { Car } from '@models';

import { useStyles } from './styles';

interface Props {
  car: Car;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: (id: number) => Promise<void>;
}

function Component(props: Props) {
  const { car, style } = props;
  const { id, model, price, car_photos } = car;

  const { navigate } = useNavigation();

  const styles = useStyles();

  const showDetails = () => {
    navigate(RouteNames.car, { carId: id });
  };

  const renderImage = ({ item }: { item: string }) => (
    <Pressable onPress={showDetails}>
      <Image uri={item} style={styles.image as ImageStyle} />
    </Pressable>
  );

  const renderSeparator = () => {
    return <Spacer horizontal={'xs'} />;
  };

  return (
    <Paper style={style} onPress={showDetails}>
      <View style={styles.spacedRow}>
        <View style={styles.title}>
          <Spacer horizontal={'xs'} />
          <Typography style={styles.mainInfo} text={model} />
        </View>
      </View>
      <Spacer vertical={'s'} />
      <View onStartShouldSetResponder={() => true}>
        {Platform.OS === 'web' ? (
          <ImageCarousel images={car_photos} renderImage={renderImage} style={styles.images} />
        ) : (
          <FlashList
            horizontal
            data={car_photos}
            estimatedItemSize={10}
            renderItem={renderImage}
            ItemSeparatorComponent={renderSeparator}
          />
        )}
      </View>
      <Spacer vertical={'s'} />
      <View style={styles.spacedRow}>
        <Typography style={styles.mainInfo} text={`${price} $`} />
      </View>
    </Paper>
  );
}

export const CarCard = memo(Component);
