import { View, Text, StyleSheet } from 'react-native'

const NoImageComponent = ({ w, h }) => {
    return (
        <View style={[styles.container, { maxWidth: w, MaxHeight: h }]}>
            <Text style={styles.text}>Sem imagem disponível</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#333',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
})

export default NoImageComponent
