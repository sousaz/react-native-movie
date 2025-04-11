import { Stack } from 'expo-router'

export default Layout = () => {
    return(
        <Stack initialPath="/">
            <Stack.Screen
                name='index'
                options={{ title: "Home", headerShown: false }}
            />
            <Stack.Screen
                name='detail'
                options={{ title: "Detalhes" }}
            />
        </Stack>
    )
}