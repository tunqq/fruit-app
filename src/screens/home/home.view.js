import React, {useRef, useState, useCallback} from 'react';
import styles from './home.style';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Logo} from '../../components';
import {currencyFormat} from '../../helpers/currencyFormat';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeView = ({
  listCategories,
  idChooseCategories,
  onPressItemCategories,
  listProduct,
  onPressItemProduct,
  isLoading,
  isLoadingCate,
  textSearch,
  onChangeTextSearch,
}) => {
  const renderItemCategories = ({item}) => {
    const onPressItemCategoriesView = () => {
      onPressItemCategories(item.id);
    };

    return (
      <TouchableOpacity
        onPress={onPressItemCategoriesView}
        style={[
          styles.viewItemCategories,
          idChooseCategories == item.id && styles.backgroundBlue,
        ]}>
        <Image
          resizeMode="contain"
          style={styles.imageItemLogo}
          source={{uri: item.logo}}
        />
        <Text
          style={[
            styles.textItemName,
            idChooseCategories == item.id && styles.colorTextWhite,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyCategories = useCallback(
    () => (
      <>
        <SkeletonPlaceholder>
          <View style={styles.viewItemCategories} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={styles.viewItemCategories} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={styles.viewItemCategories} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={styles.viewItemCategories} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={styles.viewItemCategories} />
        </SkeletonPlaceholder>
      </>
    ),
    [],
  );

  const renderItemProducts = ({item}) => {
    const onPressItemProductView = () => {
      onPressItemProduct(item);
    };
    return (
      <TouchableOpacity
        style={styles.viewItemProduct}
        onPress={onPressItemProductView}>
        <Image style={styles.itemImageProduct} source={{uri: item.image}} />
        <Text style={styles.textItemProduct}>{item.name}</Text>
        <Text style={styles.textItemProduct}>
          {'RM '} {currencyFormat(item.priceKg)} {' / per pkg'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      <Logo style={styles.viewLogo} />
      <Text style={styles.textContent}>
        {'Your best marketplace for your fruit'}
      </Text>
      <View style={styles.viewCategories}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listCategories}
          renderItem={renderItemCategories}
          ListEmptyComponent={renderEmptyCategories}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 15,
        }}>
        <Text style={styles.textResult}>Result:</Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 2,
            marginRight: 10,
          }}>
          <FontAwesome size={20} name={'search'} color="black" />
          <TextInput
            onChangeText={onChangeTextSearch}
            value={textSearch}
            placeholderTextColor={'grey'}
            placeholder="Search"
            style={{width: 200, height: 40, color: 'black'}}
          />
        </View>
      </View>

      {isLoading ? (
        <>
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: 25,
              marginHorizontal: 25,
            }}
            numColumns={2}
            data={[0, 1, 2, 3]}
            renderItem={() => (
              <SkeletonPlaceholder>
                <View style={styles.viewItemProduct} />
              </SkeletonPlaceholder>
            )}
          />
        </>
      ) : (
        <FlatList
          ListEmptyComponent={() => <Text style={{color:'black', textAlign:'center', marginTop:20}}>Không có sản phẩm!</Text>}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 25,
            marginHorizontal: 25,
          }}
          numColumns={2}
          data={listProduct}
          renderItem={renderItemProducts}
        />
      )}
    </View>
  );
};

export default React.memo(HomeView);
