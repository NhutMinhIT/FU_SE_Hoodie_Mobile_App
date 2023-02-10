import React from 'react'
import { View, Dimensions, StyleSheet, Button, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import {
  Container,
  Text,
  HStack,
  VStack, Heading,
  Avatar,
  Box,
  Stack,
  List,
  ScrollView,

} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SwipeListView } from 'react-native-swipe-list-view'

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions'

import CartItem from './CartItem';

import { useNavigation } from '@react-navigation/native';
var { height, width } = Dimensions.get('window')


const Cart = (props) => {
  const navigation = useNavigation();

  var total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  })
  return (
    <>
      <Heading size='xl'
        style={{ alignSelf: 'center', marginBottom: 10 }}>My Cart</Heading>

      <View style={{ flexDirection: 'row' }}>

        <Text style={styles.price}>${total}</Text>

        <Button title='Clear'
          onPress={() => props.clearCart()}
        />
        <Button title='Checkout'
          onPress={() => navigation.navigate("Checkout")
          }
        />
      </View>
      {props.cartItems.length ? (
        <ScrollView>

          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => (
              <CartItem item={data} />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"red"} size={30} />

                </TouchableOpacity>

              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={30}
            leftOpenValue={75}
            stopLeftSwipe={-20}
            rightOpenValue={-40}
          />

        </ScrollView>

      ) : (
        <Stack style={styles.emptyContainer}>
          <Text>Looks like you cart is empty</Text>
          <Text>AddProduct to your cart to get started</Text>
        </Stack>
      )
      }

    </>
  )
}
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}


const styles = StyleSheet.create({
  emptyContainer: {
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    fontWeight: '900',
    marginRight: '35%',
    marginTop: 10,
    marginLeft: 10
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)