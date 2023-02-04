import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Badge, Box, Center, FlatList, Flex, HStack, Stack, Text, View, VStack, } from 'native-base';

const CategoryFilter = (props) => {

    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f5f2eb" }}
        >
            <HStack>
                <View style={{ margin: 0, padding: 0, borderRadius: 0, flexDirection: 'row' }}>

                    <TouchableOpacity
                        key={1}
                        onPress={() => {
                            props.categoryFilter('all'), props.setActive(-1)
                        }}
                    >
                        <HStack>
                            <Badge
                                style={[styles.center, { margin: 5 },
                                props.active == -1 ? styles.active : styles.inactive
                                ]}
                            >

                                <Text style={{ color: 'white' }}>All</Text>
                            </Badge>
                        </HStack>


                    </TouchableOpacity>

                    {props.categories.map((item) => (

                        <TouchableOpacity
                            key={item._id}
                            onPress={() => {
                                props.categoryFilter(item._id),
                                    props.setActive(props.categories.indexOf(item))
                            }}
                        >
                            <VStack>
                                <Badge
                                    style={[styles.center,

                                    { margin: 5 },
                                    props.active == props.categories.indexOf(item) ? styles.active
                                        : styles.inactive]}
                                >
                                    <Text style={{ color: 'white' }}>{item.name}</Text>
                                </Badge>
                            </VStack>
                        </TouchableOpacity>

                    ))}
                </View>
            </HStack>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#f5f2eb',

    },
    active: {
        backgroundColor: '#f7cd92',
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;