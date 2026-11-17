import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { PageTitle } from '../components/PageTitle';
import { Screen, spacing } from '../components/Screen';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppTheme } from '../theme/ThemeProvider';
import { labs } from '../data/labs';

export function HomeScreen() {
  const router = useRouter();
  const { colors, completedLabIds } = useAppTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 600 ? 2 : 1;
  const completion = Math.round((completedLabIds.length / labs.length) * 100);

  return (
    <Screen>
      <View style={styles.topline}>
        <View style={styles.brandMark}>
          <Ionicons name="flask" size={18} color="#FFFFFF" />
        </View>
        <Text style={[styles.brand, { color: colors.text }]}>LABMASTER</Text>
        <View style={styles.toplineSpacer} />
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>S</Text>
        </View>
      </View>

      <PageTitle eyebrow="Your learning space" title="Good morning, Student" subtitle="Ready to build something great today?" />

      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroEyebrow}>YOUR NEXT STEP</Text>
          <Text style={styles.heroTitle}>Keep your momentum going.</Text>
          <Text style={styles.heroSubtitle}>Pick up where you left off and turn ideas into apps.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/labs')}
            style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
          >
            <Text style={styles.heroButtonText}>Explore labs</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.heroIcon}>
          <Ionicons name="sparkles" size={30} color={colors.accent} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <SurfaceCard style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="checkmark-done-outline" size={19} color={colors.primary} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{completedLabIds.length}<Text style={styles.statDivider}> / 4</Text></Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Labs completed</Text>
        </SurfaceCard>
        <SurfaceCard style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FFF2D9' }]}>
            <Ionicons name="trophy-outline" size={19} color="#AC7832" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{completion}%</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Course progress</Text>
        </SurfaceCard>
      </View>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your learning path</Text>
          <Text style={[styles.sectionCaption, { color: colors.muted }]}>Small steps, real progress</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push('/labs')}>
          <Text style={[styles.link, { color: colors.primary }]}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.labGrid}>
        {labs.slice(0, columns === 2 ? 4 : 2).map((lab) => {
          const isComplete = completedLabIds.includes(lab.id);
          return (
            <Pressable
              key={lab.id}
              accessibilityRole="button"
              onPress={() => router.push('/labs')}
              style={[styles.labTile, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.labIcon, { backgroundColor: `${lab.color}20` }]}>
                <Ionicons name={lab.icon as keyof typeof Ionicons.glyphMap} size={20} color={lab.color} />
              </View>
              <View style={styles.labInfo}>
                <Text style={[styles.labNumber, { color: colors.muted }]}>LAB {lab.number}</Text>
                <Text style={[styles.labTitle, { color: colors.text }]} numberOfLines={1}>{lab.title}</Text>
              </View>
              <Ionicons
                name={isComplete ? 'checkmark-circle' : 'chevron-forward'}
                size={19}
                color={isComplete ? colors.primary : colors.muted}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.footerSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  topline: {
    ...spacing.row,
    marginBottom: 28,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#28654D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  brand: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  toplineSpacer: { flex: 1 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '800' },
  hero: {
    minHeight: 203,
    borderRadius: 23,
    padding: 22,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroCopy: { flex: 1, maxWidth: 380 },
  heroEyebrow: {
    color: '#C9E6D3',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 9,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
    letterSpacing: -0.3,
    maxWidth: 260,
  },
  heroSubtitle: {
    color: '#D5E6DC',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
    maxWidth: 260,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginTop: 15,
  },
  heroButtonText: { color: '#28654D', fontSize: 12, fontWeight: '800' },
  heroIcon: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 8,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 27 },
  statCard: { flex: 1, minWidth: 0, padding: 15 },
  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: { fontSize: 21, fontWeight: '800', letterSpacing: -0.5 },
  statDivider: { fontSize: 14, fontWeight: '600', color: '#89958E' },
  statLabel: { fontSize: 11, marginTop: 3 },
  sectionHeading: {
    ...spacing.row,
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  sectionCaption: { fontSize: 12, marginTop: 3 },
  link: { fontSize: 12, fontWeight: '800', paddingVertical: 8, paddingLeft: 10 },
  labGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  labTile: {
    flex: 1,
    minWidth: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 13,
  },
  labIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  labInfo: { flex: 1, minWidth: 0 },
  labNumber: { fontSize: 9, letterSpacing: 0.7, fontWeight: '700' },
  labTitle: { fontSize: 12, fontWeight: '700', marginTop: 3 },
  footerSpace: { height: 10 },
});
