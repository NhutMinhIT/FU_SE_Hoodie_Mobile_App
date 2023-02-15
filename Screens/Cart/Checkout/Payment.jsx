import { View } from 'react-native'
import React from 'react'
import {
    Container,
    List,
    Radio,
    Text,
    Select,
    Icon,
    VStack,
    Heading,
    HStack,
    FlatList,
    Stack,
    Button,

} from 'native-base'
import { useState } from 'react'

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3 },

]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 }

]

const Payment = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();

    return (

        <View>
            <Heading size='lg'>Choose your payment method</Heading>

            {methods.map((item, index) => {
                return (

                    <List>
                        <Stack>
                            <HStack>
                                <Text onPress={() => setSelected(item.value)} key={item.name}>{item.name}</Text>
                            </HStack>

                            <Radio selected={selected == item.value} />

                        </Stack>
                    </List>
                )
            })}
            {selected == 3 ? (
                <Select
                    mode="dropdown"
                    iosIcon={<Icon name={"arrow-down"} />}
                    headerStyle={{ backgroundColor: 'orange' }}
                    headerBackButtonTextStyle={{ color: '#fff' }}
                    headerTitleStyle={{ color: '#fff' }}
                    selectedValue={card}
                    onValueChange={(x) => setCard(x)}
                >
                    {paymentCards.map((c, index) => {
                        return <Select.Item
                            key={c.name}
                            label={c.name}
                            value={c.name} />
                    })}
                </Select>
            ) : null}
            <View style={{ marginTop: 60, alignSelf: 'center' }}>
                <Button
                    title={"Confirm"}
                    onPress={() => props.navigation.navigate("Confirm", { order })}

                >Confirm</Button>
            </View>
        </View>
    )
}

export default Payment