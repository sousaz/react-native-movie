import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getMovieDetails } from "../service/api"
import NoImageComponent from "./components/noImageComponent"

export default Detail = () => {
    const [movie, setMovie] = useState(null);
    const { id } = useLocalSearchParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovie = async () => {
        try {
            setLoading(true);
            setError(null);
            const results = await getMovieDetails(id);
            setMovie(results || []);
        } catch (error) {
            setMovie([])
            setError(error.message || 'Não foi possível carregar os filmes');
            Alert.alert('Erro', error.message || 'Não foi possível carregar os filmes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie()
    }, [])

    return (
        <View styles={styles.container}>
            {loading && <ActivityIndicator size="large" color="#333" />}
            {error && <Text style={styles.error}>{error}</Text>}
            {movie && (
                <ScrollView contentContainerStyle={styles.container}>
                    {movie.Poster !== 'N/A' ? <Image
                        source={{ uri: movie.Poster }}
                        style={styles.poster}
                        /> : <NoImageComponent w={200} h={250}/>}

                    <Text style={styles.title}>{movie.Title}</Text>

                    <View style={styles.card}>
                        <Text style={styles.label}>Gênero:</Text>
                        <Text style={styles.text}>{movie.Genre}</Text>

                        <Text style={styles.label}>Diretor:</Text>
                        <Text style={styles.text}>{movie.Director}</Text>

                        <Text style={styles.label}>Atores:</Text>
                        <Text style={styles.text}>{movie.Actors}</Text>

                        <Text style={styles.label}>Sinopse:</Text>
                        <Text style={styles.text}>{movie.Plot}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    poster: {
        width: 200,
        height: 250,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    text: {
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        width: '100%',
    },
});
