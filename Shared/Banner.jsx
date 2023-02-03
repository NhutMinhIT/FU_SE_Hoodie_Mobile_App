import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import Swiper from "react-native-swiper";

var { width } = Dimensions.get('window')

const Banner = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        setBanner([
            "https://cdn.shopify.com/s/files/1/0696/8411/collections/Method_Hoodies_Banner_2000x.jpg",
            'https://cumbriasu.universityhoodies.org/Images/BannerUCSU%20Banner.png',
            'http://file.hstatic.net/1000253775/collection/banner_sp_t10.2019__10__8c9f634ff6fe4a7bbdb0af31342f17c6.jpg'])

        return () => {
            setBanner([])
        }
    }, [])

    return (
        <ScrollView>
            <View>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {banner.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode='contain'
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}>

                    </View>
                </View>
            </View >
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;