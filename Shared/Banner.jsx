import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import Swiper from "react-native-swiper";

var { width } = Dimensions.get('window')

const Banner = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        setBanner([
            'https://images.workngear.com/images/MediaContents/CategoryBannerMediaContents/OuterWear-PLP-MediaContents/Outerwear_Sweatshirts_Hoodies_Banner_m540031.jpg',

            'https://cumbriasu.universityhoodies.org/Images/BannerUCSU%20Banner.png',
            'https://cdn.shopify.com/s/files/1/0390/3389/files/hoodie_banner.jpg?16918640409251603638',
            'https://img.meta.com.vn/Data/image/2022/03/02/banner-8-3-37.JPG'])

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
                    {/* <View style={{ height: 20 }}>

                    </View> */}
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
        marginTop: 0
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;