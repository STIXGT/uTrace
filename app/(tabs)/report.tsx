import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function Report() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText type='title'>Report View</ThemedText>
        </View>
    );
}
