import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { getBestMovies, getPopularMovies, getMarvelMovies } from "../api/TmdbApi";
import MovieCard from "../components/MovieCard";
import Bouton from "../components/Bouton";
import LinearGradient from "react-native-linear-gradient";
import Elilipse from "../components/Elilipse";
import BoutonLarg from "../components/BoutonLarg";
import ParagraphLast from "../components/ParagraphLast";
import NavbarHaut from "../components/navigation/NavbarHaut";
import { useTheme } from "@react-navigation/native";

const image = require('../assets/images/unsplash_UC0HZdUitWY.png');
const blackfriday = require('../assets/images/blackfriday.png');

const HomeScreen = () => {
    const [popularMovies, setMovies] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);
    const [marvelMovies, setMarvelMovies] = useState([]);
    const [selectedEllipse, setSelectedEllipse] = useState(0);
    const { colors } = useTheme();

    const handleEllipsePress = (index: any) => {
        setSelectedEllipse(index);
    };

    useEffect(() => {
        async function fetchData() {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);

          const bestMovies = await getBestMovies();
          setBestMovies(bestMovies);

          const marvelMovies = await getMarvelMovies();
          setMarvelMovies(marvelMovies);
        }
        fetchData();
    }, []);

    // mode sombre
    const theme = useColorScheme();
    const isDark = theme === 'dark';
    
    return (
        <ScrollView style={isDark ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Image source={image} style={styles.imageStyle} />
            <NavbarHaut />
            <View style={styles.textContainer}>
                <Text style={{paddingHorizontal: 10, fontSize: 15, color: colors.text}}>My List</Text>
                <Text style={{paddingHorizontal: 10, fontSize: 15, color: colors.text}}>Discover</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Bouton text="WishList" bgColor="#333333" />
                <Bouton text="Details" bgColor="#F2C94C" />
            </View>
            <View style={styles.ellipseContainer}>
                {
                    [0, 1, 2, 3, 4].map((index) => (
                        <TouchableOpacity key={index} onPress={() => handleEllipsePress(index)}>
                            <Elilipse isSelected={selectedEllipse === index} />
                        </TouchableOpacity>
                    ))
                }
            </View>

            <LinearGradient 
                colors={isDark ? ['black', 'transparent'] :  ['#FFFFFF', 'transparent']}
                style={styles.gradiantContainer}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
            />
            
            <View style={styles.titreContainer}>
                <Text style={[styles.titre, {color: colors.text}]}>Popular Movies</Text>
                <Text style={styles.seeMore}>See more</Text>
            </View>
            <FlatList
                data={popularMovies}
                renderItem={({item}) => (
                    <MovieCard movie={item} textColor={colors.text} />
                )}
                horizontal={true}
            />

            <View style={styles.titreContainer}>
                <Text style={[styles.titre, {color: colors.text}]}>Marvel Studio</Text>
                <Text style={styles.seeMore}>See more </Text>
            </View>
            <FlatList
                data={marvelMovies}
                renderItem={({item}) => (
                    <MovieCard movie={item} textColor={colors.text} />
                )}
                horizontal={true}
            /> 

            <View style={styles.titreContainer}>
                <Text style={[styles.titre, {color: colors.text}]}>Best Movies</Text>
                <Text style={styles.seeMore}>See more</Text>
            </View>
            <FlatList
                data={bestMovies}
                renderItem={({item}) => (
                    <MovieCard movie={item} textColor={colors.text} />
                )}
                horizontal={true}
            />

            <View style={styles.lastBlock}>
                <Image source={blackfriday} style={styles.blackfridayStyle} />
                <ParagraphLast textColor={colors.text} />
                <BoutonLarg text="Check Details" bgColor="#F2C94C" />
            </View> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageStyle: {
        width: '100%'
    },
    marginLeft: {
        marginLeft: 30
    },
    titre: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    titreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
        marginBottom: 10
    },
    seeMore: {
        color: '#F2C94C',
        paddingHorizontal: 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 0,
        marginTop: 0,
        marginBottom: 10
    },
    gradiantContainer: {
        width: '100%',
        height: 130,
        position: 'absolute',
        top: 300
    },
    ellipseContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    lastBlock: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20
    },
    blackfridayStyle: {
        width: '90%'
    }
})

export default HomeScreen;