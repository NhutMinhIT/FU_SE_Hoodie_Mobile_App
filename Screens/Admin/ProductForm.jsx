import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import { ScrollView, Select } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message/lib/src/Toast";
import { MaterialIcons } from "@expo/vector-icons";
//Custome UI
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Error from '../../Shared/Error'
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
//API 
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))
        //Fetch API Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert('Category Error .....!'));

        //Image Picker
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera rool permission to make this work !!")
                }
            }
        })();
        return () => {
            setCategories([])
        }
    }, [])

    // const pickImage = async uri => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     });
    //     if (!result.canceled) {
    //         setMainImage(result.uri);
    //         setImage(result.uri)
    //     }
    // }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setMainImage(result.assets[0].uri);
            setImage(result.assets[0].uri)

        }
    };
    const handleAddProduct = () => {
        if (
            name == "" ||
            brand == '' ||
            price == '' ||
            description == '' ||
            category == '' ||
            countInStock == ''
        ) {
            setError('Please !! Enter all entries ')
        }

        let formData = new FormData();

        const newImageUri = "file:///" + image.split("file:/").join("");
        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        formData.append("name", name)
        formData.append("brand", brand)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("countInStock", countInStock)
        formData.append("rating", rating)
        formData.append("numReviews", numReviews)
        formData.append("isFeatured", isFeatured)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .post(`${baseURL}products`, formData, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    ast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Added New Product",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            }).catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                })
                console.log(error)
            })
    }
    //fetch API ADD Products
    return (

        <FormContainer>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: mainImage }} />
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text>Brand:</Text>
            </View>
            <Input
                placeholder='Brand'
                name='brand'
                id='brand'
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View style={styles.label}>
                <Text>Name:</Text>
            </View>
            <Input
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Input
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />
            <View style={styles.label}>
                <Text>Count in Stock</Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
            <View style={styles.label}>
                <Text>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Select
                mode='dropdown'
                iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                style={{ width: undefined }}
                minWidth='300'
                minHeight='15'
                placeholder="Select you Category"
                selectedValue={pickerValue}
                placeholderStyle={{ color: '007aff' }}
                // placeholderTextColor={{ color: '007aff' }}               
                placeholderIconColor="#007aff"
                onValueChange={(e) => [setPickerValue(e), setCategory(e)]}

            >
                {categories.map((c) => {
                    return <Select.Item
                        key={c.id}
                        label={c.name}
                        value={c.id}
                    />
                })}
            </Select>
            {err ? <Error message={err} /> : null}
            <View style={styles.buttonContainer}>
                <EasyButton
                    large
                    primary
                    onPress={() => handleAddProduct()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})
export default ProductForm;