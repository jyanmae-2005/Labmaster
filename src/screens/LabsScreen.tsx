import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PageTitle } from '../components/PageTitle';
import { Screen } from '../components/Screen';
import { SurfaceCard } from '../components/SurfaceCard';
import { labs } from '../data/labs';
import { useAppTheme } from '../theme/ThemeProvider';

type Filter = 'All' | 'Foundations' | 'Building';

export function LabsScreen() {
  const { colors, completedLabIds, toggleLabCompletion } = useAppTheme();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const filters: Filter[] = ['All', 'Foundations', 'Building'];
  const visibleLabs = labs.filter((lab) => {
    const matchesFilter = filter === 'All' || lab.category === filter;
    const matchesQuery = `${lab.title} ${lab.description}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <Screen>
      <PageTitle eyebrow="Hands-on learning" title="Lab library" subtitle="Practice, experiment, and build your skills one lab at a time." />

      <View style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={19} color={colors.muted} />
        <TextInput
          accessibilityLabel="Search labs"
          placeholder="Search labs..."
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          style={[styles.searchInput, { color: colors.text }]}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={19} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.filters}>
        {filters.map((item) => {
          const selected = filter === item;
          return (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setFilter(item)}
              style={[
                styles.filter,
                { backgroundColor: selected ? colors.primary : colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.filterText, { color: selected ? '#FFFFFF' : colors.muted }]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.listHeading}>
        <Text style={[styles.listTitle, { color: colors.text }]}>All activities</Text>
        <Text style={[styles.resultCount, { color: colors.muted }]}>{visibleLabs.length} labs</Text>
      </View>

      {visibleLabs.length > 0 ? visibleLabs.map((lab) => {
        const complete = completedLabIds.includes(lab.id);
        return (
          <SurfaceCard key={lab.id} style={styles.labCard}>
            <View style={styles.cardTop}>
              <View style={[styles.labIcon, { backgroundColor: `${lab.color}20` }]}>
                <Ionicons name={lab.icon as keyof typeof Ionicons.glyphMap} size={21} color={lab.color} />
              </View>
              <View style={styles.cardHeading}>
                <Text style={[styles.labNumber, { color: colors.muted }]}>LAB {lab.number}  ·  {lab.category}</Text>
                <Text style={[styles.labTitle, { color: colors.text }]}>{lab.title}</Text>
              </View>
              {complete ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
            </View>
            <Text style={[styles.description, { color: colors.muted }]}>{lab.description}</Text>
            <View style={styles.cardBottom}>
              <View style={styles.duration}>
                <Ionicons name="time-outline" size={15} color={colors.muted} />
                <Text style={[styles.durationText, { color: colors.muted }]}>{lab.duration}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ checked: complete }}
                accessibilityLabel={`${complete ? 'Mark' : 'Complete'} ${lab.title} ${complete ? 'incomplete' : 'as complete'}`}
                onPress={() => toggleLabCompletion(lab.id)}
                style={({ pressed }) => [
                  styles.completeButton,
                  { backgroundColor: complete ? colors.primarySoft : colors.primary },
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.completeText, { color: complete ? colors.primary : '#FFFFFF' }]}>
                  {complete ? 'Completed' : 'Mark complete'}
                </Text>
                <Ionicons name={complete ? 'checkmark' : 'arrow-forward'} size={15} color={complete ? colors.primary : '#FFFFFF'} />
              </Pressable>
            </View>
          </SurfaceCard>
        );
      }) : (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={26} color={colors.muted} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No labs found</Text>
          <Text style={[styles.emptyCopy, { color: colors.muted }]}>Try another search or category.</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 14,
  },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 0 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 23, flexWrap: 'wrap' },
  filter: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 999, borderWidth: 1 },
  filterText: { fontSize: 12, fontWeight: '700' },
  listHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  listTitle: { fontSize: 16, fontWeight: '800' },
  resultCount: { fontSize: 12 },
  labCard: { padding: 16, marginBottom: 11 },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  labIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardHeading: { flex: 1 },
  labNumber: { fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  labTitle: { fontSize: 15, fontWeight: '800', marginTop: 3 },
  description: { fontSize: 12, lineHeight: 18, marginTop: 12 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 8 },
  duration: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  durationText: { fontSize: 11, fontWeight: '600' },
  completeButton: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 11, paddingHorizontal: 11, paddingVertical: 9 },
  completeText: { fontSize: 11, fontWeight: '800' },
  pressed: { opacity: 0.78 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 55, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '800', marginTop: 4 },
  emptyCopy: { fontSize: 12 },
});
