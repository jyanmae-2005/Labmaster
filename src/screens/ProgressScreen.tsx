import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PageTitle } from '../components/PageTitle';
import { Screen } from '../components/Screen';
import { SurfaceCard } from '../components/SurfaceCard';
import { labs } from '../data/labs';
import { useAppTheme } from '../theme/ThemeProvider';

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function ProgressScreen() {
  const { colors, completedLabIds } = useAppTheme();
  const [selectedDay, setSelectedDay] = useState(2);
  const completed = labs.filter((lab) => completedLabIds.includes(lab.id)).length;
  const percent = Math.round((completed / labs.length) * 100);

  return (
    <Screen>
      <PageTitle eyebrow="Consistency adds up" title="Your progress" subtitle="Every session gets you closer to your next big idea." />

      <SurfaceCard style={[styles.progressCard, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
        <View style={styles.progressTop}>
          <View>
            <Text style={styles.progressEyebrow}>COURSE COMPLETION</Text>
            <Text style={styles.progressValue}>{percent}<Text style={styles.percentSign}>%</Text></Text>
          </View>
          <View style={styles.progressBadge}>
            <Ionicons name="trending-up" size={20} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.progressCaption}>{completed} of {labs.length} labs completed</Text>
      </SurfaceCard>

      <View style={styles.sectionHeading}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>This week</Text>
        <Text style={[styles.sectionHint, { color: colors.muted }]}>Your activity</Text>
      </View>
      <SurfaceCard style={styles.weekCard}>
        <View style={styles.weekDays}>
          {weekDays.map((day, index) => {
            const selected = selectedDay === index;
            const active = index === 0 || index === 2 || index === 4;
            return (
              <Pressable
                key={`${day}-${index}`}
                accessibilityRole="button"
                accessibilityLabel={`Select day ${index + 1}`}
                accessibilityState={{ selected }}
                onPress={() => setSelectedDay(index)}
                style={styles.dayColumn}
              >
                <View style={[
                  styles.dayCircle,
                  { backgroundColor: selected ? colors.primary : active ? colors.primarySoft : colors.surfaceAlt },
                ]}>
                  {active ? (
                    <Ionicons name="checkmark" size={14} color={selected ? '#FFFFFF' : colors.primary} />
                  ) : (
                    <View style={[styles.dayDot, { backgroundColor: colors.border }]} />
                  )}
                </View>
                <Text style={[styles.dayText, { color: selected ? colors.primary : colors.muted }]}>{day}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={[styles.weekDivider, { backgroundColor: colors.border }]} />
        <View style={styles.weekSummary}>
          <View style={[styles.summaryIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="flame-outline" size={19} color={colors.primary} />
          </View>
          <View style={styles.summaryCopy}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>You&apos;re building a habit</Text>
            <Text style={[styles.summarySubtitle, { color: colors.muted }]}>3 active days this week</Text>
          </View>
          <Text style={[styles.streak, { color: colors.primary }]}>3 days</Text>
        </View>
      </SurfaceCard>

      <View style={styles.sectionHeading}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Milestones</Text>
      </View>
      <View style={styles.milestones}>
        <Milestone icon="rocket-outline" title="First steps" subtitle="Complete your first lab" done={completed > 0} />
        <Milestone icon="trophy-outline" title="Getting warmed up" subtitle="Complete 3 labs" done={completed >= 3} />
      </View>
    </Screen>
  );
}

function Milestone({ icon, title, subtitle, done }: { icon: string; title: string; subtitle: string; done: boolean }) {
  const { colors } = useAppTheme();
  return (
    <SurfaceCard style={styles.milestoneCard}>
      <View style={[styles.milestoneIcon, { backgroundColor: done ? colors.primarySoft : colors.surfaceAlt }]}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={19} color={done ? colors.primary : colors.muted} />
      </View>
      <View style={styles.milestoneCopy}>
        <Text style={[styles.milestoneTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.milestoneSubtitle, { color: colors.muted }]}>{subtitle}</Text>
      </View>
      <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={done ? colors.primary : colors.border} />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  progressCard: { padding: 21, marginBottom: 27 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressEyebrow: { fontSize: 9, letterSpacing: 1.1, fontWeight: '800', color: '#C9E6D3' },
  progressValue: { color: '#FFFFFF', fontSize: 43, lineHeight: 50, fontWeight: '900', letterSpacing: -1.5, marginTop: 6 },
  percentSign: { fontSize: 22 },
  progressBadge: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.15)' },
  track: { height: 8, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 5, marginTop: 19, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#F1C879', borderRadius: 5 },
  progressCaption: { fontSize: 11, color: '#D5E6DC', marginTop: 9, fontWeight: '600' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  sectionHint: { fontSize: 11 },
  weekCard: { padding: 17, marginBottom: 26 },
  weekDays: { flexDirection: 'row', justifyContent: 'space-between' },
  dayColumn: { alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  dayCircle: { width: 35, height: 35, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  dayDot: { width: 6, height: 6, borderRadius: 3 },
  dayText: { fontSize: 10, fontWeight: '800' },
  weekDivider: { height: 1, marginVertical: 16 },
  weekSummary: { flexDirection: 'row', alignItems: 'center' },
  summaryIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  summaryCopy: { flex: 1 },
  summaryTitle: { fontSize: 12, fontWeight: '800' },
  summarySubtitle: { fontSize: 10, marginTop: 3 },
  streak: { fontSize: 11, fontWeight: '800' },
  milestones: { gap: 10 },
  milestoneCard: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  milestoneIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  milestoneCopy: { flex: 1 },
  milestoneTitle: { fontSize: 12, fontWeight: '800' },
  milestoneSubtitle: { fontSize: 10, marginTop: 3 },
});
