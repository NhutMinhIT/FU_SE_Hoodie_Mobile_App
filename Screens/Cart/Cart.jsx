import React, { useContext, useEffect } from 'react'
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
import Authglobal from '../../Context/store/AuthGlobal'
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import CartItem from './CartItem';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
var { height, width } = Dimensions.get('window')


const Cart = (props) => {
  const navigation = useNavigation();
  const context = useContext(Authglobal);

  // Add this
  const [productUpdate, setProductUpdate] = useState()
  const [totalPrice, setTotalPrice] = useState()
  useEffect(() => {
    getProducts()
    return () => {
      setProductUpdate()
      setTotalPrice()
    }
  }, [props])

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach(cart => {
      axios
        .get(`${baseURL}products/${cart.product}`)
        .then(data => {
          products.push(data.data)
          setProductUpdate(products)
          var total = 0;
          products.forEach(product => {
            const price = (total += product.price)
            setTotalPrice(price)
          });
        })
        .catch(e => {
          console.log(e)
        })
    })
  }
  return (
    <>
      {productUpdate ? (
        <View>
          <Heading style={{ alignSelf: "center" }}>Cart</Heading>
          <View style={{ flexDirection: 'row' }}>

            <Text style={styles.price}>$ {totalPrice}</Text>

            <EasyButton
              danger
              medium
              onPress={() => props.clearCart()}
            >
              <Text style={{ color: 'white' }}>Clear</Text>
            </EasyButton>
            {context.stateUser.isAuthenticated ? (
              <EasyButton
                primary
                medium
                onPress={() => props.navigation.navigate('Checkout')}
              >
                <Text style={{ color: 'white' }}>Checkout</Text>
              </EasyButton>
            ) : (
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('Login')}
              >
                <Text style={{ color: 'white' }}>Login</Text>
              </EasyButton>
            )}
          </View>
          <ScrollView>
            <SwipeListView
              data={productUpdate}
              renderItem={(data) => (
                <CartItem item={data} />
              )}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity
                    style={styles.hiddenButton}

                  >
                    <Icon name="trash" color={"red"} size={30}
                      onPress={() => props.removeFromCart(data.item)}

                    />

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
        </View>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )
      }
    </>
  );
};
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