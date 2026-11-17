import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/ThemeProvider';

export function Screen({ children }: PropsWithChildren) {
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { maxWidth: width >= 900 ? 900 : 600 }]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const spacing = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingTop: 18,
  },
});
